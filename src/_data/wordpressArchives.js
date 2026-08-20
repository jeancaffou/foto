"use strict";

const indexes = require("./wordpressTaxonomies.json");
const blogPosts = require("./blogPostsByLanguage");
const categoryTranslations = require("./blogCategoryTranslations");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

const PAGE_SIZE = Number(indexes.postsPerPage) || 21;
const FEED_SIZE = Number(indexes.postsPerRss) || 10;
const DEFAULT_IMAGE = "/assets/images/headshot.jpg";

const ARCHIVE_COPY = {
  en: {
    categoryLabel: "Category archive",
    tagLabel: "Tag archive",
    authorLabel: "Author archive",
    yearLabel: "Year archive",
    monthLabel: "Month archive",
    categoryHeading: "Category",
    tagHeading: "Tag",
    authorHeading: "Author",
    yearHeading: "Year",
    monthHeading: "Month",
    categoryDescription: "Photo stories filed under the category {name}.",
    tagDescription: "Photo stories carrying the tag {name}.",
    authorDescription: "Photo stories published by {name}.",
    yearDescription: "Photo stories published in {name}.",
    monthDescription: "Photo stories published in {name}.",
    page: "page",
    stories: "stories",
    empty: "There are no published stories in this archive.",
    navigation: "Archive pages",
    back: "Journal",
    newer: "Newer stories",
    older: "Older stories"
  },
  sl: {
    categoryLabel: "Arhiv kategorije",
    tagLabel: "Arhiv oznake",
    authorLabel: "Arhiv avtorja",
    yearLabel: "Letni arhiv",
    monthLabel: "Mesečni arhiv",
    categoryHeading: "Kategorija",
    tagHeading: "Oznaka",
    authorHeading: "Avtor",
    yearHeading: "Leto",
    monthHeading: "Mesec",
    categoryDescription: "Fotografske zgodbe v kategoriji {name}.",
    tagDescription: "Fotografske zgodbe z oznako {name}.",
    authorDescription: "Fotografske zgodbe avtorja {name}.",
    yearDescription: "Fotografske zgodbe, objavljene leta {name}.",
    monthDescription: "Fotografske zgodbe, objavljene v obdobju {name}.",
    page: "stran",
    stories: "zapisov",
    empty: "V tem arhivu ni objavljenih zgodb.",
    navigation: "Strani arhiva",
    back: "Blog",
    newer: "Novejše zgodbe",
    older: "Starejše zgodbe"
  }
};

const postsByLanguage = {
  en: new Map(blogPosts.en.filter((post) => post.sourceType === "wordpress").map((post) => [post.id, post])),
  sl: new Map(blogPosts.sl.filter((post) => post.sourceType === "wordpress").map((post) => [post.id, post]))
};

function sourcePostIds(descriptor) {
  return descriptor.postIds ?? [];
}

function postsFor(descriptor, lang) {
  return sourcePostIds(descriptor)
    .map((postId) => postsByLanguage[lang].get(postId))
    .filter(Boolean)
    .sort((left, right) => String(right.date).localeCompare(String(left.date)) || right.id - left.id);
}

function localizedTerm(term, lang, kind) {
  if (kind === "category") return categoryTranslations[term.name]?.[lang] ?? term.name;
  return term.name;
}

