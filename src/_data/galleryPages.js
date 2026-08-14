const galleries = require("./galleries");
const galleriesSl = require("./galleriesSl");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

const seoDescriptions = {
  en: {
    "land-and-life": "A photographic collection of Slovenian landscapes, trees, wildlife, outdoor portraits and seasonal life."
  },
  sl: {
    "award-winning": "Nagrajeni fotografiji Žana Kafola: Cerkniško polje, skupni zmagovalec National Geographic Slovenija 2022, in Razsvetljenje, zmagovalec 2023.",
    "water-and-ice": "Fotografije poplavljenih kraških polj, rek, snega in ledu v spreminjajoči se slovenski pokrajini."
  }
};

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
    seoDescription: seoDescriptions.en[gallery.id] || gallery.description,
    permalink: `/work/${gallery.id}/index.html`,
    canonicalPath: `/work/${gallery.id}/`,
    alternateUrl: `/sl/work/${gallery.id}/`,
    xDefaultPath: `/work/${gallery.id}/`
  })),
  ...galleriesSl.categories.map((gallery) => ({
    lang: "sl",
    gallery,
    categories: galleriesSl.categories,
    site: siteSl,
    copy: ui.sl,
    seoDescription: seoDescriptions.sl[gallery.id] || gallery.description,
    permalink: `/sl/work/${gallery.id}/index.html`,
    canonicalPath: `/sl/work/${gallery.id}/`,
    alternateUrl: `/work/${gallery.id}/`,
    xDefaultPath: `/work/${gallery.id}/`
  }))
];
