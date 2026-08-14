"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const posts = require("../src/_data/wordpressPosts.json");
const blogDescriptions = require("../src/_data/blogImageDescriptions");
const galleryDescriptions = require("../src/_data/image-descriptions/gallery.json");
const siteDescriptions = require("../src/_data/image-descriptions/site.json");
const galleries = require("../src/_data/galleries");
const site = require("../src/_data/site");
const pressFeatures = require("../src/_data/pressFeatures");
const featurePages = require("../src/_data/featurePages");
const authoredPosts = require("../src/_data/authoredBlogPosts");
const imageDescriptions = require("../src/_data/imageDescriptions");
const { getBlogImageUsages } = require("../scripts/lib/blog-images");
const { imageMetadata } = require("../scripts/lib/image-metadata");

const ROOT = path.resolve(__dirname, "..");

function validateDescriptions(catalog, expectedPaths, label) {
  assert.deepEqual(new Set(Object.keys(catalog)), new Set(expectedPaths), `${label} description coverage drifted`);
  const seen = { en: new Map(), sl: new Map() };
  for (const src of expectedPaths) {
    const description = catalog[src];
    assert.deepEqual(Object.keys(description).sort(), ["en", "sl"], `Unexpected ${label} fields for ${src}`);
    for (const lang of ["en", "sl"]) {
      const text = description[lang].trim();
      const words = text.split(/\s+/).length;
      assert.ok(words >= 8 && words <= 45, `${label} ${lang} description for ${src} has ${words} words`);
      assert.doesNotMatch(text, /\b(?:DSC|DJI|IMG|MG|GOPR)[-_]?\d{3,}\b/i, `Filename leaked into ${label} description for ${src}`);
      const normalized = text.toLocaleLowerCase(lang === "sl" ? "sl-SI" : "en");
      assert.ok(!seen[lang].has(normalized), `Duplicate ${label} ${lang} description for ${src} and ${seen[lang].get(normalized)}`);
      seen[lang].set(normalized, src);
    }
    const asset = path.join(ROOT, "src", decodeURI(src).replace(/^\/+/, ""));
    assert.ok(fs.existsSync(asset), `Missing described image ${src}`);
    const metadata = imageMetadata(src);
    assert.ok(metadata?.width > 0 && metadata?.height > 0, `Missing dimensions for ${src}`);
    assert.match(metadata.mimeType, /^image\//, `Missing image MIME type for ${src}`);
  }
}

test("describes every migrated blog image in English and Slovenian", () => {
  const paths = getBlogImageUsages(posts).map((usage) => usage.src);
  assert.equal(paths.length, 1537);
  validateDescriptions(blogDescriptions, paths, "blog image");
});

test("describes every portfolio photograph in English and Slovenian", () => {
  const paths = [...new Set(galleries.categories.flatMap((gallery) => gallery.images.map((image) => image.full)))];
  assert.equal(paths.length, 101);
  validateDescriptions(galleryDescriptions, paths, "gallery image");
});

test("describes every standalone site photograph and editorial still in both languages", () => {
  const paths = new Set(["/assets/images/headshot.jpg"]);
  site.press.forEach((item) => paths.add(item.image));
  pressFeatures.forEach((item) => {
    if (item.image) paths.add(item.image);
    if (item.scan) paths.add(item.scan);
    (item.scans || []).forEach((scan) => paths.add(scan.src));
  });
  featurePages.forEach((item) => item.images.forEach((image) => paths.add(image.src)));
  assert.equal(paths.size, 20);
  validateDescriptions(siteDescriptions, [...paths], "site image");
});

test("describes every photograph in authored blog posts", () => {
  const images = authoredPosts.byLanguage.en[0].images;
  assert.equal(images.length, 8);
  assert.deepEqual(authoredPosts.byLanguage.sl[0].images.map((image) => image.src), images.map((image) => image.src));

  for (const image of images) {
    for (const lang of ["en", "sl"]) {
      const text = imageDescriptions[image.src][lang];
      const words = text.trim().split(/\s+/).length;
      assert.ok(words >= 8 && words <= 45, `${lang} description for ${image.src} has ${words} words`);
    }
    const metadata = imageMetadata(image.src);
    assert.ok(metadata?.width > 0 && metadata?.height > 0, `Missing dimensions for ${image.src}`);
    assert.equal(image.alt, imageDescriptions[image.src].en, `Authored English image catalog drifted for ${image.src}`);
  }
});
