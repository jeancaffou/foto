# Žan Kafol Photo Stories

An [Eleventy](https://www.11ty.dev/) portfolio and photo journal for Žan Kafol. The first-pass homepage follows a dark, image-led editorial direction built around aerial, cave, nature, and night photography.

## Development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:8080` by default.

## Checks

```bash
npm run build
npm test
```

`npm test` creates a production build and runs desktop and mobile Playwright coverage. Screenshots and traces are written to the ignored `test-results/` directory.

## Structure

- `src/index.njk`: homepage composition
- `src/_includes/layouts/`: shared document layouts
- `src/_data/site.js`: featured work, press, journal, and social data
- `src/assets/`: local images, styles, and scripts
- `tests/`: responsive Playwright checks
- `_site/`: generated output

Update work and journal details in `src/_data/site.js`. Keep production imagery local in `src/assets/images/`; the supplied `context/` folder and design reference are intentionally ignored.
