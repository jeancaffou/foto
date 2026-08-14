"use strict";

const { decodeHtmlEntities } = require("./wordpress-content");

function getBlogImageUsages(posts) {
  const usages = new Map();

  function add(src, post, role, alt = "") {
    if (!src || !src.startsWith("/assets/blog/")) return;
    if (!usages.has(src)) {
      usages.set(src, { src, contexts: [] });
    }
    usages.get(src).contexts.push({
      postId: post.id,
      postTitle: post.title,
      postSummary: post.summary,
      permalink: post.permalink,
      role,
      alt: decodeHtmlEntities(alt)
    });
  }

  for (const post of posts) {
    add(post.featuredImage, post, "featured");
    add(post.leadImage, post, "lead");
    for (const match of post.content.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const src = tag.match(/\bsrc=(['"])(.*?)\1/i)?.[2];
      const alt = tag.match(/\balt=(['"])(.*?)\1/i)?.[2] ?? "";
      add(src, post, "content", alt);
    }
  }

  return [...usages.values()];
}

module.exports = { getBlogImageUsages };
