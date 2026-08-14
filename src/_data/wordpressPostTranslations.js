"use strict";

const posts = require("./wordpressPosts.json");
const parts = [
  require("./translations/wordpress-0.json"),
  require("./translations/wordpress-1.json"),
  require("./translations/wordpress-2.json")
];
const { getTranslatableSegments } = require("../../scripts/lib/blog-localization");

const translations = Object.assign({}, ...parts);
const expectedIds = new Set(posts.map((post) => String(post.id)));
const translatedIds = Object.keys(translations);

if (translatedIds.length !== posts.length || translatedIds.some((id) => !expectedIds.has(id))) {
  throw new Error(`Expected translations for ${posts.length} WordPress posts, found ${translatedIds.length}`);
}

for (const post of posts) {
  const entry = translations[post.id];
  const segments = getTranslatableSegments(post.content);
  if (!entry || entry.id !== post.id) throw new Error(`Invalid translation identity for post ${post.id}`);
  if (!['en', 'sl'].includes(entry.sourceLanguage) || !['en', 'sl'].includes(entry.targetLanguage) || entry.sourceLanguage === entry.targetLanguage) {
    throw new Error(`Invalid translation languages for post ${post.id}`);
  }
  if (!entry.title?.trim() || !entry.summary?.trim()) throw new Error(`Incomplete translated metadata for post ${post.id}`);
  if (!Array.isArray(entry.content) || entry.content.length !== segments.length) {
    throw new Error(`Incomplete translated body for post ${post.id}`);
  }
  segments.forEach((segment, index) => {
    if (entry.content[index]?.source !== segment.source || typeof entry.content[index]?.translation !== 'string') {
      throw new Error(`Translation source mismatch in post ${post.id}, segment ${index + 1}`);
    }
  });
}

module.exports = translations;
