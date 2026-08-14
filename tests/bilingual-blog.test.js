"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const posts = require("../src/_data/wordpressPosts.json");
const translations = require("../src/_data/wordpressPostTranslations");
const variants = require("../src/_data/blogPostVariants");
const blogPosts = require("../src/_data/blogPostsByLanguage");
const { applyTextTranslations, getTranslatableSegments } = require("../scripts/lib/blog-localization");

const SOURCE_PATH = path.resolve(__dirname, "../src/_data/wordpressPosts.json");
const SOURCE_SHA256 = "4bf6baf9595a8dde9c73638fb4124bc4d6bb85ec4f66a1e27dc2e70503c76b1e";

function mediaSources(content) {
  return [...String(content).matchAll(/<(?:img|iframe|video|source)\b[^>]*\b(?:src|poster)=["']([^"']+)["']/gi)]
    .map((match) => match[1]);
}

function markup(content) {
  return String(content).match(/<!--[\s\S]*?-->|<[^>]+>/g) || [];
}

test("keeps the committed WordPress source byte-for-byte unchanged", () => {
  const hash = crypto.createHash("sha256").update(fs.readFileSync(SOURCE_PATH)).digest("hex");
  assert.equal(hash, SOURCE_SHA256);
  assert.equal(posts.length, 194);
});

test("integrates authored posts with migrated posts through one bilingual blog index", () => {
  for (const lang of ["en", "sl"]) {
    assert.equal(blogPosts[lang].length, posts.length + 2);
    const authored = blogPosts[lang].filter((post) => post.sourceType === "authored");
    assert.equal(authored.length, 2, `Missing authored ${lang} posts`);
    const planinska = authored.find((post) => post.id === "no-time-to-pose-planinska-jama");
    const eclipse = authored.find((post) => post.id === "crescent-sun-vremscica");
    assert.ok(planinska.content.includes("photo-story-gallery"));
    assert.ok(eclipse.content.includes("eclipse-gallery"));
    assert.equal(planinska.newerUrl, null);
    assert.equal(planinska.olderUrl, eclipse.permalink);
    assert.equal(eclipse.newerUrl, planinska.permalink);
    assert.equal(eclipse.olderUrl, null);
    assert.ok(blogPosts[lang].some((post) => post.sourceType === "wordpress" && post.newerUrl === eclipse.permalink));
  }
});

test("has one complete GPT translation record for every migrated post", () => {
  assert.equal(Object.keys(translations).length, posts.length);

  posts.forEach((post) => {
    const entry = translations[post.id];
    const segments = getTranslatableSegments(post.content);
    assert.equal(entry.id, post.id);
    assert.ok(["en", "sl"].includes(entry.sourceLanguage));
    assert.ok(["en", "sl"].includes(entry.targetLanguage));
    assert.notEqual(entry.sourceLanguage, entry.targetLanguage);
    assert.ok(entry.title.trim());
    assert.ok(entry.summary.trim());
    assert.equal(entry.content.length, segments.length);
    entry.content.forEach((segment, index) => {
      assert.equal(segment.source, segments[index].source, `Source drift in post ${post.id}, segment ${index + 1}`);
      assert.ok(segment.translation.trim(), `Blank translation in post ${post.id}, segment ${index + 1}`);
      assert.doesNotMatch(segment.translation, /<[^>]+>/, `HTML found in translation for post ${post.id}`);
    });
  });
});

test("renders Slovenian at every legacy URL and English under /en without altering original content", () => {
  assert.equal(variants.byLanguage.sl.length, posts.length);
  assert.equal(variants.byLanguage.en.length, posts.length);
  assert.equal(variants.all.length, posts.length * 2);

  posts.forEach((post, index) => {
    const entry = translations[post.id];
    const slovenian = variants.byLanguage.sl[index];
    const english = variants.byLanguage.en[index];
    const original = entry.sourceLanguage === "sl" ? slovenian : english;
    const translated = entry.sourceLanguage === "sl" ? english : slovenian;

    assert.equal(slovenian.permalink, post.permalink);
    assert.equal(english.permalink, `/en${post.permalink}`);
    assert.equal(slovenian.alternateUrl, english.permalink);
    assert.equal(english.alternateUrl, slovenian.permalink);
    assert.equal(original.title, post.title);
    assert.equal(original.summary, post.summary);
    assert.equal(original.content, post.content);

    const expectedTranslation = applyTextTranslations(post.content, entry.content, `post ${post.id}`);
    assert.equal(translated.content, expectedTranslation);
    assert.deepEqual(markup(translated.content), markup(post.content), `Markup changed in translated post ${post.id}`);
    assert.deepEqual(mediaSources(translated.content), mediaSources(post.content), `Media changed in translated post ${post.id}`);
  });
});
