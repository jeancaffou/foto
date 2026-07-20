# AGENTS

## Visual Direction

- Preserve the dark, restrained, image-led editorial direction of the supplied design.
- Keep production images local under `src/assets/`. Never hotlink image assets.
- Load the display typeface through Google Fonts; do not add local font binaries.
- Maintain strong type hierarchy, warm amber accents, fine rules, and generous negative space.
- Responsive layouts must reflow deliberately. Do not shrink desktop grids until they become unreadable.
- Motion should be sparse and meaningful. Respect `prefers-reduced-motion`.
- Keep all visible text at `0.88rem` or larger and use a restrained, tokenized type scale rather than scattered one-off sizes.

## Visual Fidelity Correction

- User correction: the first implementation was much too tall and did not follow the supplied composition closely enough.
- Earlier mistake: the 1440px render grew to 3532px, added a large heading above the work grid, used oversized vertical spacing, and changed the reference's compact editorial bands into long standalone sections.
- Preferred rule: compare against the 1086×1448 reference at its actual width. Preserve the shallow hero, four-column/two-row work grid, compact about band, split featured/press band, short journal row, and short footer.
- User correction: the first headshot derivative was badly cropped and aggressively processed.
- Earlier mistake: the source was cropped to 4:5, contrast-stretched, sharpened, darkened, and filtered again in CSS.
- Final source correction: use `context/20240312-IMG_3774.jpg` as supplied. A high-quality proportional downscale is acceptable, but do not crop, sharpen, stretch contrast, darken, retouch, or otherwise reinterpret the image.
- Preferred display rule: keep the photograph in color, apply only CSS grayscale at rest, and restore its original color on hover. Load it eagerly and avoid persistent compositing hints that can create filter artifacts.
- Source status: direct user correction on 2026-07-17.
- User correction: the hero must use the two National Geographic Slovenia winning photographs, `Cerkniško polje` and `Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan)`.
- Earlier mistake: the hero used unrelated images in rigid equal columns with a visible black divider.
- Preferred rule: let the landscape and vertical formats use unequal widths, overlap them, and crossfade the image pixels through the overlap. Keep both photographs in the same row on mobile and never hide the join behind a hard black seam.
- User correction: the about facts must use the map-pin, karst-water, and camera icons shown in the reference.
- Earlier mistake: text labels such as `Home`, `Collaboration`, and `Practice` were substituted for the visual icon column.
- Preferred rule: keep accessible hidden terms, but render the three fact rows with line icons and compact factual text. Blend the portrait into the dark background without artificial contrast or a visible light rectangle.
- User correction: press coverage must represent the actual interview and broadcast archive.
- Earlier mistake: only two cards were shown and both reused generic portrait images unrelated to the linked media.
- Preferred rule: use real local stills from each specific appearance. The verified archive includes four Radio 94 appearances, Dobro jutro, Primorska kronika, Prvi dnevnik, Na sončni strani, two RTV SLO written interviews, the Nedelo/Delo feature, two Prepih features, and the 2024 municipal-award coverage.
- Do not shorten the visible archive to make the band fit. Paginate it six items at a time and keep every verified entry in the DOM with accessible previous/next controls.
- The two RTV written interviews are `Če si amater, še ne pomeni, da si slab` at canonical article ID `689184` and `Da si lahko zares ustvarjalen, moraš včasih kršiti ustaljene okvire` at canonical article ID `691924`.
- The two Prepih features are the November 2022 `Žan Kafol: od zgoraj, od blizu` article and the April 2024 full interview `Prepih na obisku: Žan Kafol`. Use the supplied `context/odzgoraj.jpg` for the 2022 card.
- Žan received the `Županovo priznanje` in 2024 for special achievements in photography and promotion of the Municipality of Postojna. Use the supplied `context/OBČINA POSTOJNA PODELITEV OBČINSKIH PRIZNANJ 23.4.2024 - Valter Leban-0306.jpg` for this coverage.
- The supplied `context/nedelo1.jpg` is the readable neDelo article scan. Keep it local, expose it from the neDelo press card, and use the article line `If you want to get away, you go up or down` for the homepage quote.
- Do not add the Poček/Tednik appearance back without a direct request.
- `Na sončni strani` correction: the segment was entirely about paragliding. Earlier copy incorrectly blended in photography and the karst landscape because those topics appear elsewhere in Žan's public work. Keep this appearance described only as a paragliding conversation. Source status: direct user correction on 2026-07-18.

