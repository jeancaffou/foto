const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

module.exports = [
  { lang: "en", permalink: "/index.html", alternateUrl: "/sl/", site, copy: ui.en },
  { lang: "sl", permalink: "/sl/index.html", alternateUrl: "/", site: siteSl, copy: ui.sl }
];
