"use strict";

const { decodeHtmlEntities } = require("./wordpress-content");

const PROTECTED_BLOCK = /^(?:<!--|<script\b|<style\b|<svg\b)/i;
const HTML_TOKEN = /<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<svg\b[^>]*>[\s\S]*?<\/svg\s*>|<[^>]+>|[^<]+/gi;
const BARE_URLS = /^(?:https?:\/\/\S+\s*)+$/i;

function splitWhitespace(value) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  return {
    leading,
    value: value.slice(leading.length, value.length - trailing.length),
    trailing
  };
}

function isTranslatableText(value) {
  const readable = decodeHtmlEntities(value)
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!readable || BARE_URLS.test(readable)) return false;
  return /\p{L}/u.test(readable);
}

function tokenizeHtml(value) {
  return String(value ?? "").match(HTML_TOKEN) ?? [];
}

function getTranslatableSegments(value) {
  const segments = [];

  tokenizeHtml(value).forEach((token, tokenIndex) => {
    if (token.startsWith("<") || PROTECTED_BLOCK.test(token)) return;
    const split = splitWhitespace(token);
    if (!isTranslatableText(split.value)) return;
    segments.push({ tokenIndex, source: split.value });
  });

  return segments;
}

function escapeHtmlText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyTextTranslations(value, translations, label = "content") {
  const tokens = tokenizeHtml(value);
  const expected = getTranslatableSegments(value);

  if (!Array.isArray(translations) || translations.length !== expected.length) {
    throw new Error(`${label}: expected ${expected.length} translated text nodes, found ${translations?.length ?? "none"}`);
  }

  expected.forEach((segment, index) => {
    const entry = translations[index];
    if (!entry || entry.source !== segment.source || typeof entry.translation !== "string") {
      throw new Error(`${label}: translated text node ${index + 1} no longer matches its source`);
    }

    const split = splitWhitespace(tokens[segment.tokenIndex]);
    tokens[segment.tokenIndex] = `${split.leading}${escapeHtmlText(entry.translation)}${split.trailing}`;
  });

  return tokens.join("");
}

module.exports = {
  applyTextTranslations,
  getTranslatableSegments,
  isTranslatableText,
  tokenizeHtml
};
