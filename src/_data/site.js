const galleries = require("./galleries");

module.exports = {
  name: "Žan Kafol",
  eyebrow: "Aerial & cave photographer",
  email: "foto@kafol.net",
  location: "Postojna, Slovenia",
  newsletterUrl: "https://kafol.net/newsletter/?lang=en",
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
      title: "Mayor's Award for Photography, 2024",
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
      description: "Radio 94 coverage of Enlightened (All Milky Ways Lead to Rakov Škocjan) and the 2023 National Geographic Slovenia win."
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
      detail: "Cerkniško polje, 2022 · Enlightened (All Milky Ways Lead to Rakov Škocjan), 2023",
      url: "/work/award-winning/",
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
    { title: "Microplastics in Postojna Cave: Another Month of Monitoring", excerpt: "With Raffaele, Blaž and Magdalena in Postojna Cave, changing samples for a study of microplastics settling out of the cave air.", date: "Sep 4, 2026", category: "Caves", url: "/en/2026/09/microplastics-postojna-cave.html" },
    { title: "Planina Cave: Technical Work, No Time to Pose", excerpt: "Four boats, two divers and a fast-moving technical operation at Skrivnostno jezero in Planinska jama.", date: "Aug 13, 2026", category: "Cave diving", url: "/en/2026/08/no-time-to-pose-planinska-jama.html" },
    { title: "Crescent Sun 🌒", excerpt: "A partial solar eclipse over Slovenia, seen through cloud and evening haze from Vremščica.", date: "Aug 12, 2026", category: "Solar eclipse", url: "/en/2026/08/crescent-sun-vremscica.html" }
  ]
};
