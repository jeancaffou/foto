"use strict";

const route = "/2026/08/no-time-to-pose-planinska-jama.html";
const imageRoot = "/assets/blog/2026/08/planinska-jama/";

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function select(images, filenames) {
  const bySource = new Map(images.map((image) => [image.src, image]));
  return filenames.map((filename) => {
    const image = bySource.get(`${imageRoot}${filename}`);
    if (!image) throw new Error(`Missing Planinska jama story image: ${filename}`);
    return image;
  });
}

function figure(image, className, caption, eager = false) {
  return `<figure class="photo-story-figure ${className}">
        <img src="${image.src}" data-url="${image.src}" alt="${escapeAttribute(image.alt)}" loading="${eager ? "eager" : "lazy"}" decoding="async">
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>`;
}

function gallery(images, label) {
  return `<div class="photo-story-gallery" aria-label="${escapeAttribute(label)}">
${images.map((image) => `        <figure${image.className ? ` class="${image.className}"` : ""}>
          <img src="${image.src}" data-url="${image.src}" alt="${escapeAttribute(image.alt)}" loading="lazy" decoding="async">
        </figure>`).join("\n")}
      </div>`;
}

function content(lang, images) {
  const lead = select(images, ["20260813-IMG_1114.jpg"])[0];
  const routePlan = select(images, ["lokacija-nacrt.jpg"])[0];
  const outwardJourney = select(images, [
    "20260813-IMG_1085.jpg",
    "20260813-IMG_1090.jpg",
    "20260813-IMG_1092.jpg",
    "20260813-IMG_1095.jpg",
    "20260813-IMG_1105.jpg",
    "20260813-IMG_1116.jpg"
  ]);
  const divers = select(images, [
    "20260813-IMG_1131.jpg",
    "20260813-IMG_1133.jpg",
    "20260813-IMG_1141.jpg",
    "20260813-IMG_1156.jpg",
    "20260813-IMG_1166.jpg",
    "20260813-IMG_1171.jpg"
  ]);
  const technicalWork = select(images, [
    "20260813-IMG_1178.jpg",
    "20260813-IMG_1180.jpg",
    "20260813-IMG_1210.jpg",
    "20260813-IMG_1220.jpg",
    "20260813-IMG_1226.jpg",
    "20260813-IMG_1232.jpg",
    "20260813-IMG_1234.jpg"
  ]);
  const returnJourney = select(images, [
    "20260813-IMG_1264.jpg",
    "20260813-IMG_1266.jpg",
    "20260813-IMG_1277.jpg",
    "20260813-IMG_1295.jpg",
    "20260813-IMG_1301.jpg",
    "20260813-IMG_1308.jpg"
  ]);

  if (lang === "sl") {
    return `<blockquote><p>Štirje čolni, dva potapljača in nič časa za poziranje.</p></blockquote>

      <p>Delo v Planinski jami se je začelo dva dni prej. V torek, 11. avgusta, sva z Blažem Kogovškom nekaj čolnov odnesla od vhoda do Rudolfovega pristanišča. To je bila priprava na precej daljšo četrtkovo pot do konca Rakovega rokava.</p>

      ${figure(lead, "photo-story-figure--lead", "Čolni na poti skozi Rakov rokav.", true)}

      ${figure(routePlan, "photo-story-figure--map", "Rdeči krog označuje Skrivnostno jezero na koncu Rakovega rokava; pot se je začela pri vhodu in vodila prek Rudolfovega pristanišča.")}

      <h2>Od vhoda do Skrivnostnega jezera</h2>

      <p>V četrtek, 13. avgusta, nas je bilo osem. Poklicna potapljača sta bila Sebastjan Gantar in Simon Burja. Pri prenašanju opreme in delu so sodelovali Blaž Kogovšek, Žan Kafol, Franci Gabrovšek, Marko Matičič, Matej Jelovčan in Cyril Mayaud.</p>

      <p>Še preden smo prišli do vode, je bilo treba vso opremo spraviti čez podorno kamenje. Vsaka jeklenka z zrakom je tehtala približno 15 kilogramov, poleg njih pa smo nosili še transportne vreče oziroma transportke z orodjem, potapljaško opremo in moj fotografski nahrbtnik. Pot se je večkrat vzpela in spustila čez kupe podornega kamenja, zato noben kos tovora ni bil lahek ali priročen.</p>

      ${gallery(outwardJourney, "Pot s čolni skozi Rakov rokav")}

      <p>Pri Rudolfovem pristanišču smo naložili štiri čolne in se podali čez dolg vodni odsek Rakovega rokava. Nato smo jih morali znova potegniti iz vode, prenesti čez manjši hrib podornega kamenja in jih na drugi strani spet spustiti v vodo. Sledila je še zadnja vožnja do Skrivnostnega jezera.</p>

      <h2>Ni časa za poziranje</h2>

      <p>Fotografiranje tega dne je bilo skoraj nasprotje običajne jamske fotografije. Takšni posnetki navadno zahtevajo čas za postavitev luči, izbiro položajev in ponavljanje prizora. Tokrat ni čakal nihče. Vsi smo želeli čim prej priti do delovišča, opraviti delo in časa pod zemljo ne podaljševati zaradi fotografiranja.</p>

      <p>Tudi sam sem nosil težko in nerodno opremo. Nekaj minut za fotografije sem si lahko vzel predvsem takrat, ko smo vstopali v čolne ali izstopali iz njih, ko so drugi veslali ali ko je delo že potekalo. Noben posnetek v jami ni bil načrtovan ali poziran; dogajanje sem ujel tako, kot se je odvijalo.</p>

      ${gallery(divers, "Potapljača pri delu v Skrivnostnem jezeru")}

      <h2>Trideset let pod vodo</h2>

      <p>Pri Skrivnostnem jezeru je bila glavna naloga odstranitev približno 30 let stare črpalke, ki je bila nameščena za črpanje vode iz vrtine. Potapljača sta na globini približno 30 do 40 metrov pomagala razstaviti in odstraniti črpalko, cevi ter več nameščenih zapisovalnikov podatkov.</p>

      <p>Delo se je nadaljevalo tudi na skalnatem robu jezera, kjer je bilo treba dele stare kovinske opreme razrezati in pripraviti za pot iz jame. Fotografije zato sledijo istemu ritmu kot delo: od vode do orodja in spet nazaj, brez prekinitve za ponavljanje prizorov.</p>

      ${gallery(technicalWork, "Odstranjevanje stare opreme pri Skrivnostnem jezeru")}

      <p>Ko je bilo delo končano, je bilo treba vso pot opraviti še v nasprotni smeri: s čolni čez vodne odseke, s čolni in opremo čez podorno kamenje ter nato peš nazaj proti vhodu. Šele zunaj, pri skupinski fotografiji, smo vsi za trenutek obstali.</p>

      ${gallery(returnJourney, "Vrnitev iz Rakovega rokava in osemčlanska ekipa pred jamo")}

      <p>Nastal ni klasičen, skrbno osvetljen jamski portfelj, temveč zapis tehničnega dne v njegovem dejanskem tempu: veslanje, prenašanje, potapljanje, rezanje in delo v prostoru, kjer je že premik opreme velik del naloge.</p>

      <p><strong>Planinska jama, 13. avgust 2026.</strong></p>`;
  }

  return `<blockquote><p>Four boats, two divers and no time to pose.</p></blockquote>

      <p>The work in Planinska jama began two days earlier. On Tuesday, 11 August, Blaž Kogovšek and I carried several boats from the entrance to Rudolfovo pristanišče. It was the advance trip for Thursday’s much longer journey to the far end of Rakov rokav.</p>

      ${figure(lead, "photo-story-figure--lead", "Boats on the way through Rakov rokav.", true)}

      ${figure(routePlan, "photo-story-figure--map", "The red circle marks Skrivnostno jezero at the end of Rakov rokav; the route began at the entrance and continued via Rudolfovo pristanišče.")}

      <h2>From the entrance to Skrivnostno jezero</h2>

      <p>On Thursday, 13 August, there were eight of us. The professional divers were Sebastjan Gantar and Simon Burja. The team hauling equipment and helping with the work was Blaž Kogovšek, Žan Kafol, Franci Gabrovšek, Marko Matičič, Matej Jelovčan and Cyril Mayaud.</p>

      <p>Before we even reached the water, every piece of equipment had to cross the fallen rock. Each air tank weighed about 15 kilograms, and there were additional transport bags for tools, diving equipment and my camera pack. The route repeatedly climbed and descended piles of fallen rock, so none of the load was light or easy to handle.</p>

      ${gallery(outwardJourney, "Carrying the boats through Rakov rokav")}

      <p>At Rudolfovo pristanišče we loaded four boats and set off across a long water section of Rakov rokav. Then the boats had to come out again, be carried over a small hill of fallen rock and be relaunched on the other side. One final boat journey took us to Skrivnostno jezero.</p>

      <h2>No time to pose</h2>

      <p>Photographing the day was almost the opposite of conventional cave photography. Those images usually need time to position lights, choose where people stand and repeat a scene. Here, nobody waited. Everyone wanted to reach the work site quickly, finish the job and avoid extending the time underground for photographs.</p>

      <p>I was carrying heavy, cumbersome equipment as well. I could steal only a few minutes for photographs while people entered or left the boats, paddled or worked. None of the images inside the cave was planned or posed; I recorded the operation as it moved.</p>

      ${gallery(divers, "The divers working at Skrivnostno jezero")}

      <h2>Thirty years underwater</h2>

      <p>At Skrivnostno jezero, the main task was to remove a roughly 30-year-old pump that had been installed to pump water from a borehole. At depths of about 30 to 40 metres, the divers helped dismantle and remove the pump, hoses and several installed data loggers.</p>

      <p>The work continued on the rocky edge of the lake, where sections of the old metal equipment had to be cut apart and prepared for the journey out. The photographs follow the same rhythm as the job: from water to tools and back again, without stopping to repeat a scene.</p>

      ${gallery(technicalWork, "Removing the old equipment at Skrivnostno jezero")}

      <p>Once the work was complete, the whole route had to be reversed: boats across the water, boats and equipment over the fallen rock, then everything carried back toward the entrance. Only outside, for the final group photograph, did everyone stand still for a moment.</p>

      ${gallery(returnJourney, "The return from Rakov rokav and the eight-person team outside the cave")}

      <p>The result is not a conventional, carefully lit cave portfolio. It is a record of a technical day at its real pace: paddling, carrying, diving, cutting and working in a place where simply moving the equipment is a substantial part of the job.</p>

      <p><strong>Planinska jama, Slovenia, 13 August 2026.</strong></p>`;
}

