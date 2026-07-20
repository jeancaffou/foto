const site = require("./site");
const galleries = require("./galleriesSl");

const pressCopy = {
  "/press/fotografija-postojne-iz-zraka-in-pod-zemljo/": "Pogovor za Radio 94 o fotografiranju Postojne iz zraka in pod zemljo.",
  "/featured/mayors-award-postojna-2024/": "Prispevek o Županovem priznanju 2024 za posebne dosežke v fotografiji in promocijo Občine Postojna.",
  "/press/prepih-na-obisku-zan-kafol/": "Obširen intervju o zračni in jamski fotografiji, kraški pokrajini ter delu v ozadju posnetkov.",
  "/press/da-si-lahko-zares-ustvarjalen/": "Intervju RTV Slovenija o ustvarjalnih odločitvah, ustaljenih okvirih in iskanju lastnega fotografskega izraza.",
  "/press/ce-si-amater-se-ne-pomeni-da-si-slab/": "Pogovor o fotografiji zunaj poklicne prakse, nagrajenih delih in vrednosti vztrajnega ljubiteljskega ustvarjanja.",
  "/press/dvakratni-zmagovalec-national-geographica/": "Studijski pogovor po drugi zaporedni skupni zmagi na fotografskem natečaju National Geographic Slovenija.",
  "/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/": "Portret v neDelu, ki povezuje letenje, raziskovanje jam in fotografijo.",
  "/press/zanu-kafolu-se-je-v-poletni-noci-vse-poklopilo/": "Prispevek Radia 94 o fotografiji Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan) in zmagi leta 2023.",
  "/press/razsvetljenje-v-rakovem-skocjanu/": "Prispevek Primorske kronike o nagrajeni fotografiji, posneti pod Malim naravnim mostom v Rakovem Škocjanu.",
  "/press/znova-izbranec-national-geographica/": "Prispevek Prvega dnevnika o drugi zaporedni skupni zmagi na fotografskem natečaju National Geographic Slovenija.",
  "/press/na-soncni-strani/": "Televizijski pogovor v oddaji Na sončni strani, posvečen izključno jadralnemu padalstvu.",
  "/press/zan-kafol-od-zgoraj-od-blizu/": "Prispevek v Prepihu o zračnih in bližnjih perspektivah v fotografiji Žana Kafola.",
  "/press/nedeljski-klepet-zan-kafol/": "Nedeljski pogovor na Radiu 94 o fotografiji, jadralnem padalstvu, jamah in Postojni.",
  "/press/zan-kafol-zmagal-na-natecaju-national-geographica/": "Prispevek Radia 94 o fotografiji Cerkniško polje in zmagi na natečaju National Geographic Slovenija 2022."
};

const localizedPress = site.press.map((item) => ({
  ...item,
  title: item.url === "/featured/mayors-award-postojna-2024/" ? "Županovo priznanje za fotografijo" : item.title,
  source: item.source === "Municipality of Postojna" ? "Občina Postojna" : item.source.replace(", interview", ", intervju"),
  description: pressCopy[item.url],
  url: item.url.startsWith("/press/") || item.url.startsWith("/featured/") ? `/sl${item.url}` : item.url
}));

module.exports = {
  ...site,
  eyebrow: "Zračni in jamski fotograf",
  location: "Postojna, Slovenija",
  works: galleries.selected,
  press: localizedPress,
  features: [
    {
      ...site.features[0],
      title: "Dvakratni skupni zmagovalec",
      detail: "Cerkniško polje, 2022 · Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan), 2023",
      url: "/sl/work/award-winning/"
    },
    {
      ...site.features[1],
      name: "Občina Postojna",
      title: "Županovo priznanje za fotografijo, 2024",
      detail: "Posebni dosežki v fotografiji in promocija Občine Postojna",
      url: "/sl/featured/mayors-award-postojna-2024/"
    },
    {
      ...site.features[2],
      title: "Fotografski natečaj I AM Nikon, drugo mesto, 2010",
      detail: "Fotografija Jaz sem Raketa je osvojila drugo mesto na natečaju I AM Nikon",
      url: "/sl/featured/i-am-nikon-jaz-sem-raketa/"
    }
  ],
  ambassador: {
    ...site.ambassador,
    label: "Turistični ambasador destinacije Visit Postojnsko (Turizem Postojna)"
  },
  quotes: [
    { text: "Če se hočeš umakniti, greš gor ali pa dol.", source: "Žan Kafol, neDelo, 2023", url: "/sl/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/" },
    { text: "Če si amater, še ne pomeni, da si slab, in če si profesionalec, še ne pomeni, da si dober.", source: "Žan Kafol, RTV Slovenija, 2023", url: "/sl/press/ce-si-amater-se-ne-pomeni-da-si-slab/" },
    { text: "Da si lahko zares ustvarjalen, moraš včasih kršiti ustaljene okvire.", source: "Žan Kafol, RTV Slovenija, 2023", url: "/sl/press/da-si-lahko-zares-ustvarjalen/" }
  ],
  posts: [
    { title: "Ledena jama v Paradani", excerpt: "Led, tema in ozek snop dnevne svetlobe v krasu Trnovskega gozda.", date: "13. feb. 2025", category: "Jame", url: "/2025/02/ledena-jama-v-paradani.html" },
    { title: "Severni sij nad Slovenijo", excerpt: "Noč, ko je severni sij segel čez slovensko nebo.", date: "11. maj 2024", category: "Nočno nebo", url: "/2024/05/severni-sij-aurora-borealis-v-sloveniji-maj-2024.html" },
    { title: "Letenje nad Tržaškim zalivom", excerpt: "Dolg jadralni prelet nad Kraškim robom in Tržaškim zalivom.", date: "25. dec. 2023", category: "Letenje", url: "/2023/12/letenje-nad-trzaskim-zalivom.html" }
  ]
};
