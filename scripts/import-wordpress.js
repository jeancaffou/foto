#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { parseTables } = require("./lib/mysql-dump");
const {
  decodeHtmlEntities,
  getMediaPaths,
  makeExcerpt,
  rewriteWordPressUrls
} = require("./lib/wordpress-content");

const ROOT = path.resolve(__dirname, "..");
const DUMP_PATH = path.join(ROOT, "context", "blog.sql");
const POSTS_PATH = path.join(ROOT, "src", "_data", "wordpressPosts.json");
const TAXONOMIES_PATH = path.join(ROOT, "src", "_data", "wordpressTaxonomies.json");
const MANIFEST_PATH = path.join(ROOT, "scripts", "generated", "wordpress-media-manifest.json");
const TABLES = [
  "kafol_posts",
  "kafol_postmeta",
  "kafol_terms",
  "kafol_term_taxonomy",
  "kafol_term_relationships",
  "kafol_users",
  "kafol_options"
];
const EXTERNAL_MEDIA = {
  "external/animation-of-c-2023-a3-around-sun.gif": {
    sourceUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Animation_of_C-2023_A3_around_Sun.gif"
  }
};

function sortTerms(terms) {
  return terms.sort((left, right) => left.name.localeCompare(right.name, "sl"));
}

function buildTaxonomyLookup(tables) {
  const terms = new Map(
    tables.kafol_terms.map((term) => [Number(term.term_id), {
      name: decodeHtmlEntities(term.name),
      slug: term.slug
    }])
  );
  const taxonomies = new Map(
    tables.kafol_term_taxonomy.map((taxonomy) => [
      Number(taxonomy.term_taxonomy_id),
      { ...terms.get(Number(taxonomy.term_id)), taxonomy: taxonomy.taxonomy }
    ])
  );
  const byPost = new Map();

  for (const relationship of tables.kafol_term_relationships) {
    const postId = Number(relationship.object_id);
    const taxonomy = taxonomies.get(Number(relationship.term_taxonomy_id));

    if (!taxonomy?.name || !["category", "post_tag"].includes(taxonomy.taxonomy)) {
      continue;
    }

    if (!byPost.has(postId)) {
      byPost.set(postId, { categories: [], tags: [] });
    }

    const key = taxonomy.taxonomy === "category" ? "categories" : "tags";
    byPost.get(postId)[key].push({ name: taxonomy.name, slug: taxonomy.slug });
  }

  for (const postTerms of byPost.values()) {
    sortTerms(postTerms.categories);
    sortTerms(postTerms.tags);
  }

  return byPost;
}

