const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

module.exports = [
  { lang: "en", permalink: "/press/index.html", alternateUrl: "/sl/press/", site, copy: ui.en },
  { lang: "sl", permalink: "/sl/press/index.html", alternateUrl: "/press/", site: siteSl, copy: ui.sl }
];
