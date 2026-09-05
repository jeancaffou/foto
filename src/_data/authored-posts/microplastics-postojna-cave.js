"use strict";

const route = "/2026/09/microplastics-postojna-cave.html";
const imageRoot = "/assets/blog/2026/09/postojna-microplastics/";
const articleUrl = "https://www.primorski.eu/trzaska/po-kateri-poti-mikroplastika-prihaja-v-krasko-podzemlje-LX2257379";
const portraits = new Set([1344, 1373, 1400, 1404]);
const wide = new Set([1365, 1416, 1422, 1464]);

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function content(lang, images) {
  const byNumber = new Map(images.map((image) => [image.number, image]));
  function figure(number, caption = "", eager = false) {
    const image = byNumber.get(number);
    if (number === "map") {
      return `<figure class="photo-story-figure photo-story-figure--map"><img src="${image.src}" data-url="${image.src}" width="${image.width}" height="${image.height}" alt="${escapeAttribute(image.alt)}" loading="lazy" decoding="async"><figcaption>${caption}</figcaption></figure>`;
    }
    const stem = image.src.slice(0, -4);
    const portrait = portraits.has(number);
    return `<figure class="photo-story-figure ${image.className || ""}">
      <img src="${stem}-1200.jpg" srcset="${stem}-720.jpg ${portrait ? 480 : 720}w, ${stem}-1200.jpg ${portrait ? 800 : 1200}w, ${image.src} ${image.width}w" sizes="${wide.has(number) || caption ? "(max-width: 1200px) 100vw, 1160px" : "(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 580px"}" data-url="${image.src}" width="${image.width}" height="${image.height}" alt="${escapeAttribute(image.alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async">
      ${caption ? `<figcaption>${caption}</figcaption>` : ""}
    </figure>`;
  }
  function gallery(numbers, label) {
    return `<div class="photo-story-gallery" role="group" aria-label="${escapeAttribute(label)}">${numbers.map((number) => figure(number)).join("\n")}</div>`;
  }

  if (lang === "sl") {
    return `<p>V petek, 4. septembra, sem se Raffaeleju Bruschiju, dr. Blažu Kogovšku in dr. Magdaleni Aljančič pridružil pri delu v Postojnski jami. Raffaele v okviru svojega doktorata raziskuje, kako mikroplastika po zraku doseže jame, kako se po njih prenaša in kje se useda. Tokrat je bil čas za menjavo vzorcev in pripravo vzorčevalnikov na nov mesec meritev.</p>

      ${figure(1347, "Magdalena, Blaž in Raffaele na jamskem vlaku.", true)}

      <p>Raffaele in Blaž sta bila v fluorescentno oranžnih kombinezonih videti pripravljena na snemanje nove sezone serije <em>Prison Break</em>, tokrat v Postojnski jami. Kombinezona sta iz čistega bombaža in omejujeta vnos sintetičnih vlaken iz običajnih oblačil. Živa oranžna barva pa pomaga prepoznati morebitna bombažna vlakna, ki bi med delom zašla v vzorec.</p>

      <p>Jamski vlak je bil del naše poti, pa tudi eno od vprašanj raziskave. Raffaele se ukvarja z delci, ki jih med običajnim obiskom jame ne opazimo. Zanima ga, ali se njihovo usedanje razlikuje med deli jame z vlakom, množicami obiskovalcev in skoraj brez rednega turističnega obiska.</p>

      ${figure(1382, "Blaž in Raffaele pri menjavi vzorca v Postojnski jami.")}

      <h2>Nov mesec v steklenih posodah</h2>

      <p>Blaž je Raffaeleju pomagal zamenjati vodo v vzorčevalnikih in pospraviti zbrane vzorce. Ob stojalih sta razporedila steklene posode in se lotila dela. V svetlobi čelnih svetilk se je dobro videlo, koliko pozornosti zahteva že prelivanje vode iz ene posode v drugo.</p>

      ${gallery([1344, 1373, 1365, 1371, 1374], "Menjava vzorcev in priprava vzorčevalnikov")}

      <p>Pri delu sta uporabljala nitrilne rokavice brez pudra. Te so iz sintetičnega kavčuka in pomagajo omejiti onesnaženje pri rokovanju z vzorci. Njihova sestava je znana, zato lahko v laboratoriju z infrardečo analizo (µ-FTIR) preverijo, ali se spekter sumljivega delca ujema z materialom rokavic.</p>

      <p>Tudi premazi na notranji strani pokrovčkov lahko vsebujejo plastiko in prispevajo delce v vzorec. Aluminijasta folija pomaga vzorce zaščititi pred takšnim onesnaženjem. Delce, za katere pri analizi ugotovijo, da izvirajo iz premaza pokrovčkov, lahko pri vrednotenju okoljskega vzorca izločijo.</p>

      <p>Pomembni so tudi kontrolni oziroma slepi vzorci, s katerimi preverjajo, kaj bi se lahko v vzorce vneslo med rokovanjem, prevozom in laboratorijsko obdelavo. Brez takšnih kontrol bi lahko delce iz oblačil, opreme ali samega postopka pomotoma pripisali jamskemu okolju.</p>

      ${gallery([1400, 1404, 1405, 1409], "Prelivanje vzorca in pregled zbiralnih posod")}

      <p>Pasivni vzorčevalniki zbirajo delce, ki se iz zraka usedajo v posode, in tako beležijo njihovo odlaganje skozi čas. Zračni tokovi lahko delce prenašajo po jami, gibanje ljudi in vlaka pa lahko že odložene delce znova dvigne v zrak. Tudi pod zemljo torej prah nima nujno miru.</p>

      <p>Raffaele s sodelavci preizkuša nov prototip, prilagojen jamskemu okolju. Oblika rovov in prezračevanje se lahko precej spremenita že na kratki razdalji, zato en sam vzorec težko pove zgodbo cele jame. Primerjava več mest pomaga razumeti te razlike. V laboratoriju bo treba nato ugotoviti, kateri zbrani delci so plastični, kakšne oblike so in iz katerih polimerov so sestavljeni.</p>

      ${figure(1396, "Z opremo naprej po rovu ob tirih.")}

      <h2>Tri mesta v isti jami</h2>

      ${figure("map", "Tri območja meritev v Postojnski jami: 1 — Plesna dvorana, 2 — Pisani rov, 3 — Koncertna dvorana.")}

      <p>V Plesni dvorani so vzorčevalniki postavljeni na različnih oddaljenostih od proge. Tu raziskovalce zanima morebitni vpliv jamskega vlaka in gibanja zraka ob njegovem prehodu. Medtem ko sta delala in sem sam fotografiral, so mimo nas vozili rumeno-rdeči vagoni z obiskovalci, posode pa so ostajale na svojih mestih.</p>

      ${gallery([1416, 1422, 1427, 1430], "Vzorčevalniki in jamski vlak v Plesni dvorani")}

      <p>V Koncertni dvorani je v ospredju gibanje in zadrževanje večjega števila ljudi. Pisani rov, kjer rednega turističnega prometa skoraj ni, predstavlja primerjavo z manj obiskanim delom jame. Vsi trije predeli so del istega jamskega sistema, a se dogajanje v njih precej razlikuje.</p>

      ${gallery([1451, 1452, 1464], "Obiskovalci na vlaku skozi Plesno dvorano")}

      <p>Meritve še potekajo in rezultatov za zdaj ni. Raffaele želi ugotoviti, ali se količina in značilnosti odloženih mikroplastičnih delcev med temi okolji razlikujejo ter koliko je mogoče razlike povezati z obiskom in vlakom. Obenem bo delo pokazalo, kako se prototip obnese v jami. Takšni podatki bi lahko pomagali pri varovanju jam in načrtovanju podobnih meritev drugje.</p>

      <h2>Delo z obeh strani meje</h2>

      <p>Za posodami na stojalih je precej skupnega dela. Manuela Bisiacchi, Renzo Crevatin in Elvio Merlach z Univerze v Trstu so pomagali zamisel razviti v delujoč prototip. Pri projektu sodelujejo prof. dr. Lucia Gardossi, prof. dr. Monia Renzi in BioScience Research Center, kjer bodo vzorce analizirali v laboratoriju za prepoznavanje mikroplastike.</p>

      <p>Dr. Tanja Pipan in ekipa Inštituta za raziskovanje krasa ZRC SAZU prispevajo raziskovalno znanje, poznavanje jame in pomoč pri izvedbi. Na tokratni poti sta bila z nami dr. Magdalena Aljančič in dr. Blaž Kogovšek. Pomembno podporo pri delu v jami zagotavlja tudi Park Postojnska jama.</p>

      <p>O raziskavi je 27. avgusta v Primorskem dnevniku pisala tudi Sanela Čoralič: <a href="${articleUrl}">Po kateri poti mikroplastika prihaja v kraško podzemlje?</a></p>

      ${gallery([1488, 1518], "Raffaele in Blaž ob vzorčevalnikih v Plesni dvorani")}

      <p>Tudi tokrat je večina fotografij nastala brez poziranja, čeprav smo imeli čas in so bili vsi več kot pripravljeni pozirati. Vse pogosteje opažam, da so mi najbolj všeč prav spontani, nepozirani trenutki. Skrbno postavljanje ljudi v kader lahko hitro začne delovati nekoliko umetno.</p>

      <p>Raffaele, veselje je tudi na moji strani. Vedno je prijetno delati z motiviranimi in ustvarjalnimi ljudmi, ki svojo zamisel pripeljejo vse do dela na terenu. Hvala za povabilo in družbo — z veseljem še kdaj.</p>

      <p><strong>Postojnska jama, 4. september 2026.</strong></p>`;
  }

  return `<p>On Friday, 4 September, I joined Raffaele Bruschi, Dr Blaž Kogovšek and Dr Magdalena Aljančič for a morning of work in Postojna Cave. As part of his PhD, Raffaele is investigating how microplastics reach caves through the air, move through them and settle. This visit was for collecting the samples and preparing the samplers for another month of measurements.</p>

    ${figure(1347, "Magdalena, Blaž and Raffaele aboard the cave train.", true)}

    <p>In their fluorescent-orange coveralls, Raffaele and Blaž looked ready to film a new season of <em>Prison Break</em> in Postojna Cave. The coveralls are made from pure cotton and limit the introduction of synthetic fibres from their everyday clothes. The bright orange colour also makes any stray cotton fibres from the coveralls easier to recognise in a sample.</p>

    <p>The cave train was part of our journey, and also one of the questions behind the research. Raffaele is looking at particles that go unnoticed on an ordinary cave visit. He wants to know whether their deposition differs between areas with a train, crowds of visitors and almost no regular tourist traffic.</p>

    ${figure(1382, "Blaž and Raffaele changing a sample in Postojna Cave.")}

    <h2>Another month in the glass collectors</h2>

    <p>Blaž helped Raffaele change the water in the samplers and pack the collected samples. They arranged the glass containers beside the stands and got to work. In the light of their headlamps, even pouring water from one container into another showed how much care the job required.</p>

    ${gallery([1344, 1373, 1365, 1371, 1374], "Changing samples and preparing the collectors")}

    <p>They also used powder-free nitrile gloves. These are made from synthetic rubber and help limit contamination while handling the samples. Their composition is known, so the laboratory can use infrared analysis (µ-FTIR) to check whether a suspect particle’s spectrum matches the glove material.</p>

    <p>The coatings inside bottle caps can also contain plastic and introduce particles into a sample. Aluminium foil helps protect the samples from this contamination. Particles identified during analysis as coming from the cap coating can be excluded when interpreting the environmental sample.</p>

    <p>Control samples, known as blanks, also help reveal contamination introduced during handling, transport and laboratory processing. Without these checks, particles from clothing, equipment or the sampling process itself could easily be mistaken for particles from the cave environment.</p>

    ${gallery([1400, 1404, 1405, 1409], "Pouring a sample and checking the collection vessels")}

    <p>The passive samplers catch particles as they settle out of the air, recording deposition over time. Air currents can carry particles through the cave, while people and trains can stir settled particles back into the air. Apparently, even underground, dust does not necessarily get a quiet life.</p>

    <p>Raffaele and his collaborators are testing a new prototype adapted to cave conditions. Passage shape and ventilation can change considerably over a short distance, so a single sample can hardly tell the story of an entire cave. Comparing several positions helps make sense of those differences. The laboratory work will then establish which collected particles are plastic, what shapes they have and which polymers they consist of.</p>

    ${figure(1396, "Carrying the equipment onward through the passage beside the tracks.")}

    <h2>Three places in the same cave</h2>

    ${figure("map", "The three monitoring sectors in Postojna Cave: 1 — Plesna dvorana (Dance Hall), 2 — Pisani rov, 3 — Koncertna dvorana (Concert Hall).")}

    <p>In Plesna dvorana, the Dance Hall, the samplers stand at different distances from the railway. Here the researchers are investigating the possible influence of the cave train and the air movement accompanying its passage. As we worked and I took photographs, yellow and red carriages carried visitors past us, while the collectors stayed in place.</p>

    ${gallery([1416, 1422, 1427, 1430], "The samplers and cave train in Plesna dvorana")}

    <p>In Koncertna dvorana, the Concert Hall, the focus is on people walking and gathering in larger numbers. Pisani rov, a passage with almost no regular tourist traffic, provides a comparison with a less visited part of the cave. All three sectors belong to the same cave system, but the activity within them is quite different.</p>

    ${gallery([1451, 1452, 1464], "Visitors travelling through Plesna dvorana on the cave train")}

    <p>Monitoring is still underway and there are no results yet. Raffaele hopes to establish whether the quantity and characteristics of deposited microplastic particles differ between these settings, and how far any differences can be linked to visitors and the train. The work will also show how well the prototype performs inside a cave. The findings could help with cave conservation and planning similar monitoring elsewhere.</p>

    <h2>Work on both sides of the border</h2>

    <p>A considerable amount of shared work went into the collectors on their stands. Manuela Bisiacchi, Renzo Crevatin and Elvio Merlach at the University of Trieste helped turn the idea into a working prototype. The project involves Prof. Lucia Gardossi, Prof. Monia Renzi and the BioScience Research Center, where the samples will be analysed in a laboratory specialising in microplastic identification.</p>

    <p>Dr Tanja Pipan and the Karst Research Institute ZRC SAZU team contribute scientific expertise, knowledge of the cave and practical support. Dr Magdalena Aljančič and Dr Blaž Kogovšek were with us on this visit. Postojna Cave Park also provides essential support for the work inside the cave.</p>

    <p>Sanela Čoralič also covered the research in Primorski dnevnik on 27 August: <a href="${articleUrl}" hreflang="sl">How do microplastics reach the karst underground?</a> The article is in Slovenian.</p>

    ${gallery([1488, 1518], "Raffaele and Blaž beside the samplers in Plesna dvorana")}

    <p>Most of the photographs were taken without posing this time too, even though we had time and everyone was more than willing to pose. I increasingly find that the candid, spontaneous moments are my favourites. Carefully placing people in the frame can soon start to feel a little artificial.</p>

    <p>Raffaele, the pleasure is mine too. It is always enjoyable to work with motivated, creative people who carry an idea through to work in the field. Thank you for the invitation and the company — I would be happy to join you again.</p>

    <p><strong>Postojna Cave, Slovenia, 4 September 2026.</strong></p>`;
}

