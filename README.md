# Žan Kafol Photo Stories

An [Eleventy](https://www.11ty.dev/) portfolio and photo journal for Žan Kafol. The site combines the image-led portfolio with 194 posts migrated from the original WordPress journal.

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

`npm test` validates the import and gallery taxonomy, builds an isolated `_site_test/` tree, runs reference-width, desktop, tablet, and mobile Playwright coverage, and checks every generated legacy permalink and local media reference. Screenshots and traces are written to the ignored `test-results/` directory.

Playwright never writes to the development `_site/` directory. This prevents an automated test build from replacing files while `npm run dev` is serving them.

## WordPress import

The committed journal dataset and media can be rebuilt from the ignored WordPress export:

```bash
npm run import:wordpress
```

The source dump is `context/blog.sql`; uploads are read from `context/wp-content/uploads/`. See `scripts/README.md` for the import stages and validation rules.

## Structure

- `src/index.njk`: homepage composition
- `src/blog.njk`: paginated journal archive
- `src/post.njk`: legacy post template with exact WordPress permalinks
- `src/_includes/layouts/`: shared document layouts
- `src/_data/site.js`: featured work, press, journal, and social data
- `src/_data/wordpressPosts.json`: imported post content and metadata
- `src/assets/`: local images, styles, and scripts
- `scripts/`: deterministic WordPress and featured-image pipelines
- `tests/`: import, output, taxonomy, and responsive browser checks
- `_site/`: generated output

Keep production imagery local in `src/assets/`; the supplied `context/` folder and design reference are intentionally ignored.
