const galleries = require("./galleries");

module.exports = {
  name: "Žan Kafol",
  eyebrow: "Aerial & cave photographer",
  email: "foto@kafol.net",
  location: "Postojna, Slovenia",
  social: [
    { label: "Instagram", url: "https://www.instagram.com/jeancaffou/", icon: "/assets/images/logo-instagram.svg" },
    { label: "Facebook", url: "https://www.facebook.com/jeancaffou", icon: "/assets/images/logo-facebook.svg" },
    { label: "TikTok", url: "https://www.tiktok.com/@jeancaffou", icon: "/assets/images/logo-tiktok.svg" },
    { label: "YouTube", url: "https://www.youtube.com/jeancaffou", icon: "/assets/images/logo-youtube.svg" }
  ],
  works: galleries.selected,
  press: [
    {
      title: "Fotografija Postojne iz zraka in pod zemljo",
      source: "Radio 94",
      year: "2026",
      image: "/assets/images/press-radio94.jpg",
      url: "https://www.youtube.com/watch?v=TYeM4MJ5kCQ",
      kind: "video"
    },
    {
      title: "Županovo priznanje za fotografijo",
      source: "Municipality of Postojna",
      year: "2024",
      image: "/assets/images/press-postojna-award.jpg",
      url: "https://www.postojna.si/objava/919103",
      kind: "award"
    },
    {
      title: "Prepih na obisku: Žan Kafol",
      source: "Prepih",
      year: "2024",
      image: "/assets/images/press-prepih-2024.jpg",
      url: "https://www.postojna.si/objava/910480",
      kind: "article"
    },
    {
      title: "Da si lahko zares ustvarjalen, moraš včasih kršiti ustaljene okvire",
      source: "RTV SLO, interview",
      year: "2023",
      image: "/assets/images/press-rtvslo-creative.jpg",
      url: "https://www.rtvslo.si/zabava-in-slog/ture-avanture/da-si-lahko-zares-ustvarjalen-moras-vcasih-krsiti-ustaljene-okvire/691924",
      kind: "article"
    },
    {
      title: "Če si amater, še ne pomeni, da si slab",
      source: "RTV SLO, interview",
      year: "2023",
      image: "/assets/images/press-rtvslo-interview.jpg",
      url: "https://www.rtvslo.si/kultura/vizualna-umetnost/ce-si-amater-se-ne-pomeni-da-si-slab-meni-veckrat-nagrajeni-fotograf-zan-kafol/689184",
      kind: "article"
    },
    {
      title: "Dvakratni zmagovalec National Geographica",
      source: "Dobro jutro, RTV SLO",
      year: "2023",
      image: "/assets/images/press-dobro-jutro.jpg",
      url: "https://www.youtube.com/watch?v=PE-eHr3zWnk",
      kind: "video"
    },
    {
      title: "Če se hočeš umakniti, greš gor ali pa dol",
      source: "neDelo",
      year: "2023",
      image: "/assets/images/press-nedelo.jpg",
      url: "/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/",
      kind: "article"
    },
    {
      title: "Žanu Kafolu se je v poletni noči vse poklopilo",
      source: "Radio 94",
      year: "2023",
      image: "/assets/images/press-radio94-natgeo-2023.jpg",
      url: "https://www.radio94.si/zanu-kafolu-se-je-v-poletni-noci-vse-poklopilo/",
      kind: "audio"
    },
    {
      title: "Razsvetljenje v Rakovem Škocjanu",
      source: "Primorska kronika, TV Koper",
      year: "2023",
      image: "/assets/images/press-primorska-kronika.jpg",
      url: "https://www.youtube.com/watch?v=OrNQ_4JSaoY",
      kind: "video"
    },
    {
      title: "Znova izbranec National Geographica",
      source: "Prvi dnevnik, RTV SLO",
      year: "2023",
      image: "/assets/images/press-prvi-dnevnik.jpg",
      url: "https://www.youtube.com/watch?v=fw4Psa0lcx0",
      kind: "video"
    },
    {
      title: "Žan Kafol: Na sončni strani",
      source: "TV Koper, RTV SLO",
      year: "2023",
      image: "/assets/images/press-soncna-stran.jpg",
      url: "https://www.youtube.com/watch?v=bkEhJ0gXGU4",
      kind: "video"
    },
    {
      title: "Žan Kafol: od zgoraj, od blizu",
      source: "Prepih",
      year: "2022",
      image: "/assets/images/press-prepih-2022.jpg",
      url: "/press/zan-kafol-od-zgoraj-od-blizu/",
      kind: "article"
    },
    {
      title: "Nedeljski klepet: Žan Kafol",
      source: "Radio 94",
      year: "2022",
      image: "/assets/images/press-radio94-nedeljski.jpg",
      url: "https://www.radio94.si/nedeljski-klepet-zan-kafol/",
      kind: "audio"
    },
    {
      title: "Žan Kafol zmagal na natečaju National Geographica",
      source: "Radio 94",
      year: "2022",
      image: "/assets/images/press-radio94-natgeo-2022.jpg",
      url: "https://www.radio94.si/zan-kafol-zmagal-na-natecaju-national-geographica/",
      kind: "audio"
    }
  ],
  features: [
    {
      name: "National Geographic",
      logo: "/assets/images/logo-national-geographic.svg",
      title: "Two-time overall winner",
      detail: "Cerkniško polje, 2022 · Enlightened (All Roads Lead to Rakov Škocjan), 2023",
      url: "/2023/10/druga-zmaga-na-national-geographic.html",
      className: "natgeo"
    },
    {
      name: "Municipality of Postojna",
      logo: "/assets/images/logo-postojna.svg",
      title: "Mayor's Award for Photography, 2024",
      detail: "Municipality of Postojna, Slovenia",
      url: "https://www.postojna.si/objava/919103",
      className: "postojna"
    },
    {
      name: "Nikon",
      logo: "/assets/images/logo-nikon.svg",
      title: "Awarded photographer, 2010",
      detail: "I AM Nikon photo contest",
      url: "https://iprom.si/blog/nikonova-kampanja-in-nagradni-natecaj-jaz-sem-navdusila-slovenijo/",
      className: "nikon"
    }
  ],
  publications: [
    { name: "RTV Slovenija", logo: "/assets/images/publication-rtv-slovenija.svg" },
    { name: "N1", logo: "/assets/images/publication-n1.svg" },
    { name: "STA", logo: "/assets/images/publication-sta.svg" },
    { name: "Delo", logo: "/assets/images/publication-delo.svg" },
    { name: "Primorske novice", logo: "/assets/images/publication-primorske-novice.svg" },
    { name: "Radio 94", logo: "/assets/images/publication-radio-94.svg" }
  ],
  ambassador: {
    name: "Visit Postojnsko",
    label: "Tourist ambassador for Visit Postojnsko (Tourism Postojna)",
    logo: "/assets/images/logo-visit-postojnsko.svg",
    url: "https://visit-postojna.si/"
  },
  posts: [
    { title: "Ice Cave in Paradana", excerpt: "Ice, darkness and a narrow beam of daylight in the Trnovski gozd karst.", date: "Feb 13, 2025", category: "Cave", url: "/2025/02/ledena-jama-v-paradani.html" },
    { title: "Northern Lights over Slovenia", excerpt: "The night the northern lights reached across the Slovenian sky.", date: "May 11, 2024", category: "Night sky", url: "/2024/05/severni-sij-aurora-borealis-v-sloveniji-maj-2024.html" },
    { title: "Flying over the Gulf of Trieste", excerpt: "A long paragliding line above the Karst edge and the Gulf of Trieste.", date: "Dec 25, 2023", category: "Flight", url: "/2023/12/letenje-nad-trzaskim-zalivom.html" }
  ]
};
