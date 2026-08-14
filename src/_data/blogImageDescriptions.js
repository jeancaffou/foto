"use strict";

const posts = require("./wordpressPosts.json");
const { getBlogImageUsages } = require("../../scripts/lib/blog-images");

const descriptions = Object.assign(
  {},
  ...[0, 1, 2, 3, 4, 5].map((part) => require(`./image-descriptions/blog-${part}.json`))
);

const expectedPaths = getBlogImageUsages(posts).map((usage) => usage.src);
const actualPaths = Object.keys(descriptions);
const expectedSet = new Set(expectedPaths);

if (actualPaths.length !== expectedPaths.length || actualPaths.some((src) => !expectedSet.has(src))) {
  throw new Error(`Expected descriptions for ${expectedPaths.length} migrated blog images, found ${actualPaths.length}`);
}

for (const src of expectedPaths) {
  const description = descriptions[src];
  if (!description || Object.keys(description).sort().join(",") !== "en,sl" || !description.en.trim() || !description.sl.trim()) {
    throw new Error(`Incomplete bilingual image description for ${src}`);
  }
}

module.exports = descriptions;
