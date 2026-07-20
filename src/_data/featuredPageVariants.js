const featurePages = require("./featurePages");
const featurePagesSl = require("./featurePagesSl");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

const clean = (url) => url.replace(/index\.html$/, "");

module.exports = [
  ...featurePages.map((item) => ({
    lang: "en", item, site, copy: ui.en, permalink: item.permalink,
    alternateUrl: `/sl${clean(item.permalink)}`
  })),
  ...featurePagesSl.map((item) => ({
    lang: "sl", item, site: siteSl, copy: ui.sl, permalink: item.permalink,
    alternateUrl: clean(item.permalink).replace(/^\/sl/, "")
  }))
];
