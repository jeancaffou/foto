#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(__dirname, "generated", "wordpress-media-manifest.json");

function resolveProjectPath(relativePath) {
  const absolutePath = path.resolve(ROOT, relativePath);
  if (!absolutePath.startsWith(`${ROOT}${path.sep}`)) {
    throw new Error(`Refusing to access a path outside the project: ${relativePath}`);
  }
  return absolutePath;
}

async function sync() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error("Media manifest is missing. Run npm run import:wordpress:data first.");
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const missing = [];
  let copied = 0;
  let downloaded = 0;
  let unchanged = 0;

  for (const media of manifest.media) {
    const destination = resolveProjectPath(media.destination);

    if (media.sourceUrl) {
      if (fs.existsSync(destination) && fs.statSync(destination).size > 0) {
        fs.chmodSync(destination, 0o644);
        unchanged += 1;
        continue;
      }

      const response = await fetch(media.sourceUrl);
      if (!response.ok) {
        throw new Error(`Unable to download ${media.sourceUrl}: HTTP ${response.status}`);
      }
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
      fs.chmodSync(destination, 0o644);
      downloaded += 1;
      continue;
    }

    const source = resolveProjectPath(media.source);
    if (!fs.existsSync(source)) {
      missing.push(media);
      continue;
    }

    const sourceStat = fs.statSync(source);
    const destinationStat = fs.existsSync(destination) ? fs.statSync(destination) : null;

    if (
      destinationStat
      && destinationStat.size === sourceStat.size
      && Math.trunc(destinationStat.mtimeMs) === Math.trunc(sourceStat.mtimeMs)
    ) {
      fs.chmodSync(destination, 0o644);
      unchanged += 1;
      continue;
    }

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
    fs.utimesSync(destination, sourceStat.atime, sourceStat.mtime);
    fs.chmodSync(destination, 0o644);
    copied += 1;
  }

  if (missing.length > 0) {
    const examples = missing.slice(0, 20).map((media) => `  - ${media.source}`).join("\n");
    throw new Error(
      `${missing.length} referenced media files are absent from context/wp-content.\n${examples}`
    );
  }

  process.stdout.write(
    `Synchronized ${copied} upload files and downloaded ${downloaded} external files; ${unchanged} were already current.\n`
  );
}

sync().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