module.exports = {
  id: "no-time-to-pose-planinska-jama",
  route,
  date: "2026-08-13T14:50:39+02:00",
  leadImage: `${imageRoot}20260813-IMG_1114.jpg`,
  featuredImage: `${imageRoot}20260813-IMG_1131.jpg`,
  images: [
    { src: `${imageRoot}20260813-IMG_1085.jpg`, className: "photo-story-gallery__wide" },
    { src: `${imageRoot}20260813-IMG_1090.jpg` },
    { src: `${imageRoot}20260813-IMG_1092.jpg` },
    { src: `${imageRoot}20260813-IMG_1095.jpg` },
    { src: `${imageRoot}20260813-IMG_1105.jpg` },
    { src: `${imageRoot}20260813-IMG_1114.jpg` },
    { src: `${imageRoot}20260813-IMG_1116.jpg`, className: "photo-story-gallery__portrait photo-story-gallery__portrait--solo" },
    { src: `${imageRoot}20260813-IMG_1131.jpg` },
    { src: `${imageRoot}20260813-IMG_1133.jpg` },
    { src: `${imageRoot}20260813-IMG_1141.jpg`, className: "photo-story-gallery__wide" },
    { src: `${imageRoot}20260813-IMG_1156.jpg` },
    { src: `${imageRoot}20260813-IMG_1166.jpg` },
    { src: `${imageRoot}20260813-IMG_1171.jpg` },
    { src: `${imageRoot}20260813-IMG_1178.jpg`, className: "photo-story-gallery__portrait" },
    { src: `${imageRoot}20260813-IMG_1180.jpg`, className: "photo-story-gallery__portrait" },
    { src: `${imageRoot}20260813-IMG_1210.jpg`, className: "photo-story-gallery__wide" },
    { src: `${imageRoot}20260813-IMG_1220.jpg` },
    { src: `${imageRoot}20260813-IMG_1226.jpg` },
    { src: `${imageRoot}20260813-IMG_1232.jpg` },
    { src: `${imageRoot}20260813-IMG_1234.jpg` },
    { src: `${imageRoot}20260813-IMG_1264.jpg`, className: "photo-story-gallery__portrait" },
    { src: `${imageRoot}20260813-IMG_1266.jpg` },
    { src: `${imageRoot}20260813-IMG_1277.jpg` },
    { src: `${imageRoot}20260813-IMG_1295.jpg` },
    { src: `${imageRoot}20260813-IMG_1301.jpg` },
    { src: `${imageRoot}20260813-IMG_1308.jpg`, className: "photo-story-gallery__wide" },
    { src: `${imageRoot}lokacija-nacrt.jpg` }
  ],
  versions: {
    en: {
      title: "Planina Cave: Technical Work, No Time to Pose",
      summary: "Four boats, two divers and a fast-moving technical operation at Skrivnostno jezero in Planinska jama.",
      metaItems: ["Planinska jama, Slovenia"],
      categories: [
        { name: "Cave diving", slug: "cave-diving" },
        { name: "Caves", slug: "jame" },
        { name: "Water", slug: "voda" }
      ],
      tags: [
        { name: "jama", slug: "jama" },
        { name: "jame", slug: "jame" },
        { name: "jamski potapljač", slug: "jamski-potapljac" },
        { name: "planina", slug: "planina" },
        { name: "podzemlje", slug: "podzemlje" },
        { name: "potapljanje", slug: "potapljanje" },
        { name: "voda", slug: "voda" },
        { name: "čoln", slug: "coln" },
        { name: "čolnarjenje", slug: "colnarjenje" }
      ],
      backLabel: "← Journal"
    },
    sl: {
      title: "Planinska jama: tehnično delo brez časa za poziranje",
      summary: "Štirje čolni, dva potapljača in tehnična akcija pri Skrivnostnem jezeru v Planinski jami.",
      metaItems: ["Planinska jama, Slovenija"],
      categories: [
        { name: "Jamsko potapljanje", slug: "jamsko-potapljanje" },
        { name: "jame", slug: "jame" },
        { name: "voda", slug: "voda" }
      ],
      tags: [
        { name: "jama", slug: "jama" },
        { name: "jame", slug: "jame" },
        { name: "jamski potapljač", slug: "jamski-potapljac" },
        { name: "planina", slug: "planina" },
        { name: "podzemlje", slug: "podzemlje" },
        { name: "potapljanje", slug: "potapljanje" },
        { name: "voda", slug: "voda" },
        { name: "čoln", slug: "coln" },
        { name: "čolnarjenje", slug: "colnarjenje" }
      ],
      backLabel: "← Blog"
    }
  },
  content
};
