#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { getMediaPaths } = require("./lib/wordpress-content");

const ROOT = path.resolve(__dirname, "..");
const POSTS_PATH = path.join(ROOT, "src", "_data", "wordpressPosts.json");
const MANIFEST_PATH = path.join(ROOT, "scripts", "generated", "wordpress-media-manifest.json");
const EXPECTED_POSTS = 194;
const FORBIDDEN_HOSTS = [
  /(?:https?:)?\/\/blog\.kafol\.net/i,
  /(?:https?:)?\/\/(?:www\.)?kafol\.net\/blog(?:\/|\b)/i,
  /(?:https?:)?\/\/i\d\.wp\.com\/(?:blog\.kafol\.net|(?:www\.)?kafol\.net\/blog)/i
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(fs.existsSync(POSTS_PATH), "Imported post dataset is missing");
assert(fs.existsSync(MANIFEST_PATH), "WordPress media manifest is missing");

const posts = JSON.parse(fs.readFileSync(POSTS_PATH, "utf8"));
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

assert(posts.length === EXPECTED_POSTS, `Expected ${EXPECTED_POSTS} published posts, found ${posts.length}`);
assert(manifest.postCount === EXPECTED_POSTS, "Media manifest post count does not match the dataset");

const paths = new Set();
for (const post of posts) {
  assert(Number.isInteger(post.id), `Post is missing a numeric id: ${post.title}`);
  assert(post.title, `Post ${post.id} has no title`);
  assert(post.content !== undefined, `Post ${post.id} has no content field`);
  assert(post.excerpt !== undefined, `Post ${post.id} has no preserved excerpt field`);
  assert(typeof post.summary === "string", `Post ${post.id} has no card summary`);
  assert(/^\/\d{4}\/\d{2}\/[a-z0-9._~%-]+\.html$/i.test(post.permalink), `Invalid legacy permalink: ${post.permalink}`);
  assert(
    post.permalink === `/${post.date.slice(0, 4)}/${post.date.slice(5, 7)}/${post.slug}.html`,
    `Permalink does not match the post date and slug: ${post.permalink}`
  );
  assert(Array.isArray(post.categories), `Post ${post.id} has invalid categories`);
  assert(Array.isArray(post.tags), `Post ${post.id} has invalid tags`);
  assert(!paths.has(post.permalink), `Duplicate legacy permalink: ${post.permalink}`);
  paths.add(post.permalink);

  const serialized = JSON.stringify(post);
  for (const forbiddenHost of FORBIDDEN_HOSTS) {
    assert(!forbiddenHost.test(serialized), `Forbidden legacy host remains in ${post.permalink}`);
  }
  assert(
    !/<img\b[^>]*\bsrc=["']https?:\/\//i.test(post.content),
    `Hotlinked image remains in ${post.permalink}`
  );
}

assert(
  paths.has("/2023/10/druga-zmaga-na-national-geographic.html"),
  "The verified 2023 National Geographic permalink is missing"
);

const manifestPaths = new Set(manifest.media.map((media) => media.path));
assert(manifestPaths.size === manifest.media.length, "Media manifest contains duplicate paths");

const referencedMedia = new Set();
for (const post of posts) {
  for (const mediaPath of [
    ...getMediaPaths(post.content),
    ...getMediaPaths(post.excerpt),
    ...getMediaPaths(post.summary),
    ...getMediaPaths(post.featuredImage),
    ...getMediaPaths(post.leadImage)
  ]) {
    referencedMedia.add(mediaPath);
  }
}

for (const mediaPath of referencedMedia) {
  assert(manifestPaths.has(mediaPath), `Referenced media is absent from the manifest: ${mediaPath}`);
}

for (const media of manifest.media) {
  const destination = path.resolve(ROOT, media.destination);
  assert(fs.existsSync(destination), `Local production media is missing: ${media.destination}`);
  assert(fs.statSync(destination).size > 0, `Local production media is empty: ${media.destination}`);

  if (media.source) {
    const source = path.resolve(ROOT, media.source);
    assert(fs.existsSync(source), `Referenced WordPress source media is missing: ${media.source}`);
    assert(fs.statSync(source).size === fs.statSync(destination).size, `Copied media size differs: ${media.path}`);
  } else {
    assert(/^https:\/\//.test(media.sourceUrl), `Vendored media lacks an HTTPS source: ${media.path}`);
  }
}

process.stdout.write(
  `Validated ${posts.length} unique legacy permalinks and ${manifest.media.length} local media files.\n`
);
