const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");
const imageDescriptions = require("./imageDescriptions");

module.exports = [
  {
    lang: "en", permalink: "/press/index.html", canonicalPath: "/press/", alternateUrl: "/sl/press/", xDefaultPath: "/press/", site, copy: ui.en,
    seoImage: { src: site.press[0].image, alt: imageDescriptions[site.press[0].image]?.en || site.press[0].description }
  },
  {
    lang: "sl", permalink: "/sl/press/index.html", canonicalPath: "/sl/press/", alternateUrl: "/press/", xDefaultPath: "/press/", site: siteSl, copy: ui.sl,
    seoImage: { src: siteSl.press[0].image, alt: imageDescriptions[siteSl.press[0].image]?.sl || siteSl.press[0].description }
  }
];
