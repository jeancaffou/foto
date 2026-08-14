const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

const route = "/2026/08/crescent-sun-vremscica.html";

const shared = {
  date: "2026-08-12T20:18:16+02:00",
  leadImage: "/assets/blog/2026/08/20260812-IMG_1070.jpg",
  featuredImage: "/assets/blog/2026/08/20260812-IMG_1030.jpg",
  images: [
    {
      src: "/assets/blog/2026/08/20260812-IMG_1070.jpg",
      className: "eclipse-gallery__wide",
      altEn: "A red crescent Sun in a layered orange and dark cloudscape above Vremščica.",
      altSl: "Rdeče srpasto Sonce v plasteh oranžnih in temnih oblakov nad Vremščico."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1030.jpg",
      altEn: "The eclipsed Sun emerging beneath a dark cloud band above Vremščica.",
      altSl: "Zatemnjeno Sonce, ki se pojavlja pod temnim pasom oblakov nad Vremščico."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1038.jpg",
      altEn: "A silhouetted viewer looking toward the crescent Sun through orange evening cloud.",
      altSl: "Silhueta opazovalke, ki skozi oranžne večerne oblake gleda proti srpastemu Soncu."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1043.jpg",
      altEn: "A silhouetted viewer beneath the crescent Sun and layered evening clouds.",
      altSl: "Silhueta opazovalke pod srpastim Soncem in plastmi večernih oblakov."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1045.jpg",
      altEn: "Two viewers watching the crescent Sun through the evening haze.",
      altSl: "Dve opazovalki, ki skozi večerno meglico opazujeta srpasto Sonce."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1074.jpg",
      altEn: "A parent holding a child watches the crescent Sun through the evening haze.",
      altSl: "Starš z otrokom v naročju opazuje srpasto Sonce skozi večerno meglico."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1076.jpg",
      altEn: "A parent and child silhouetted against the crescent Sun and blue-orange sky.",
      altSl: "Starš in otrok v silhueti pred srpastim Soncem in modro-oranžnim nebom."
    },
    {
      src: "/assets/blog/2026/08/20260812-IMG_1078.jpg",
      altEn: "A parent and child in silhouette beneath the crescent Sun.",
      altSl: "Starš in otrok v silhueti pod srpastim Soncem."
    }
  ]
};

module.exports = [
  {
    ...shared,
    lang: "en",
    site,
    copy: ui.en,
    permalink: route,
    alternateUrl: `/sl${route}`,
    title: "Crescent Sun 🌒",
    metaDescription: "A partial solar eclipse over Slovenia, seen through cloud and evening haze from Vremščica.",
    displayDate: "12 August 2026",
    location: "Vremščica, Slovenia",
    category: "Solar eclipse",
    summary: "A partial solar eclipse over Slovenia, seen through cloud and evening haze from Vremščica.",
    categories: [{ name: "Solar eclipse", slug: "solar-eclipse" }],
    labels: {
      journal: "Journal",
      back: "← Journal",
      label: "Photo story",
      gallery: "Photographs from the partial solar eclipse",
      archive: "All stories"
    }
  },
  {
    ...shared,
    lang: "sl",
    site: siteSl,
    copy: ui.sl,
    permalink: `/sl${route}`,
    alternateUrl: route,
    title: "Srpasto Sonce 🌒",
    metaDescription: "Delni Sončev mrk nad Slovenijo, ujet skozi oblake in večerno meglico z Vremščice.",
    displayDate: "12. avgust 2026",
    location: "Vremščica, Slovenija",
    category: "Sončev mrk",
    summary: "Delni Sončev mrk nad Slovenijo, ujet skozi oblake in večerno meglico z Vremščice.",
    categories: [{ name: "Sončev mrk", slug: "soncev-mrk" }],
    labels: {
      journal: "Blog",
      back: "← Blog",
      label: "Fotografska zgodba",
      gallery: "Fotografije delnega Sončevega mrka",
      archive: "Vsi zapisi"
    }
  }
];
