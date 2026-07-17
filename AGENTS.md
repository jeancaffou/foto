# AGENTS

## Workflow

- Run an Eleventy build after each implementation milestone.
- Commit milestones incrementally with the repository-local identity `jeancaffou <jean@briskula.si>`.
- Validate desktop and mobile layouts with Playwright before finishing.
- Do not modify or commit the supplied `context/` folder or design reference image.

## Visual Direction

- Preserve the dark, restrained, image-led editorial direction of the supplied design.
- Keep production images local under `src/assets/`. Never hotlink image assets.
- Load the display typeface through Google Fonts; do not add local font binaries.
- Maintain strong type hierarchy, warm amber accents, fine rules, and generous negative space.
- Responsive layouts must reflow deliberately. Do not shrink desktop grids until they become unreadable.
- Motion should be sparse and meaningful. Respect `prefers-reduced-motion`.

## Visual Fidelity Correction

- User correction: the first implementation was much too tall and did not follow the supplied composition closely enough.
- Earlier mistake: the 1440px render grew to 3532px, added a large heading above the work grid, used oversized vertical spacing, and changed the reference's compact editorial bands into long standalone sections.
- Preferred rule: compare against the 1086×1448 reference at its actual width. Preserve the shallow hero, four-column/two-row work grid, compact about band, split featured/press band, short journal row, and short footer.
- User correction: the first headshot derivative was badly cropped and aggressively processed.
- Earlier mistake: the source was cropped to 4:5, contrast-stretched, sharpened, darkened, and filtered again in CSS.
- Final source correction: use `context/20240312-IMG_3774.jpg` as supplied. A high-quality proportional downscale is acceptable, but do not crop, sharpen, stretch contrast, darken, retouch, or otherwise reinterpret the image.
- Preferred display rule: keep the photograph in color, apply only CSS grayscale at rest, and restore its original color on hover. Load it eagerly and avoid persistent compositing hints that can create filter artifacts.
- Source status: direct user correction on 2026-07-17.
- User correction: the hero must use the two National Geographic Slovenia winning photographs, `Cerkniško polje` and `Razsvetljenje`.
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

## WordPress Migration

- Never link internal content to `blog.kafol.net`; that WordPress site is being replaced by this Eleventy build. Internal links must be relative or root-relative.
- Preserve the legacy permalink format exactly: `/%year%/%monthnum%/%postname%.html`.
- The audited dump contains 194 published posts. Preserve each post's text and rendered HTML rather than re-authoring it.
- Preserve Jetpack tiled galleries, Gutenberg blocks, classic HTML, embeds, and custom layout fragments. Rewrite only obsolete absolute site/media URLs to local equivalents.
- Source content and uploads live under the ignored `context/` directory and must not be committed.

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
- He won the National Geographic Slovenia photo competition overall in 2022 with `Cerkniško polje` and again in 2023 with `Razsvetljenje`.
- The exact English title of `Razsvetljenje` is `Enlightened (All Roads Lead to Rakov Škocjan)`. Do not translate it as `Illumination`.
- He received Postojna's municipal recognition for photography and promotion of the municipality in 2024.
- He collaborates with the Karst Research Institute ZRC SAZU. Always use this official English word order; `Institute for Karst Research` is incorrect.
- Caves are part of karst, not something `beneath the karst`. The earlier tagline made a false geographic distinction. Prefer direct language connecting flight, caves and the karst landscape.

## UI Audio

- Do not add typing sounds to autonomous UI, galleries, feeds, boot logs, or rotating content.
- Typing sounds are reserved for interactive console-focus reveals opened by a user action. This photography site currently has no audio behavior.
