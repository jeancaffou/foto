const pressFeatures = require("./pressFeatures");
const pressFeaturesSl = require("./pressFeaturesSl");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");
const imageDescriptions = require("./imageDescriptions");

const clean = (url) => url.replace(/index\.html$/, "");

function seoImage(item, lang, pageSite) {
  const scan = item.scans?.[0];
  if (scan) return { src: scan.src, alt: scan.alt };
  if (item.scan) return { src: item.scan, alt: item.scanAlt };
  if (item.image) return { src: item.image, alt: item.imageAlt };
  const route = clean(item.permalink).replace(/^\/sl/, "");
  const card = pageSite.press.find((entry) => entry.url.replace(/^\/sl/, "") === route);
  if (card?.image) return {
    src: card.image,
    alt: imageDescriptions[card.image]?.[lang] || card.description
  };
  return null;
}

function localizeImages(item, lang) {
  return {
    ...item,
    ...(item.image ? { imageAlt: imageDescriptions[item.image]?.[lang] || item.imageAlt } : {}),
    ...(item.scan ? { scanAlt: imageDescriptions[item.scan]?.[lang] || item.scanAlt } : {}),
    ...(item.scans ? {
      scans: item.scans.map((scan) => ({
        ...scan,
        alt: imageDescriptions[scan.src]?.[lang] || scan.alt
      }))
    } : {})
  };
}

module.exports = [
  ...pressFeatures.map((sourceItem) => {
    const item = localizeImages(sourceItem, "en");
    return {
      lang: "en", item, site, copy: ui.en, permalink: item.permalink,
      canonicalPath: clean(item.permalink), alternateUrl: `/sl${clean(item.permalink)}`,
      xDefaultPath: clean(item.permalink), seoImage: seoImage(item, "en", site)
    };
  }),
  ...pressFeaturesSl.map((sourceItem) => {
    const item = localizeImages(sourceItem, "sl");
    return {
      lang: "sl", item, site: siteSl, copy: ui.sl, permalink: item.permalink,
      canonicalPath: clean(item.permalink), alternateUrl: clean(item.permalink).replace(/^\/sl/, ""),
      xDefaultPath: clean(item.permalink).replace(/^\/sl/, ""), seoImage: seoImage(item, "sl", siteSl)
    };
  })
];
