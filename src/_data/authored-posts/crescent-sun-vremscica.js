"use strict";

const route = "/2026/08/crescent-sun-vremscica.html";

function gallery(images, label) {
  return `<div class="eclipse-gallery" aria-label="${label}">
${images.map((image) => `        <figure${image.className ? ` class="${image.className}"` : ""}>
          <img src="${image.src}" data-url="${image.src}" alt="${image.alt}" loading="${image.index === 0 ? "eager" : "lazy"}" decoding="async">
        </figure>`).join("\n")}
      </div>`;
}

function content(lang, images) {
  if (lang === "sl") {
    return `<blockquote><p>»Poskus je bil.«</p></blockquote>

      <p>Oblačnost je nad Slovenijo zakrila velik del delnega Sončevega mrka in nekaj časa je kazalo, da bodo najboljši pogledi ostali skriti za oblaki.</p>

      <p>Ko se je Sonce približalo obzorju, je vendarle pokukalo izpod debelejše oblačne plasti. Čez nebo so se še vedno raztezali tanki cirusi, ki so zmehčali sončno svetlobo in delovali kot naravni filter. Za nekaj trenutkov je bilo srpasto Sonce skozi meglico jasno vidno, obdano s toplimi barvami večernega neba.</p>

      <p>V Sloveniji smo opazovali delni Sončev mrk, ki je bil del precej večjega popolnega Sončevega mrka. V Ljubljani je Luna okoli 19.26 po srednjeevropskem poletnem času (CEST) začela prečkati Sončev disk, ko je bilo Sonce le 7,5° nad zahodno-severozahodnim obzorjem. Okoli 20.12 se je mrk že precej poglobil, Sonce pa se je skoraj dotikalo obzorja; zahod je sledil le nekaj minut pozneje, še preden se je mrk končal.</p>

      <p>Zelo majhna višina Sonca nad obzorjem pojasni tudi velik del barv na fotografijah. Ob zahodu mora sončna svetloba prepotovati precej debelejši sloj ozračja, pri tem pa se krajše modre valovne dolžine močneje sipajo. Sonce in okoliški oblaki so zato prevzeli oranžne in rdeče tone.</p>

      <p>Isti mrk je bil dlje proti zahodu in severu popoln, vzdolž ozkega pasu, ki je potekal čez Grenlandijo, Islandijo ter dele Španije in Portugalske. Geometrija mrka je iz Slovenije ponudila srp, ne popolne zatemnitve.</p>

      <p>Oblaki so fotografiranje otežili, vendar so prizor tudi preoblikovali. Namesto čistega astronomskega pogleda smo dobili spreminjajoče se plasti oranžne, rdeče in sence okoli srpastega Sonca.</p>

      <p>Precej drugačen pogled na mrk — in zaradi tega verjetno tudi bolj nepozaben.</p>

      ${gallery(images, "Fotografije delnega Sončevega mrka")}

      <p><strong>Slovenija, 12. avgust 2026.</strong></p>`;
  }

  return `<blockquote><p>“There was an attempt.”</p></blockquote>

      <p>The clouds obscured much of the partial solar eclipse over Slovenia, and for a while it seemed that the best views might stay hidden behind them.</p>

      <p>But as the Sun moved closer to the horizon, it finally emerged below the thicker cloud layer. Thin cirrus still stretched across the sky, softening the sunlight and acting as a natural filter. For a few moments, the crescent Sun was clearly visible through the haze, surrounded by the warm colours of the evening sky.</p>

      <p>From Slovenia, this was the partial version of a much larger total solar eclipse. In Ljubljana, the Moon first began crossing the solar disc at about 19:26 CEST, when the Sun stood just 7.5° above the WNW horizon. By around 20:12, the eclipse had deepened considerably and the Sun was almost touching the horizon; sunset followed only minutes later, before the eclipse itself had finished.</p>

      <p>The extremely low altitude also explains much of the colour in these images. Near sunset, sunlight passes through a far greater thickness of atmosphere, scattering much of the shorter-wavelength blue light and leaving the Sun and surrounding clouds dominated by orange and red tones.</p>

      <p>The same eclipse was total farther west and north, along a narrow path crossing Greenland, Iceland and parts of Spain and Portugal. From Slovenia, the geometry left a crescent rather than complete totality.</p>

      <p>The clouds made the eclipse harder to photograph, but they also transformed the scene. Instead of a clean astronomical view, we got shifting layers of orange, red and shadow around the crescent.</p>

      <p>A very different kind of eclipse view — and probably a more memorable one because of it.</p>

      ${gallery(images, "Photographs from the partial solar eclipse")}

      <p><strong>Slovenia, 12 August 2026.</strong></p>`;
}