function monthName(year, month, lang) {
  return new Intl.DateTimeFormat(lang === "sl" ? "sl-SI" : "en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
}

function descriptorsFromTerms(kind, terms) {
  return terms.map((term) => ({
    kind,
    key: `${kind}:${term.slug}`,
    slug: term.slug,
    name: term.name,
    postIds: term.postIds,
    source: term
  }));
}

const descriptors = [
  ...descriptorsFromTerms("category", indexes.categories),
  ...descriptorsFromTerms("tag", indexes.tags),
  ...indexes.authors.map((author) => ({
    kind: "author",
    key: `author:${author.slug}`,
    slug: author.slug,
    name: author.name,
    postIds: author.postIds,
    source: author
  })),
  ...indexes.years.map((year) => ({
    kind: "year",
    key: `year:${year.year}`,
    year: year.year,
    name: year.year,
    postIds: year.postIds,
    source: year
  })),
  ...indexes.months.map((month) => ({
    kind: "month",
    key: `month:${month.year}-${month.month}`,
    year: month.year,
    month: month.month,
    name: monthName(month.year, month.month, "en-GB"),
    postIds: month.postIds,
    source: month
  }))
];

function prefix(lang) {
  return lang === "en" ? "/en" : "";
}

function archiveRoot(descriptor, lang) {
  const languagePrefix = prefix(lang);
  switch (descriptor.kind) {
    case "category": return `${languagePrefix}/category/${descriptor.slug}/`;
    case "tag": return `${languagePrefix}/tag/${descriptor.slug}/`;
    case "author": return `${languagePrefix}/author/${descriptor.slug}/`;
    case "year": return `${languagePrefix}/${descriptor.year}/`;
    case "month": return `${languagePrefix}/${descriptor.year}/${descriptor.month}/`;
    default: throw new Error(`Unknown WordPress archive kind: ${descriptor.kind}`);
  }
}

function archivePath(descriptor, lang, pageNumber = 0) {
  const root = archiveRoot(descriptor, lang);
  return pageNumber === 0 ? root : `${root}page/${pageNumber + 1}/`;
}

function localizedName(descriptor, lang) {
  if (descriptor.kind === "category" || descriptor.kind === "tag") {
    return localizedTerm(descriptor, lang, descriptor.kind);
  }
  if (descriptor.kind === "month") return monthName(descriptor.year, descriptor.month, lang);
  return descriptor.name;
}

function pageHeading(descriptor, lang) {
  const copy = ARCHIVE_COPY[lang];
  return `${copy[`${descriptor.kind}Heading`]}: ${localizedName(descriptor, lang)}`;
}

function pageDescription(descriptor, lang) {
  const copy = ARCHIVE_COPY[lang];
  return copy[`${descriptor.kind}Description`].replace("{name}", localizedName(descriptor, lang));
}

function pageTitle(descriptor, lang, pageNumber) {
  const copy = ARCHIVE_COPY[lang];
  const heading = pageHeading(descriptor, lang);
  const suffix = pageNumber === 0 ? "" : `, ${copy.page} ${pageNumber + 1}`;
  return `${heading}${suffix} — Žan Kafol`;
}

function makePage(descriptor, lang, pageNumber, pageCount, allPosts) {
  const canonicalPath = archivePath(descriptor, lang, pageNumber);
  const alternateLang = lang === "en" ? "sl" : "en";
  const alternatePath = archivePath(descriptor, alternateLang, pageNumber);
  const copy = { ...ui[lang], archive: ARCHIVE_COPY[lang] };
  const pagePosts = allPosts.slice(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE);
  const archiveCopy = ARCHIVE_COPY[lang];
  const title = pageTitle(descriptor, lang, pageNumber);

  return {
    kind: descriptor.kind,
    key: descriptor.key,
    lang,
    name: localizedName(descriptor, lang),
    sourceName: descriptor.name,
    pageNumber,
    pageCount,
    totalPosts: allPosts.length,
    pageSize: PAGE_SIZE,
    posts: pagePosts,
    permalink: `${canonicalPath}index.html`,
    canonicalPath,
    alternateUrl: alternatePath,
    xDefaultPath: archivePath(descriptor, "sl", pageNumber),
    previousUrl: pageNumber > 0 ? archivePath(descriptor, lang, pageNumber - 1) : null,
    nextUrl: pageNumber + 1 < pageCount ? archivePath(descriptor, lang, pageNumber + 1) : null,
    feedUrl: `${archiveRoot(descriptor, "sl")}feed/`,
    title,
    metaDescription: `${pageDescription(descriptor, lang)}${pageNumber === 0 ? "" : ` ${archiveCopy.page} ${pageNumber + 1}.`}`,
    heading: pageHeading(descriptor, lang),
    description: pageDescription(descriptor, lang),
    archiveLabel: archiveCopy[`${descriptor.kind}Label`],
    emptyText: archiveCopy.empty,
    storiesLabel: archiveCopy.stories,
    site: lang === "sl" ? siteSl : site,
    copy,
    ogImage: pagePosts[0]?.leadImage || allPosts[0]?.leadImage || DEFAULT_IMAGE
  };
}

const pages = [];
for (const descriptor of descriptors) {
  const allPosts = postsFor(descriptor, "sl");
  const pageCount = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  for (const lang of ["sl", "en"]) {
    const localizedPosts = postsFor(descriptor, lang);
    for (let pageNumber = 0; pageNumber < pageCount; pageNumber += 1) {
      pages.push(makePage(descriptor, lang, pageNumber, pageCount, localizedPosts));
    }
  }
}

const feeds = descriptors.map((descriptor) => {
  const archiveUrl = archiveRoot(descriptor, "sl");
  const feedPosts = postsFor(descriptor, "sl");
  return {
    lang: "sl",
    permalink: `${archiveUrl}feed/index.html`,
    feedUrl: `${archiveUrl}feed/`,
    archiveUrl,
    title: `${pageHeading(descriptor, "sl")} — Žan Kafol`,
    subtitle: pageDescription(descriptor, "sl"),
    posts: feedPosts.slice(0, FEED_SIZE)
  };
});

module.exports = pages;
module.exports.descriptors = descriptors;
module.exports.feeds = feeds;
module.exports.PAGE_SIZE = PAGE_SIZE;
module.exports.FEED_SIZE = FEED_SIZE;
