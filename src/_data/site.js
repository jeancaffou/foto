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
      url: "/press/fotografija-postojne-iz-zraka-in-pod-zemljo/",
      kind: "video",
      description: "A Radio 94 conversation about photographing Postojna from the air and below ground."
    },
    {
      title: "Županovo priznanje za fotografijo",
      source: "Municipality of Postojna",
      year: "2024",
      image: "/assets/images/press-postojna-award.jpg",
      url: "/featured/mayors-award-postojna-2024/",
      kind: "award",
      description: "Coverage of the 2024 Mayor's Award for special achievements in photography and promotion of the Municipality of Postojna, Slovenia."
    },
    {
      title: "Prepih na obisku: Žan Kafol",
      source: "Prepih",
      year: "2024",
      image: "/assets/images/press-prepih-2024.jpg",
      url: "/press/prepih-na-obisku-zan-kafol/",
      kind: "article",
      description: "A full interview about aerial photography, caves, karst landscapes and the work behind the photographs."
    },
    {
      title: "Da si lahko zares ustvarjalen, moraš včasih kršiti ustaljene okvire",
      source: "RTV SLO, interview",
      year: "2023",
      image: "/assets/images/press-rtvslo-creative.jpg",
      url: "/press/da-si-lahko-zares-ustvarjalen/",
      kind: "article",
      description: "An RTV Slovenija interview about creative decisions, established conventions and finding a personal photographic approach."
    },
    {
      title: "Če si amater, še ne pomeni, da si slab",
      source: "RTV SLO, interview",
      year: "2023",
      image: "/assets/images/press-rtvslo-interview.jpg",
      url: "/press/ce-si-amater-se-ne-pomeni-da-si-slab/",
      kind: "article",
      description: "A conversation about photography outside commercial practice, awarded work and the value of sustained amateur work."
    },
    {
      title: "Dvakratni zmagovalec National Geographica",
      source: "Dobro jutro, RTV SLO",
      year: "2023",
      image: "/assets/images/press-dobro-jutro.jpg",
      url: "/press/dvakratni-zmagovalec-national-geographica/",
      kind: "video",
      description: "A studio conversation following the second overall National Geographic Slovenia photo-competition win."
    },
    {
      title: "Če se hočeš umakniti, greš gor ali pa dol",
      source: "neDelo",
      year: "2023",
      image: "/assets/images/press-nedelo.jpg",
      url: "/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/",
      kind: "article",
      description: "A neDelo profile connecting flight, cave exploration and photography."
    },
    {
      title: "Žanu Kafolu se je v poletni noči vse poklopilo",
      source: "Radio 94",
      year: "2023",
      image: "/assets/images/press-radio94-natgeo-2023.jpg",
      url: "/press/zanu-kafolu-se-je-v-poletni-noci-vse-poklopilo/",
      kind: "audio",
      description: "Radio 94 coverage of Enlightened (All Roads Lead to Rakov Škocjan) and the 2023 National Geographic Slovenia win."
    },
    {
      title: "Razsvetljenje v Rakovem Škocjanu",
      source: "Primorska kronika, TV Koper",
      year: "2023",
      image: "/assets/images/press-primorska-kronika.jpg",
      url: "/press/razsvetljenje-v-rakovem-skocjanu/",
      kind: "video",
      description: "A Primorska kronika report on the award-winning photograph made beneath the Little Natural Bridge in Rakov Škocjan."
    },
    {
      title: "Znova izbranec National Geographica",
      source: "Prvi dnevnik, RTV SLO",
      year: "2023",
      image: "/assets/images/press-prvi-dnevnik.jpg",
      url: "/press/znova-izbranec-national-geographica/",
      kind: "video",
      description: "A Prvi dnevnik report on Žan Kafol's second overall National Geographic Slovenia photo-competition win."
    },
    {
      title: "Žan Kafol: Na sončni strani",
      source: "TV Koper, RTV SLO",
      year: "2023",
      image: "/assets/images/press-soncna-stran.jpg",
      url: "/press/na-soncni-strani/",
      kind: "video",
      description: "A television conversation for Na sončni strani focused entirely on paragliding."
    },
    {
      title: "Žan Kafol: od zgoraj, od blizu",
      source: "Prepih",
      year: "2022",
      image: "/assets/images/press-prepih-2022.jpg",
      url: "/press/zan-kafol-od-zgoraj-od-blizu/",
      kind: "article",
      description: "A Prepih feature about the aerial and close-range perspectives in Žan Kafol's photography."
    },
    {
      title: "Nedeljski klepet: Žan Kafol",
      source: "Radio 94",
      year: "2022",
      image: "/assets/images/press-radio94-nedeljski.jpg",
      url: "/press/nedeljski-klepet-zan-kafol/",
      kind: "audio",
      description: "A Sunday conversation on Radio 94 about photography, paragliding, caves and Postojna."
    },
    {
      title: "Žan Kafol zmagal na natečaju National Geographica",
      source: "Radio 94",
      year: "2022",
      image: "/assets/images/press-radio94-natgeo-2022.jpg",
      url: "/press/zan-kafol-zmagal-na-natecaju-national-geographica/",
      kind: "audio",
      description: "Radio 94 coverage of Cerkniško polje and the 2022 National Geographic Slovenia photo-competition win."
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
      title: "Mayor's Award, Postojna, 2024",
      detail: "Special achievements in photography and promotion of the Municipality of Postojna, Slovenia",
      url: "/featured/mayors-award-postojna-2024/",
      className: "postojna"
    },
    {
      name: "Nikon",
      logo: "/assets/images/logo-nikon.svg",
      title: "I Am Nikon photo contest, second place, 2010",
      detail: "Photo titled Jaz sem Raketa (I Am a Rocket) won second place on I Am Nikon photo contest",
      url: "/featured/i-am-nikon-jaz-sem-raketa/",
      className: "nikon"
    }
  ],
  publications: [
    { name: "National Geographic", logo: "/assets/images/logo-national-geographic.svg" },
    { name: "24ur", logo: "/assets/images/publication-24ur.svg" },
    { name: "RTV Slovenija", logo: "/assets/images/publication-rtv-slovenija.svg" },
    { name: "N1", logo: "/assets/images/publication-n1.svg" },
    { name: "STA", logo: "/assets/images/publication-sta.svg?v=20260719b" },
    { name: "Delo", logo: "/assets/images/publication-delo.svg" },
    { name: "Primorske novice", logo: "/assets/images/publication-primorske-novice.svg?v=20260719d", className: "primorske-novice" },
    { name: "Radio 94", logo: "/assets/images/publication-radio-94.svg?v=20260719d", className: "radio94" }
  ],
  ambassador: {
    name: "Visit Postojnsko",
    label: "Tourist ambassador for Visit Postojnsko (Tourism Postojna)",
    logo: "/assets/images/logo-visit-postojnsko.svg",
    url: "https://postojnsko.si/"
  },
  quotes: [
    {
      text: "If you want to get away, you go up or down.",
      source: "Žan Kafol, neDelo, 2023",
      url: "/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/"
    },
    {
      text: "If you're an amateur that doesn't mean you're bad, and if you're a professional, that doesn't mean you're good.",
      source: "Žan Kafol, RTV Slovenija, 2023",
      url: "/press/ce-si-amater-se-ne-pomeni-da-si-slab/"
    },
    {
      text: "To be truly creative, you have to sometimes break established conventions.",
      source: "Žan Kafol, RTV Slovenija, 2023",
      url: "/press/da-si-lahko-zares-ustvarjalen/"
    }
  ],
  posts: [
    { title: "Ice Cave in Paradana", excerpt: "Ice, darkness and a narrow beam of daylight in the Trnovski gozd karst.", date: "Feb 13, 2025", category: "Cave", url: "/2025/02/ledena-jama-v-paradani.html" },
    { title: "Northern Lights over Slovenia", excerpt: "The night the northern lights reached across the Slovenian sky.", date: "May 11, 2024", category: "Night sky", url: "/2024/05/severni-sij-aurora-borealis-v-sloveniji-maj-2024.html" },
    { title: "Flying over the Gulf of Trieste", excerpt: "A long paragliding line above the Karst edge and the Gulf of Trieste.", date: "Dec 25, 2023", category: "Flight", url: "/2023/12/letenje-nad-trzaskim-zalivom.html" }
  ]
};