const categories = {
  sl: [{ name: "Jame", slug: "jame" }, { name: "Postojna", slug: "postojna" }, { name: "Narava", slug: "narava" }],
  en: [{ name: "Caves", slug: "jame" }, { name: "Postojna", slug: "postojna" }, { name: "Nature", slug: "narava" }]
};
const terms = [
  ["jama", "Cave", "jama"],
  ["jame", "Caves", "jame"],
  ["podzemlje", "Underground", "podzemlje"],
  ["kras", "Karst", "kras"],
  ["postojna", "Postojna", "postojna"],
  ["IZRK", "Karst Research Institute ZRC SAZU", "izrk"],
  ["kapniki", "Cave formations", "kapniki"],
  ["kapniške jame", "Dripstone caves", "kapniske-jame"],
  ["rovi", "Cave passages", "rovi"],
  ["Postojnska jama", "Postojna Cave", "postojnska-jama"],
  ["mikroplastika", "Microplastics", "mikroplastika", "microplastics"],
  ["raziskovanje", "Research", "raziskovanje", "research"]
];

module.exports = {
  id: "microplastics-postojna-cave",
  route,
  date: "2026-09-04T10:26:27+02:00",
  leadImage: `${imageRoot}20260904-IMG_1347.jpg`,
  featuredImage: `${imageRoot}20260904-IMG_1347-720.jpg`,
  images: [1344, 1347, 1365, 1371, 1373, 1374, 1382, 1396, 1400, 1404, 1405, 1409, 1416, 1422, 1427, 1430, 1451, 1452, 1464, 1488, 1518].map((number) => ({
    number,
    src: `${imageRoot}20260904-IMG_${number}.jpg`,
    width: portraits.has(number) ? 1600 : 2400,
    height: portraits.has(number) ? 2400 : 1600,
    className: portraits.has(number) ? "photo-story-gallery__portrait" : (wide.has(number) ? "photo-story-gallery__wide" : "")
  })).concat([{ number: "map", src: `${imageRoot}postojna-cave-monitoring-map.jpg`, width: 1801, height: 2048 }]),
  versions: {
    sl: {
      title: "Mikroplastika v Postojnski jami: nov mesec meritev",
      summary: "Z Raffaelejem, Blažem in Magdaleno v Postojnski jami: menjava vzorcev in raziskovanje mikroplastike, ki se useda iz jamskega zraka.",
      metaItems: ["Postojnska jama, Slovenija"],
      categories: categories.sl,
      tags: terms.map(([name, , slug]) => ({ name, slug })),
      backLabel: "← Blog"
    },
    en: {
      title: "Microplastics in Postojna Cave: Another Month of Monitoring",
      summary: "With Raffaele, Blaž and Magdalena in Postojna Cave, changing samples for a study of microplastics settling out of the cave air.",
      metaItems: ["Postojna Cave, Slovenia"],
      categories: categories.en,
      tags: terms.map(([, name, slSlug, enSlug]) => ({ name, slug: enSlug || slSlug })),
      backLabel: "← Journal"
    }
  },
  content
};
