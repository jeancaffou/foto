"use strict";

const posts = require("./blogPostsByLanguage");
const site = require("./site");
const siteSl = require("./siteSl");
const ui = require("./ui");

const PAGE_SIZE = 11;
const pages = [];

function archiveUrl(lang, pageNumber) {
  const root = lang === "en" ? "/en/blog" : "/blog";
  return pageNumber === 0 ? `${root}/` : `${root}/page/${pageNumber + 1}/`;
}

for (const lang of ["en", "sl"]) {
  const languagePosts = posts[lang];
  const pageCount = Math.ceil(languagePosts.length / PAGE_SIZE);
  for (let pageNumber = 0; pageNumber < pageCount; pageNumber += 1) {
    const url = archiveUrl(lang, pageNumber);
    const copy = ui[lang];
    const displayPage = pageNumber + 1;
    pages.push({
      lang,
      pageNumber,
      pageCount,
      totalPosts: languagePosts.length,
      posts: languagePosts.slice(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE),
      permalink: `${url}index.html`.replace("//index", "/index"),
      canonicalPath: url,
      alternateUrl: archiveUrl(lang === "en" ? "sl" : "en", pageNumber),
      xDefaultPath: archiveUrl("sl", pageNumber),
      previousUrl: pageNumber > 0 ? archiveUrl(lang, pageNumber - 1) : null,
      nextUrl: pageNumber + 1 < pageCount ? archiveUrl(lang, pageNumber + 1) : null,
      site: lang === "sl" ? siteSl : site,
      copy,
      title: pageNumber === 0
        ? copy.blog.title
        : copy.blog.titlePage.replace("{page}", displayPage),
      metaDescription: pageNumber === 0
        ? copy.blog.metaDescription
        : copy.blog.metaDescriptionPage.replace("{page}", displayPage)
    });
  }
}

module.exports = pages;
