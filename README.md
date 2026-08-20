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
- `src/post.njk`: shared template for every blog post
- `src/press-index.njk`: complete press and interview archive
- `src/press.njk`: individual press and interview pages
- `src/_includes/layouts/`: shared document layouts
- `src/_data/site.js`: featured work, press, journal, and social data
- `src/_data/wordpressPosts.json`: imported post content and metadata
- `src/_data/wordpressTaxonomies.json`: complete WordPress category/tag membership plus author and date archive indexes
- `src/_data/blogPostVariants.js`: bilingual variants of the immutable WordPress import
- `src/_data/authored-posts/`: one module per newly authored post
- `src/_data/authoredBlogPosts.js`: builds bilingual authored-post variants
- `src/_data/blogPostsByLanguage.js`: the chronological merged index used by the main archive, feeds, post navigation, and taxonomy/date archives
- `src/assets/`: local images, styles, and scripts
- `scripts/`: deterministic WordPress and featured-image pipelines
- `tests/`: import, output, taxonomy, and responsive browser checks
- `_site/`: generated output

The build publishes merged archive families for imported and newly authored posts:
`/category/{slug}/`, `/tag/{slug}/`, `/author/{nicename}/`, `/{year}/`, and
`/{year}/{month}/`, with pagination and archive Atom feeds. English counterparts
are published beneath `/en/`; authored category slugs may be localized between
the Slovenian and English routes.

Keep production imagery local in `src/assets/`; the supplied `context/` folder and design reference are intentionally ignored.

## Adding a new blog post

Add one module under `src/_data/authored-posts/` with its legacy-style route, date, local images, and English and Slovenian versions. Register that module in `src/_data/authoredBlogPosts.js`. The shared post template then publishes the Slovenian version at the route and the English version beneath `/en/`; it also adds both versions to the archives, RSS feed, sitemap, language switch, adjacent-post navigation, and SEO metadata.
