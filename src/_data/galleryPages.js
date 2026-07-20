const galleries = require("./galleries");
const galleriesSl = require("./galleriesSl");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

module.exports = [
  ...galleries.categories.map((gallery) => ({
    lang: "en",
    gallery: {
      ...gallery,
      photoCountLabel: `${gallery.images.length} ${gallery.images.length === 1 ? "photograph" : "photographs"}`
    },
    categories: galleries.categories,
    site,
    copy: ui.en,
    permalink: `/work/${gallery.id}/index.html`,
    alternateUrl: `/sl/work/${gallery.id}/`
  })),
  ...galleriesSl.categories.map((gallery) => ({
    lang: "sl",
    gallery,
    categories: galleriesSl.categories,
    site: siteSl,
    copy: ui.sl,
    permalink: `/sl/work/${gallery.id}/index.html`,
    alternateUrl: `/work/${gallery.id}/`
  }))
];
