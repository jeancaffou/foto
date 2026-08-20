#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { parseTables } = require("./lib/mysql-dump");
const { decodeHtmlEntities, getMediaPaths } = require("./lib/wordpress-content");

const ROOT = path.resolve(__dirname, "..");
const DUMP_PATH = path.join(ROOT, "context", "blog.sql");
const POSTS_PATH = path.join(ROOT, "src", "_data", "wordpressPosts.json");
const TAXONOMIES_PATH = path.join(ROOT, "src", "_data", "wordpressTaxonomies.json");
const MANIFEST_PATH = path.join(ROOT, "scripts", "generated", "wordpress-media-manifest.json");
const EXPECTED_POSTS = 194;
const FORBIDDEN_HOSTS = [
  /(?:https?:)?\/\/blog\.kafol\.net/i,
  /(?:https?:)?\/\/(?:www\.)?kafol\.net\/blog(?:\/|\b)/i,
  /(?:https?:)?\/\/i\d\.wp\.com\/(?:blog\.kafol\.net|(?:www\.)?kafol\.net\/blog)/i
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(fs.existsSync(POSTS_PATH), "Imported post dataset is missing");
assert(fs.existsSync(TAXONOMIES_PATH), "Imported WordPress taxonomy index is missing");
assert(fs.existsSync(MANIFEST_PATH), "WordPress media manifest is missing");

const posts = JSON.parse(fs.readFileSync(POSTS_PATH, "utf8"));
const taxonomies = JSON.parse(fs.readFileSync(TAXONOMIES_PATH, "utf8"));
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

assert(posts.length === EXPECTED_POSTS, `Expected ${EXPECTED_POSTS} published posts, found ${posts.length}`);
assert(manifest.postCount === EXPECTED_POSTS, "Media manifest post count does not match the dataset");

const sourceTables = parseTables(DUMP_PATH, [
  "kafol_posts",
  "kafol_terms",
  "kafol_term_taxonomy",
  "kafol_term_relationships",
  "kafol_users"
]);
const sourceTerms = new Map(sourceTables.kafol_terms.map((term) => [Number(term.term_id), term]));
const sourceTaxonomyRows = sourceTables.kafol_term_taxonomy.filter((taxonomy) => ["category", "post_tag"].includes(taxonomy.taxonomy));
const sourcePublishedPosts = sourceTables.kafol_posts.filter((post) => post.post_type === "post" && post.post_status === "publish");
const importedByTaxonomy = new Map([
  ["category", new Map(taxonomies.categories.map((term) => [term.termTaxonomyId, term]))],
  ["post_tag", new Map(taxonomies.tags.map((term) => [term.termTaxonomyId, term]))]
]);
const publishedPostIds = new Set(posts.map((post) => post.id));
const publishedRelationships = new Map();

for (const relationship of sourceTables.kafol_term_relationships) {
  const postId = Number(relationship.object_id);
  const taxonomy = sourceTables.kafol_term_taxonomy.find((row) => Number(row.term_taxonomy_id) === Number(relationship.term_taxonomy_id));
  if (!publishedPostIds.has(postId) || !["category", "post_tag"].includes(taxonomy?.taxonomy)) continue;
  const key = `${taxonomy.taxonomy}:${taxonomy.term_taxonomy_id}`;
  if (!publishedRelationships.has(key)) publishedRelationships.set(key, []);
  publishedRelationships.get(key).push(postId);
}

assert(taxonomies.categories.length === sourceTaxonomyRows.filter((row) => row.taxonomy === "category").length, "Category archive index is incomplete");
assert(taxonomies.tags.length === sourceTaxonomyRows.filter((row) => row.taxonomy === "post_tag").length, "Tag archive index is incomplete");
assert(taxonomies.authors.length === 1, "Expected the single WordPress author archive");
assert(taxonomies.authors[0].slug === "zan", "The WordPress author archive is not keyed by zan");
assert(taxonomies.authors[0].postIds.length === sourcePublishedPosts.length, "The zan author archive does not include every published post");
assert(
  JSON.stringify(taxonomies.authors[0].postIds) === JSON.stringify(sourcePublishedPosts.map((post) => Number(post.ID)).sort((left, right) => left - right)),
  "The zan author archive membership changed"
);

for (const sourceTaxonomy of sourceTaxonomyRows) {
  const imported = importedByTaxonomy.get(sourceTaxonomy.taxonomy).get(Number(sourceTaxonomy.term_taxonomy_id));
  assert(imported, `Missing imported ${sourceTaxonomy.taxonomy}: ${sourceTaxonomy.term_taxonomy_id}`);
  const sourceTerm = sourceTerms.get(Number(sourceTaxonomy.term_id));
  assert(imported.slug === sourceTerm.slug, `Slug changed for ${sourceTaxonomy.taxonomy}: ${sourceTerm.slug}`);
  assert(imported.name === decodeHtmlEntities(sourceTerm.name), `Name changed for ${sourceTaxonomy.taxonomy}: ${sourceTerm.name}`);
  const expectedPostIds = [...new Set(publishedRelationships.get(`${sourceTaxonomy.taxonomy}:${sourceTaxonomy.term_taxonomy_id}`) ?? [])].sort((left, right) => left - right);
  assert(
    JSON.stringify(imported.postIds) === JSON.stringify(expectedPostIds),
    `Published post membership changed for ${sourceTaxonomy.taxonomy}: ${sourceTerm.slug}`
  );
}

const paths = new Set();
for (const post of posts) {
  assert(Number.isInteger(post.id), `Post is missing a numeric id: ${post.title}`);
  assert(post.title, `Post ${post.id} has no title`);
  assert(post.content !== undefined, `Post ${post.id} has no content field`);
  assert(post.excerpt !== undefined, `Post ${post.id} has no preserved excerpt field`);
  assert(typeof post.summary === "string", `Post ${post.id} has no card summary`);
  assert(/^\/\d{4}\/\d{2}\/[a-z0-9._~%-]+\.html$/i.test(post.permalink), `Invalid legacy permalink: ${post.permalink}`);
  assert(
    post.permalink === `/${post.date.slice(0, 4)}/${post.date.slice(5, 7)}/${post.slug}.html`,
    `Permalink does not match the post date and slug: ${post.permalink}`
  );
  assert(Array.isArray(post.categories), `Post ${post.id} has invalid categories`);
  assert(Array.isArray(post.tags), `Post ${post.id} has invalid tags`);
  assert(!paths.has(post.permalink), `Duplicate legacy permalink: ${post.permalink}`);
  paths.add(post.permalink);

  const serialized = JSON.stringify(post);
  for (const forbiddenHost of FORBIDDEN_HOSTS) {
    assert(!forbiddenHost.test(serialized), `Forbidden legacy host remains in ${post.permalink}`);
  }
  assert(
    !/<img\b[^>]*\bsrc=["']https?:\/\//i.test(post.content),
    `Hotlinked image remains in ${post.permalink}`
  );
}

assert(
  paths.has("/2023/10/druga-zmaga-na-national-geographic.html"),
  "The verified 2023 National Geographic permalink is missing"
);

const manifestPaths = new Set(manifest.media.map((media) => media.path));
assert(manifestPaths.size === manifest.media.length, "Media manifest contains duplicate paths");

const referencedMedia = new Set();
for (const post of posts) {
  for (const mediaPath of [
    ...getMediaPaths(post.content),
    ...getMediaPaths(post.excerpt),
    ...getMediaPaths(post.summary),
    ...getMediaPaths(post.featuredImage),
    ...getMediaPaths(post.leadImage)
  ]) {
    referencedMedia.add(mediaPath);
  }
}

for (const mediaPath of referencedMedia) {
  assert(manifestPaths.has(mediaPath), `Referenced media is absent from the manifest: ${mediaPath}`);
}

for (const media of manifest.media) {
  const destination = path.resolve(ROOT, media.destination);
  assert(fs.existsSync(destination), `Local production media is missing: ${media.destination}`);
  assert(fs.statSync(destination).size > 0, `Local production media is empty: ${media.destination}`);

  if (media.source) {
    const source = path.resolve(ROOT, media.source);
    assert(fs.existsSync(source), `Referenced WordPress source media is missing: ${media.source}`);
    assert(fs.statSync(source).size === fs.statSync(destination).size, `Copied media size differs: ${media.path}`);
  } else {
    assert(/^https:\/\//.test(media.sourceUrl), `Vendored media lacks an HTTPS source: ${media.path}`);
  }
}

process.stdout.write(
  `Validated ${posts.length} unique legacy permalinks and ${manifest.media.length} local media files.\n`
);
