"use strict";

const path = require("node:path");

const PHOTON_URL = /(?:https?:)?\/\/i\d\.wp\.com\/(?:blog\.kafol\.net\/|(?:www\.)?kafol\.net\/blog\/)(wp-content\/uploads\/[^\s"'<>),]+)(?:\?[^\s"'<>)]*)?/gi;
const BLOG_HOST = /(?:https?:)?\/\/(?:www\.)?blog\.kafol\.net(?=\/|[\s"'<>)]|$)/gi;
const LEGACY_BLOG_ROOT = /(?:https?:)?\/\/(?:www\.)?kafol\.net\/blog(?=\/|[\s"'<>)]|$)/gi;
const LOCAL_UPLOAD = /\/wp-content\/uploads\/([^\s"'<>),?#]+)(?:\?[^\s"'<>)]*)?/gi;
const LOCAL_BLOG_MEDIA = /\/assets\/blog\/([^\s"'<>),?#]+)/gi;
const EXTERNAL_MEDIA = new Map([
  [
    "https://upload.wikimedia.org/wikipedia/commons/4/46/Animation_of_C%EF%BC%8F2023_A3_around_Sun.gif",
    "/assets/blog/external/animation-of-c-2023-a3-around-sun.gif"
  ]
]);
const INTERNAL_URL_ALIASES = new Map([
  [
    "/2019/10/tandemski-polet-z-jadralnim-padalom-iz-javornikov-in-planinske-gore.html",
    "/2019/12/tandemski-polet-z-jadralnim-padalom-iz-javornikov-in-planinske-gore.html"
  ]
]);

const HTML_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: "\""
};

function decodeHtmlEntities(value) {
  return String(value ?? "").replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, body) => {
    if (body[0] === "#") {
      const radix = body[1].toLowerCase() === "x" ? 16 : 10;
      const digits = radix === 16 ? body.slice(2) : body.slice(1);
      const codePoint = Number.parseInt(digits, radix);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }

    return HTML_ENTITIES[body.toLowerCase()] ?? entity;
  });
}

function cleanUploadPath(value) {
  const decoded = decodeHtmlEntities(value).replace(/^\/+/, "");
  let normalized;

  try {
    normalized = decodeURIComponent(decoded);
  } catch {
    normalized = decoded;
  }

  normalized = normalized.replace(/\\/g, "/");
  normalized = path.posix.normalize(normalized);

  if (normalized.startsWith("../") || normalized === ".." || path.posix.isAbsolute(normalized)) {
    throw new Error(`Unsafe WordPress media path: ${value}`);
  }

  return normalized;
}

function rewriteWordPressUrls(value) {
  if (!value) {
    return value ?? "";
  }

  let rewritten = String(value);

  for (const [remoteUrl, localUrl] of EXTERNAL_MEDIA) {
    rewritten = rewritten.replaceAll(remoteUrl, localUrl);
  }

  rewritten = rewritten
    .replace(PHOTON_URL, (_match, uploadPath) => `/${uploadPath.split("?")[0]}`)
    .replace(LEGACY_BLOG_ROOT, "")
    .replace(BLOG_HOST, "")
    .replace(LOCAL_UPLOAD, (_match, uploadPath) => `/assets/blog/${encodeURI(cleanUploadPath(uploadPath))}`);

  for (const [legacyUrl, canonicalUrl] of INTERNAL_URL_ALIASES) {
    rewritten = rewritten.replaceAll(legacyUrl, canonicalUrl);
  }

  return rewritten;
}

function getMediaPaths(value) {
  const media = new Set();
  const content = String(value ?? "");
  let match;

  LOCAL_BLOG_MEDIA.lastIndex = 0;
  while ((match = LOCAL_BLOG_MEDIA.exec(content)) !== null) {
    media.add(cleanUploadPath(match[1]));
  }

  return [...media];
}

function stripMarkup(value) {
  return decodeHtmlEntities(
    String(value ?? "")
      .replace(/<!--(?:.|[\r\n])*?-->/g, " ")
      .replace(/<script\b[^>]*>(?:.|[\r\n])*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>(?:.|[\r\n])*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function makeExcerpt(explicitExcerpt, content, maxLength = 220) {
  const source = stripMarkup(explicitExcerpt) || stripMarkup(content);

  if (source.length <= maxLength) {
    return source;
  }

  const shortened = source.slice(0, maxLength + 1);
  const wordBoundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, wordBoundary > maxLength * 0.65 ? wordBoundary : maxLength).trim()}…`;
}

function getEmbedUrl(rawUrl) {
  let url;

  try {
    url = new URL(decodeHtmlEntities(rawUrl));
  } catch {
    return null;
  }

  const hostname = url.hostname.replace(/^www\./, "");
  let videoId = "";

  if (hostname === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] || "";
  } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    videoId = url.searchParams.get("v") || (["shorts", "embed"].includes(parts[0]) ? parts[1] : "") || "";
  }

  if (/^[\w-]{6,}$/.test(videoId)) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${videoId}`,
      title: "YouTube video",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    };
  }

  if (hostname === "tiktok.com" || hostname === "m.tiktok.com") {
    const match = url.pathname.match(/\/video\/(\d+)/);
    if (match) {
      return {
        src: `https://www.tiktok.com/player/v1/${match[1]}`,
        title: "TikTok video",
        allow: "encrypted-media; picture-in-picture"
      };
    }
  }

  return null;
}

function renderWordPressEmbeds(value) {
  return String(value ?? "").replace(
    /(<div\s+class=["']wp-block-embed__wrapper["']>)\s*(https?:\/\/[^\s<]+)\s*(<\/div>)/gi,
    (wrapper, openingTag, rawUrl, closingTag) => {
      const embed = getEmbedUrl(rawUrl);
      if (!embed) return wrapper;

      return `${openingTag}<iframe src="${embed.src}" title="${embed.title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="${embed.allow}" allowfullscreen></iframe>${closingTag}`;
    }
  );
}

module.exports = {
  decodeHtmlEntities,
  getMediaPaths,
  makeExcerpt,
  renderWordPressEmbeds,
  rewriteWordPressUrls
};
