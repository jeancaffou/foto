"use strict";

const posts = require("./wordpressPosts.json");
const translations = require("./wordpressPostTranslations");
const categories = require("./blogCategoryTranslations");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");
const imageDescriptions = require("./imageDescriptions");
const { applyTextTranslations } = require("../../scripts/lib/blog-localization");

function localizedCategories(postCategories, lang) {
  return postCategories.map((category) => ({
    ...category,
    name: categories[category.name]?.[lang] ?? category.name
  }));
}

function seoDescription(summary, title, lang, imageSrc) {
  const clean = String(summary ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
  const usable = /\p{L}/u.test(clean) && !/^https?:\/\/\S+$/i.test(clean);
  const visual = imageDescriptions[imageSrc]?.[lang]?.replace(/[.!?]+$/, "");
  const fallback = visual
    ? (lang === "sl" ? `${visual}. Fotografska zgodba Žana Kafola.` : `${visual}. A photo story by Žan Kafol.`)
    : (lang === "sl"
      ? `Fotografska zgodba Žana Kafola »${title}«, predstavljena v skrbno izbrani seriji fotografij.`
      : `Žan Kafol’s photo story “${title}”, presented through a carefully selected series of photographs.`);
  const source = usable && clean.length >= 55 ? clean : fallback;
  if (source.length <= 160) return source;
  const shortened = source.slice(0, 158);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > 110 ? boundary : 157).trim()}…`;
}

function makeVariant(post, translation, lang) {
  const isOriginal = lang === translation.sourceLanguage;
  const englishUrl = `/en${post.permalink}`;
  const slovenianUrl = post.permalink;
  const permalink = lang === "en" ? englishUrl : slovenianUrl;
  const title = isOriginal ? post.title : translation.title;
  const summary = isOriginal ? post.summary : translation.summary;
  return {
    ...post,
    lang,
    permalink,
    alternateUrl: lang === "en" ? slovenianUrl : englishUrl,
    xDefaultPath: slovenianUrl,
    canonicalPath: permalink,
    originalPermalink: post.permalink,
    sourceType: "wordpress",
    isOriginal,
    sourceLanguage: translation.sourceLanguage,
    site: lang === "sl" ? siteSl : site,
    copy: ui[lang],
    title,
    summary,
    seoDescription: seoDescription(summary, title, lang, post.leadImage || post.featuredImage),
    categories: localizedCategories(post.categories, lang),
    content: isOriginal
      ? post.content
      : applyTextTranslations(post.content, translation.content, `post ${post.id}`)
  };
}

const byLanguage = { en: [], sl: [] };
const all = [];

for (const post of posts) {
  const translation = translations[post.id];
  for (const lang of ["en", "sl"]) {
    const variant = makeVariant(post, translation, lang);
    byLanguage[lang].push(variant);
    all.push(variant);
  }
}

for (const lang of ["en", "sl"]) {
  const titleCounts = byLanguage[lang].reduce((counts, post) => {
    counts.set(post.title, (counts.get(post.title) || 0) + 1);
    return counts;
  }, new Map());
  byLanguage[lang].forEach((post, index, languagePosts) => {
    const year = String(post.date).slice(0, 4);
    post.seoTitle = `${post.title}${titleCounts.get(post.title) > 1 ? ` (${year})` : ""} — Žan Kafol`;
  });
}

module.exports = { all, byLanguage };