## Award Presentation

- Feature and award logos must be visually prominent and may stand alone above their descriptions. Do not reduce them to tiny marks inside text-heavy cards.
- Nikon correction: Žan's Nikon recognition was for the 2010 `Jaz sem` photo contest.
- Earlier mistake: the Nikon card incorrectly described the Nikon Z6II received as the 2023 National Geographic Slovenia prize as a Nikon photography award.
- Preferred rule: keep the 2010 Nikon contest recognition distinct from the later National Geographic prize equipment. On the English homepage use the official campaign form `I AM Nikon`, not `Jaz sem`.

## Homepage Language

- The portfolio homepage is English. Translate descriptive labels, award labels, category names, quotes, and homepage post titles into English.
- Press and interview headlines retain their original Slovenian titles. Surrounding interface labels and source metadata remain English.
- Keep Slovenian only when it is a proper name, such as `Žan Kafol`, `Cerkniško polje`, `Rakov Škocjan`, `Prepih`, `neDelo`, or `RTV Slovenija`.
- Do not expose unexplained Slovenian institutional labels. Use `Mayor's Award for Photography, 2024` and identify the body as `Municipality of Postojna, Slovenia`.
- Imported legacy blog articles retain their original text as required by the migration; the homepage language rule does not authorize rewriting the archived post bodies.

## Gallery Categories

- User correction: `Wild Places` was too generic and did not accurately describe the exported set.
- Preferred replacement: `Land & Life` at `/work/land-and-life/`, limited to the 12 coherent photographs of landscapes, trees, wildlife, people outdoors, Predjama Castle, and seasonal scenes.
- Every exported featured photograph belongs to exactly one collection. Do not duplicate aerial water, flight, cave-water, night-drone, or award images across otherwise unrelated categories.
- The two National Geographic winners belong only to `Award-winning`. Selected-work cards open the collection page, not an image hash or a raw image.
- On the `Award-winning` collection page, center each photograph horizontally in its own row and pair it with a factual description of its individual National Geographic Slovenia win.
- Gallery listings are reverse chronological by capture date, newest first.
- `20221010-G0399782.jpg` shows legs in water and belongs only to `Water & Ice`; it must never appear in `In Flight`.
- Earlier mistake: the filename was grouped with two nearby GoPro frames, including a valid paramotor water-skim photograph, without checking the actual image content. This produced a visually nonsensical In Flight assignment. The correction came directly from the user and was confirmed by inspecting the source image.
- Selected-work and collection-hero covers are fixed as follows: `20250212-IMG_7268-Enhanced-NR.jpg` for Below Ground, `20211114-vlcsnap-2021-11-14-19h39m09s315-Edit-2.jpg` for In Flight, `20201029-DJI_0456.jpg` for After Dark, `20200727-DJI_0263.jpg` for Water & Ice, and `20211025-IMG_2309.jpg` for Land & Life.

## Award Order And Logos