function buildWordPressIndexes(tables, posts) {
  const terms = new Map(
    tables.kafol_terms.map((term) => [Number(term.term_id), {
      id: Number(term.term_id),
      name: decodeHtmlEntities(term.name),
      slug: term.slug
    }])
  );
  const taxonomies = new Map(
    tables.kafol_term_taxonomy.map((taxonomy) => [
      Number(taxonomy.term_taxonomy_id),
      {
        ...taxonomy,
        id: Number(taxonomy.term_taxonomy_id),
        term: terms.get(Number(taxonomy.term_id))
      }
    ])
  );
  const publishedPostIds = new Set(posts.map((post) => post.id));
  const postIdsByTaxonomy = new Map();

  for (const relationship of tables.kafol_term_relationships) {
    const postId = Number(relationship.object_id);
    const taxonomy = taxonomies.get(Number(relationship.term_taxonomy_id));

    if (!publishedPostIds.has(postId) || !["category", "post_tag"].includes(taxonomy?.taxonomy)) {
      continue;
    }

    if (!postIdsByTaxonomy.has(taxonomy.id)) {
      postIdsByTaxonomy.set(taxonomy.id, new Set());
    }
    postIdsByTaxonomy.get(taxonomy.id).add(postId);
  }

  function termIndexes(taxonomyName) {
    return tables.kafol_term_taxonomy
      .filter((taxonomy) => taxonomy.taxonomy === taxonomyName)
      .map((taxonomy) => {
        const taxonomyId = Number(taxonomy.term_taxonomy_id);
        const term = terms.get(Number(taxonomy.term_id));
        return {
          termId: term.id,
          termTaxonomyId: taxonomyId,
          name: term.name,
          slug: term.slug,
          count: Number(taxonomy.count),
          postIds: [...(postIdsByTaxonomy.get(taxonomyId) ?? [])].sort((left, right) => left - right)
        };
      })
      .sort((left, right) => left.name.localeCompare(right.name, "sl") || left.slug.localeCompare(right.slug));
  }

  function postDateIndexes(selector) {
    const groups = new Map();
    for (const post of posts.filter(selector)) {
      const key = selector === yearSelector
        ? post.year
        : `${post.year}-${post.month}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(post.id);
    }

    return [...groups]
      .sort(([left], [right]) => right.localeCompare(left))
      .map(([key, postIds]) => {
        if (selector === yearSelector) return { year: key, postIds };
        return { year: key.slice(0, 4), month: key.slice(5), postIds };
      });
  }

  const yearSelector = (post) => Boolean(post.year);
  const monthSelector = (post) => Boolean(post.year && post.month);
  const authorIds = new Map();
  for (const post of posts) {
    const source = tables.kafol_posts.find((row) => Number(row.ID) === post.id);
    const authorId = Number(source?.post_author);
    if (!authorIds.has(authorId)) authorIds.set(authorId, []);
    authorIds.get(authorId).push(post.id);
  }

  const authors = tables.kafol_users
    .filter((user) => authorIds.has(Number(user.ID)))
    .map((user) => ({
      id: Number(user.ID),
      slug: user.user_nicename,
      name: decodeHtmlEntities(user.display_name),
      postIds: [...authorIds.get(Number(user.ID))].sort((left, right) => left - right)
    }))
    .sort((left, right) => left.name.localeCompare(right.name, "sl"));

  const optionValue = (name, fallback) => {
    const value = Number(tables.kafol_options.find((option) => option.option_name === name)?.option_value);
    return Number.isInteger(value) && value > 0 ? value : fallback;
  };

  return {
    generatedFrom: "context/blog.sql",
    postCount: posts.length,
    postsPerPage: optionValue("posts_per_page", 10),
    postsPerRss: optionValue("posts_per_rss", 10),
    categories: termIndexes("category"),
    tags: termIndexes("post_tag"),
    authors,
    years: postDateIndexes(yearSelector),
    months: postDateIndexes(monthSelector)
  };
}

function buildMetaLookup(rows) {
  const meta = new Map();

  for (const row of rows) {
    const postId = Number(row.post_id);
    if (!meta.has(postId)) {
      meta.set(postId, new Map());
    }

    const postMeta = meta.get(postId);
    if (!postMeta.has(row.meta_key)) {
      postMeta.set(row.meta_key, []);
    }
    postMeta.get(row.meta_key).push(row.meta_value);
  }

  return meta;
}

function firstMeta(meta, postId, key) {
  return meta.get(Number(postId))?.get(key)?.[0] ?? null;
}

function attachmentPath(attachment, meta) {
  const attachedFile = firstMeta(meta, attachment?.ID, "_wp_attached_file");
  if (attachedFile) {
    return rewriteWordPressUrls(`/wp-content/uploads/${attachedFile}`);
  }

  const rewrittenGuid = rewriteWordPressUrls(attachment?.guid ?? "");
  return rewrittenGuid.startsWith("/assets/blog/") ? rewrittenGuid : null;
}

function buildPosts(tables) {
  const rowsById = new Map(tables.kafol_posts.map((post) => [Number(post.ID), post]));
  const meta = buildMetaLookup(tables.kafol_postmeta);
  const taxonomy = buildTaxonomyLookup(tables);
  const published = tables.kafol_posts.filter(
    (post) => post.post_type === "post" && post.post_status === "publish"
  );

  return published.map((post) => {
    const date = String(post.post_date);
    const [year, month] = date.slice(0, 7).split("-");
    const content = rewriteWordPressUrls(post.post_content);
    const sourceExcerpt = rewriteWordPressUrls(post.post_excerpt);
    const thumbnailId = Number(firstMeta(meta, post.ID, "_thumbnail_id"));
    const featuredImage = thumbnailId
      ? attachmentPath(rowsById.get(thumbnailId), meta)
      : null;
    const postTerms = taxonomy.get(Number(post.ID)) ?? { categories: [], tags: [] };
    const firstContentImage = getMediaPaths(content)[0];

    return {
      id: Number(post.ID),
      title: decodeHtmlEntities(post.post_title),
      slug: post.post_name,
      date: date.replace(" ", "T"),
      modified: String(post.post_modified).replace(" ", "T"),
      year,
      month,
      permalink: `/${year}/${month}/${post.post_name}.html`,
      excerpt: sourceExcerpt,
      summary: makeExcerpt(sourceExcerpt, content),
      categories: postTerms.categories,
      tags: postTerms.tags,
      featuredImage,
      leadImage: featuredImage ?? (firstContentImage ? `/assets/blog/${firstContentImage}` : null),
      content
    };
  }).sort((left, right) => right.date.localeCompare(left.date) || right.id - left.id);
}

function buildMediaManifest(posts) {
  const references = new Map();

  for (const post of posts) {
    const paths = new Set([
      ...getMediaPaths(post.content),
      ...getMediaPaths(post.excerpt),
      ...getMediaPaths(post.summary),
      ...getMediaPaths(post.featuredImage),
      ...getMediaPaths(post.leadImage)
    ]);

    for (const mediaPath of paths) {
      if (!references.has(mediaPath)) {
        references.set(mediaPath, []);
      }
      references.get(mediaPath).push(post.permalink);
    }
  }

  return [...references]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([mediaPath, postsUsingMedia]) => ({
      path: mediaPath,
      ...(EXTERNAL_MEDIA[mediaPath] ?? { source: `context/wp-content/uploads/${mediaPath}` }),
      destination: `src/assets/blog/${mediaPath}`,
      posts: postsUsingMedia.sort()
    }));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

if (!fs.existsSync(DUMP_PATH)) {
  throw new Error(`WordPress dump not found: ${DUMP_PATH}`);
}

const tables = parseTables(DUMP_PATH, TABLES);
const posts = buildPosts(tables);
const indexes = buildWordPressIndexes(tables, posts);
const media = buildMediaManifest(posts);

writeJson(POSTS_PATH, posts);
writeJson(TAXONOMIES_PATH, indexes);
writeJson(MANIFEST_PATH, {
  generatedFrom: "context/blog.sql",
  postCount: posts.length,
  mediaCount: media.length,
  media
});

process.stdout.write(
  `Imported ${posts.length} published posts, ${indexes.categories.length} categories, `
  + `${indexes.tags.length} tags, and ${media.length} referenced media files.\n`
);
