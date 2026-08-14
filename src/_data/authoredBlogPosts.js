"use strict";

const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");
const descriptions = Object.assign(
  {},
  require("./image-descriptions/authored-crescent-sun.json"),
  require("./image-descriptions/authored-planinska-jama.json")
);
const sources = [
  require("./authored-posts/crescent-sun-vremscica"),
  require("./authored-posts/no-time-to-pose-planinska-jama")
];

function variant(source, lang) {
  const version = source.versions[lang];
  const images = source.images.map((image, index) => ({
    ...image,
    index,
    alt: descriptions[image.src][lang]
  }));
  const permalink = lang === "en" ? `/en${source.route}` : source.route;

  return {
    id: source.id,
    sourceType: "authored",
    lang,
    permalink,
    canonicalPath: permalink,
    alternateUrl: lang === "en" ? source.route : `/en${source.route}`,
    xDefaultPath: source.route,
    date: source.date,
    modified: source.date,
    leadImage: source.leadImage,
    featuredImage: source.featuredImage,
    images,
    title: version.title,
    seoTitle: `${version.title} — Žan Kafol`,
    summary: version.summary,
    seoDescription: version.summary,
    categories: version.categories,
    metaItems: version.metaItems,
    backLabel: version.backLabel,
    navigation: source.navigation || {},
    content: source.content(lang, images),
    site: lang === "sl" ? siteSl : site,
    copy: ui[lang]
  };
}

const byLanguage = { en: [], sl: [] };
const ids = new Set();
const routes = new Set();
for (const source of sources) {
  if (!source.id || ids.has(source.id)) throw new Error(`Duplicate authored post id: ${source.id}`);
  if (!/^\/\d{4}\/\d{2}\/[a-z0-9-]+\.html$/.test(source.route) || routes.has(source.route)) {
    throw new Error(`Invalid or duplicate authored post route: ${source.route}`);
  }
  if (!source.versions?.en || !source.versions?.sl || typeof source.content !== "function") {
    throw new Error(`Incomplete bilingual authored post: ${source.id}`);
  }
  ids.add(source.id);
  routes.add(source.route);
  for (const lang of ["en", "sl"]) byLanguage[lang].push(variant(source, lang));
}

module.exports = {
  byLanguage,
  all: [...byLanguage.en, ...byLanguage.sl]
};
