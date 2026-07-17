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
- Preferred rule: keep a landscape crop from `Zan-Kafol-1024x683.jpg` that removes unused sky and side margins without cutting the head, shoulders, or torso. Use grayscale conversion only; do not add contrast, brightness, sharpening, or additional CSS filters.
- Source status: direct user correction on 2026-07-17.

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
- He received Postojna's municipal recognition for photography and promotion of the municipality in 2024.
- He collaborates with the Institute for Karst Research ZRC SAZU. Describe this accurately as technical collaboration and support work.

## UI Audio

- Do not add typing sounds to autonomous UI, galleries, feeds, boot logs, or rotating content.
- Typing sounds are reserved for interactive console-focus reveals opened by a user action. This photography site currently has no audio behavior.
