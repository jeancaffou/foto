const featurePages = require("./featurePages");

const copy = {
  "mayors-award-postojna-2024": {
    title: "Županovo priznanje, Postojna, 2024",
    publication: "Občina Postojna",
    displayDate: "23. april 2024",
    summary: "Žan Kafol je iz rok župana Igorja Marentiča prejel Županovo priznanje za posebne dosežke v fotografiji in promocijo Občine Postojna.",
    originalLabel: "Preberi objavo Občine Postojna",
    images: [
      {
        src: "/assets/images/feature-mayors-award-postojna-2024.jpg",
        alt: "Žan Kafol prejema Županovo priznanje iz rok župana Igorja Marentiča",
        caption: "Žan Kafol z županom Igorjem Marentičem na podelitvi v Postojni · fotografija Valter Leban"
      }
    ]
  },
  "i-am-nikon-jaz-sem-raketa": {
    title: "I AM Nikon — Jaz sem Raketa",
    displayDate: "drugo mesto, 2010",
    summary: "Fotografija Jaz sem Raketa je na fotografskem natečaju I AM Nikon leta 2010 osvojila drugo mesto.",
    originalLabel: "Preberi o kampanji I AM Nikon",
    images: [
      {
        src: "/assets/images/feature-i-am-nikon-jaz-sem-raketa.jpg",
        alt: "Jaz sem Raketa, fotografija osebe med skokom iz nizkega zornega kota",
        caption: "Jaz sem Raketa · drugo mesto, I AM Nikon, 2010"
      },
      {
        src: "/assets/images/feature-i-am-nikon-series-6816.jpg",
        alt: "Druga fotografija iz serije Jaz sem Raketa",
        caption: "Dodatna fotografija iz serije"
      }
    ]
  }
};

module.exports = featurePages.map((item) => ({
  ...item,
  ...copy[item.id],
  permalink: `/sl${item.permalink}`
}));
