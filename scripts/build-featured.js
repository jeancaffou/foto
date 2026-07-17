const { execFile } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(projectRoot, "context", "featured");
const outputRoot = path.join(projectRoot, "src", "assets", "images", "featured");
const manifest = require("./featured-manifest.json");

const variants = [
  { directory: "full", geometry: "2000x2000>", quality: "88" },
  { directory: "thumb", geometry: "900x900>", quality: "82" }
];

function outputName(file) {
  return file.replace(/\.jpe?g$/i, ".webp");
}

async function renderVariant(source, destination, variant) {
  const sourceStat = fs.statSync(source);
  if (fs.existsSync(destination) && fs.statSync(destination).mtimeMs >= sourceStat.mtimeMs) {
    return false;
  }

  await execFileAsync("convert", [
    source,
    "-auto-orient",
    "-strip",
    "-colorspace", "sRGB",
    "-resize", variant.geometry,
    "-quality", variant.quality,
    "-define", "webp:method=5",
    destination
  ]);
  return true;
}

async function renderImage(image) {
  const source = path.join(sourceRoot, image.file);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing featured source: ${image.file}`);
  }

  let created = 0;
  for (const variant of variants) {
    const directory = path.join(outputRoot, variant.directory);
    fs.mkdirSync(directory, { recursive: true });
    const destination = path.join(directory, outputName(image.file));
    if (await renderVariant(source, destination, variant)) created += 1;
  }
  return created;
}

async function main() {
  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Featured source directory not found: ${sourceRoot}`);
  }

  let cursor = 0;
  let created = 0;
  const workers = Array.from({ length: 2 }, async () => {
    while (cursor < manifest.images.length) {
      const image = manifest.images[cursor];
      cursor += 1;
      created += await renderImage(image);
    }
  });

  await Promise.all(workers);

  const expected = manifest.images.length * variants.length;
  const actual = variants.reduce((count, variant) => {
    const directory = path.join(outputRoot, variant.directory);
    return count + fs.readdirSync(directory).filter((file) => file.endsWith(".webp")).length;
  }, 0);

  if (actual !== expected) {
    throw new Error(`Expected ${expected} featured derivatives, found ${actual}`);
  }

  process.stdout.write(`Featured derivatives ready: ${actual} files (${created} updated).\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
