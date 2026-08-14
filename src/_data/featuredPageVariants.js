const featurePages = require("./featurePages");
const featurePagesSl = require("./featurePagesSl");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");
const imageDescriptions = require("./imageDescriptions");

const clean = (url) => url.replace(/index\.html$/, "");
const localized = (item, lang) => ({
  ...item,
  images: item.images.map((image) => ({
    ...image,
    alt: imageDescriptions[image.src]?.[lang] || image.alt
  }))
});

module.exports = [
  ...featurePages.map((sourceItem) => {
    const item = localized(sourceItem, "en");
    return {
      lang: "en", item, site, copy: ui.en, permalink: item.permalink,
      canonicalPath: clean(item.permalink), alternateUrl: `/sl${clean(item.permalink)}`,
      xDefaultPath: clean(item.permalink), seoImage: item.images[0]
    };
  }),
  ...featurePagesSl.map((sourceItem) => {
    const item = localized(sourceItem, "sl");
    return {
      lang: "sl", item, site: siteSl, copy: ui.sl, permalink: item.permalink,
      canonicalPath: clean(item.permalink), alternateUrl: clean(item.permalink).replace(/^\/sl/, ""),
      xDefaultPath: clean(item.permalink).replace(/^\/sl/, ""), seoImage: item.images[0]
    };
  })
];
