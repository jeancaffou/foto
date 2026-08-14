"use strict";

const posts = require("./blogPostsByLanguage");

module.exports = [
  {
    lang: "sl",
    permalink: "/blog/feed.xml",
    archiveUrl: "/blog/",
    title: "Žan Kafol — Fotografski blog",
    subtitle: "Fotografske zgodbe iz zraka, jam in kraške pokrajine.",
    posts: posts.sl.slice(0, 20)
  },
  {
    lang: "en",
    permalink: "/en/blog/feed.xml",
    archiveUrl: "/en/blog/",
    title: "Žan Kafol — Photo journal",
    subtitle: "Photo stories from the air, caves and the karst landscape.",
    posts: posts.en.slice(0, 20)
  }
];
