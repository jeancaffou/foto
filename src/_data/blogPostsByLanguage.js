"use strict";

const migrated = require("./blogPostVariants");
const authored = require("./authoredBlogPosts");

function orderedPosts(lang) {
  const posts = [...migrated.byLanguage[lang], ...authored.byLanguage[lang]]
    .sort((left, right) => String(right.date).localeCompare(String(left.date)));
  const permalinks = new Set();
  posts.forEach((post) => {
    if (permalinks.has(post.permalink)) throw new Error(`Duplicate ${lang} blog permalink: ${post.permalink}`);
    permalinks.add(post.permalink);
  });

  return posts.map((post, index) => ({
    ...post,
    newerUrl: index > 0 ? posts[index - 1].permalink : null,
    olderUrl: post.navigation?.hideOlder ? null : (posts[index + 1]?.permalink ?? null)
  }));
}

const en = orderedPosts("en");
const sl = orderedPosts("sl");

module.exports = {
  en,
  sl,
  all: [...en, ...sl],
  migrated: [...en, ...sl].filter((post) => post.sourceType === "wordpress"),
  authored: [...en, ...sl].filter((post) => post.sourceType === "authored")
};