- Keep the feature order `National Geographic`, `Municipality of Postojna`, `Nikon`.
- Use the user-supplied `coatofarms-postojna.svg` as the Municipality of Postojna mark, localized at `src/assets/images/logo-postojna.svg`. It replaces the earlier `coat_of_arms_line_art_smooth.svg`; do not restore that older traced version. The replacement is a transparent white portrait-format coat of arms supplied directly by the user on 2026-07-18.
- Postojna coat-of-arms paint correction: the supplied SVG's original black and white filled shapes must not be displayed as fills. Render every path and polygon with `fill: none` and a thicker white outline so the line art remains legible at the compact homepage size. Source status: direct user correction on 2026-07-18.
- Keep the Nikon wordmark smaller than the National Geographic and municipal marks. The visible Nikon recognition is the 2010 `I AM Nikon` photo contest; never reintroduce `Nikon Z6II` as the award title.
- Published-in logo correction: use the user-supplied `radio94.svg` for Radio 94, localized at `src/assets/images/publication-radio-94.svg`. It must render as white outlines with transparent interiors and no filled shapes. Include the official local 24ur SVG and the existing National Geographic SVG in the monochrome Published in strip. Source status: direct user correction on 2026-07-19.
- Published-in sizing correction: the `16px` marks were slightly unreadable. Use a `21px` logo height in a `24px` row with a modest vertical inset. Source status: direct user correction on 2026-07-19.
- Radio 94 preservation correction: do not redraw, simplify, reinterpret, or replace the supplied Radio 94 artwork. An earlier attempt completely changed the logo while trying to simplify its outline geometry. Preserve the restored SVG exactly and adjust apparent line weight only through publication-strip CSS. Source status: direct user correction on 2026-07-19.
- Publication asset correction: use the exact STA logo from `https://upload.wikimedia.org/wikipedia/sl/6/67/Logotip_STA.svg`, localized as `src/assets/images/publication-sta.svg`. Use the user-supplied `primorskenovice.svg`, localized as `src/assets/images/publication-primorske-novice.svg`, instead of a hand-built placeholder. Source status: direct user correction on 2026-07-19.
- Quote placement correction: quotes belong below Press & Interviews, not Featured & Awarded. Rotate randomly among locally cited quotations on page load, preserve a no-JavaScript fallback, and translate Slovenian source text into natural English directly rather than using machine-translation services. Source status: direct user correction on 2026-07-19.

## Working Preferences

- Do not make incremental Git commits after each small correction. Keep related changes together and commit only when the user asks or when an explicitly requested larger batch is complete.
- Do not run Playwright after routine copy, data, or isolated asset changes. Run it only when the user asks or when a change materially affects layout or responsive behavior.

## WordPress Migration

- Never link internal content to `blog.kafol.net`; that WordPress site is being replaced by this Eleventy build. Internal links must be relative or root-relative.
- Preserve the legacy permalink format exactly: `/%year%/%monthnum%/%postname%.html`.
- The audited dump contains 194 published posts. Preserve each post's text and rendered HTML rather than re-authoring it.
- Preserve Jetpack tiled galleries, Gutenberg blocks, classic HTML, embeds, and custom layout fragments. Rewrite only obsolete absolute site/media URLs to local equivalents.
- Source content and uploads live under the ignored `context/` directory and must not be committed.
- Automated browser tests write to `_site_test/`, never `_site/`. Multiple Eleventy processes writing the same output directory caused transient old/mixed pages during development; keep test and local-dev outputs isolated.

## Portfolio Copy

- Use `Žan Kafol` with the correct diacritic and prefer `software engineer` for his technical role.
- Keep visible copy factual, direct, restrained, and readable.
- Do not write about the writing, source material, UI structure, or framing choices.
- Avoid inflated marketing language and stock contrast constructions such as `not X, but Y`.
- Use `photo stories` for photographic output. Avoid presenting `field documentation` as a line of work.
- Do not hardcode social or repository counts.

## Verified Photography Facts

- Žan is based in Postojna, Slovenia.
- His photography brings together aerial views, paragliding, caves, karst, nature, and night landscapes.
- He won the National Geographic Slovenia photo competition overall in 2022 with `Cerkniško polje` and again in 2023 with `Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan)`.
- The exact English title of `Razsvetljenje (Vse Mlečne ceste vodijo v Rakov Škocjan)` is `Enlightened (All Milky Ways Lead to Rakov Škocjan)`.
- He received Postojna's municipal recognition for photography and promotion of the municipality in 2024.
- He collaborates with the Karst Research Institute ZRC SAZU. Always use this official English word order; `Institute for Karst Research` is incorrect.
- Caves are part of karst, not something `beneath the karst`. The earlier tagline made a false geographic distinction. Prefer direct language connecting flight, caves and the karst landscape.