module.exports = {
  id: "crescent-sun-vremscica",
  route,
  date: "2026-08-12T20:18:16+02:00",
  leadImage: "/assets/blog/2026/08/20260812-IMG_1070.jpg",
  featuredImage: "/assets/blog/2026/08/20260812-IMG_1030.jpg",
  images: [
    { src: "/assets/blog/2026/08/20260812-IMG_1070.jpg", className: "eclipse-gallery__wide" },
    { src: "/assets/blog/2026/08/20260812-IMG_1030.jpg" },
    { src: "/assets/blog/2026/08/20260812-IMG_1038.jpg" },
    { src: "/assets/blog/2026/08/20260812-IMG_1043.jpg" },
    { src: "/assets/blog/2026/08/20260812-IMG_1045.jpg" },
    { src: "/assets/blog/2026/08/20260812-IMG_1074.jpg" },
    { src: "/assets/blog/2026/08/20260812-IMG_1076.jpg" },
    { src: "/assets/blog/2026/08/20260812-IMG_1078.jpg" }
  ],
  navigation: { hideOlder: true },
  versions: {
    en: {
      title: "Crescent Sun 🌒",
      summary: "A partial solar eclipse over Slovenia, seen through cloud and evening haze from Vremščica.",
      metaItems: ["Vremščica, Slovenia"],
      categories: [
        { name: "Solar eclipse", slug: "solar-eclipse" },
        { name: "Sun", slug: "sonce" },
        { name: "Moon", slug: "luna" },
        { name: "Sky", slug: "nebo" },
        { name: "Clouds", slug: "oblaki" },
        { name: "Weather", slug: "vreme" }
      ],
      tags: [
        { name: "astrofoto", slug: "astrofoto" },
        { name: "astronomija", slug: "astronomija" },
        { name: "luna", slug: "luna" },
        { name: "oblak", slug: "oblak" },
        { name: "oblaki", slug: "oblaki" },
        { name: "sonce", slug: "sonce" },
        { name: "vreme", slug: "vreme" }
      ],
      backLabel: "← Journal"
    },
    sl: {
      title: "Srpasto Sonce 🌒",
      summary: "Delni Sončev mrk nad Slovenijo, ujet skozi oblake in večerno meglico z Vremščice.",
      metaItems: ["Vremščica, Slovenija"],
      categories: [
        { name: "Sončev mrk", slug: "soncev-mrk" },
        { name: "sonce", slug: "sonce" },
        { name: "luna", slug: "luna" },
        { name: "nebo", slug: "nebo" },
        { name: "oblaki", slug: "oblaki" },
        { name: "vreme", slug: "vreme" }
      ],
      tags: [
        { name: "astrofoto", slug: "astrofoto" },
        { name: "astronomija", slug: "astronomija" },
        { name: "luna", slug: "luna" },
        { name: "oblak", slug: "oblak" },
        { name: "oblaki", slug: "oblaki" },
        { name: "sonce", slug: "sonce" },
        { name: "vreme", slug: "vreme" }
      ],
      backLabel: "← Blog"
    }
  },
  content
};
