"use strict";

const posts = require("./blogPostsByLanguage");

module.exports = {
  title: "Žan Kafol — Fotografski blog",
  description: "Fotografske zgodbe iz zraka, jam in kraške pokrajine.",
  archiveUrl: "/blog/",
  permalink: "/feed/",
  posts: posts.sl.slice(0, 20)
};
