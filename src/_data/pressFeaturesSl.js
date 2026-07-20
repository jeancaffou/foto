const pressFeatures = require("./pressFeatures");

const copy = {
  "radio94-video-2026": {
    section: "Video intervju",
    summary: "Pogovor za Radio 94 o fotografiranju Postojne iz zraka in pod zemljo.",
    originalLabel: "Oglej si na YouTubu"
  },
  "prepih-2024": {
    section: "Intervju",
    displayDate: "april 2024",
    summary: "Obširen intervju o zračni in jamski fotografiji, kraški pokrajini ter delu v ozadju posnetkov.",
    originalLabel: "Preberi izvirni intervju",
    imageAlt: "Žan Kafol v intervjuju za Prepih",
    imageCaption: "Prepih na obisku · april 2024"
  },
  "rtvslo-creative-2023": {
    section: "Intervju",
    summary: "Intervju RTV Slovenija o ustvarjalnih odločitvah, ustaljenih okvirih in iskanju lastnega fotografskega izraza.",
    originalLabel: "Preberi na RTV Slovenija",
    imageAlt: "Intervju RTV Slovenija z Žanom Kafolom",
    imageCaption: "RTV Slovenija · intervju, 2023"
  },
  "rtvslo-amateur-2023": {
    section: "Intervju",
    summary: "Pogovor o fotografiji zunaj poklicne prakse, nagrajenih delih in vrednosti vztrajnega ljubiteljskega ustvarjanja.",
    originalLabel: "Preberi na RTV Slovenija",
    imageAlt: "Intervju RTV Slovenija z Žanom Kafolom",
    imageCaption: "RTV Slovenija · intervju, 2023"
  },
  "dobro-jutro-2023": {
    section: "Televizijski intervju",
    summary: "Studijski pogovor po drugi zaporedni skupni zmagi na fotografskem natečaju National Geographic Slovenija.",
    originalLabel: "Oglej si na YouTubu"
  },
  "nedelo-2023": {
    displayDate: "21. oktober 2023 · tisk, stran 18",
    summary: "Portret v neDelu, ki povezuje letenje, raziskovanje jam in fotografijo.",
    originalLabel: "Preberi spletni članek na Delu",
    scanAlt: "Celostranski posnetek prve strani intervjuja z Žanom Kafolom v neDelu"
  },
  "radio94-natgeo-2023": {
    section: "Radijski intervju",
    summary: "Prispevek Radia 94 o fotografiji Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan) in zmagi leta 2023.",
    originalLabel: "Poslušaj na Radiu 94",
    imageAlt: "Prispevek Radia 94 o priznanju National Geographic leta 2023",
    imageCaption: "Radio 94 · 2023"
  },
  "primorska-kronika-2023": {
    section: "Televizijski prispevek",
    summary: "Prispevek Primorske kronike o nagrajeni fotografiji, posneti pod Malim naravnim mostom v Rakovem Škocjanu.",
    originalLabel: "Oglej si na YouTubu"
  },
  "prvi-dnevnik-2023": {
    section: "Televizijski prispevek",
    summary: "Prispevek Prvega dnevnika o drugi zaporedni skupni zmagi na fotografskem natečaju National Geographic Slovenija.",
    originalLabel: "Oglej si na YouTubu"
  },
  "na-soncni-strani-2023": {
    section: "Televizijski intervju",
    summary: "Televizijski pogovor v oddaji Na sončni strani, posvečen izključno jadralnemu padalstvu.",
    originalLabel: "Oglej si na YouTubu"
  },
  "prepih-2022": {
    displayDate: "november 2022 · št. 134, stran 20",
    summary: "Prispevek v Prepihu o zračnih in bližnjih perspektivah v fotografiji Žana Kafola.",
    originalLabel: "Odpri celotno številko Prepiha",
    scanAlt: "Posnetek članka Žan Kafol: od zgoraj, od blizu v Prepihu"
  },
  "radio94-nedeljski-2022": {
    section: "Radijski intervju",
    summary: "Nedeljski pogovor na Radiu 94 o fotografiji, jadralnem padalstvu, jamah in Postojni.",
    originalLabel: "Poslušaj na Radiu 94",
    imageAlt: "Nedeljski klepet z Žanom Kafolom na Radiu 94",
    imageCaption: "Radio 94 · Nedeljski klepet, 2022"
  },
  "radio94-natgeo-2022": {
    section: "Radijski intervju",
    summary: "Prispevek Radia 94 o fotografiji Cerkniško polje in zmagi na natečaju National Geographic Slovenija 2022.",
    originalLabel: "Poslušaj na Radiu 94",
    imageAlt: "Prispevek Radia 94 o zmagi Žana Kafola leta 2022",
    imageCaption: "Radio 94 · 2022"
  }
};

module.exports = pressFeatures.map((item) => {
  const translated = copy[item.id] || {};
  return {
    ...item,
    ...translated,
    permalink: `/sl${item.permalink}`,
    scans: item.scans?.map((scan, index) => ({
      ...scan,
      alt: `Celostranski posnetek ${index + 1}. strani intervjuja z Žanom Kafolom v neDelu`
    }))
  };
});
