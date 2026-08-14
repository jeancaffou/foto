const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

module.exports = [
  {
    lang: "en", permalink: "/index.html", alternateUrl: "/sl/", site, copy: ui.en,
    canonicalPath: "/", xDefaultPath: "/",
    ogImage: "/assets/images/featured/full/20210228-DJI_0270-Pano.webp",
    ogImageAlt: "Aerial winter view of flooded Cerkniško polje, overall winner of the 2022 National Geographic Slovenia photo competition"
  },
  {
    lang: "sl", permalink: "/sl/index.html", alternateUrl: "/", site: siteSl, copy: ui.sl,
    canonicalPath: "/sl/", xDefaultPath: "/",
    ogImage: "/assets/images/featured/full/20210228-DJI_0270-Pano.webp",
    ogImageAlt: "Zimski zračni pogled na poplavljeno Cerkniško polje, skupni zmagovalec natečaja National Geographic Slovenija 2022"
  }
];
