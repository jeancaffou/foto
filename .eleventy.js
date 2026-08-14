const { renderWordPressEmbeds } = require("./scripts/lib/wordpress-content");
const wordpressPosts = require("./src/_data/wordpressPosts.json");
const imageDescriptions = require("./src/_data/imageDescriptions");
const { imageMetadata } = require("./scripts/lib/image-metadata");
const {
  absoluteUrl,
  blogPostingJsonLd,
  collectionJsonLd,
  featurePageJsonLd,
  galleryPageJsonLd,
  genericPageJsonLd,
  isoLjubljana,
  pageImageSources,
  pressArchiveJsonLd,
  pressPageJsonLd,
  profilePageJsonLd,
  xmlEscape
} = require("./scripts/lib/seo");

const wordpressPermalinks = new Set(wordpressPosts.map((post) => post.permalink));

function escapeAttribute(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function decodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&");
}

function setHtmlAttribute(tag, name, value) {
  const attribute = new RegExp(`\\s${name}=(['"])[\\s\\S]*?\\1`, "i");
  const rendered = ` ${name}="${escapeAttribute(value)}"`;
  if (attribute.test(tag)) return tag.replace(attribute, rendered);
  return tag.replace(/\s*\/?\s*>$/, (ending) => `${rendered}${ending}`);
}

function localizeWordPressContent(value, lang) {
  let localized = String(value ?? "")
    .replace(/<img\b[^>]*>/gi, (tag) => {
      const src = tag.match(/\bsrc=(['"])(.*?)\1/i)?.[2];
      const description = imageDescriptions[src]?.[lang];
      return description ? setHtmlAttribute(tag, "alt", description) : tag;
    })
    .replace(/aria-label=(['"])Open image (\d+) of (\d+) in full-screen\1/gi, (_match, quote, image, total) => (
      lang === "sl"
        ? `aria-label=${quote}Odpri fotografijo ${image} od ${total} v celozaslonskem pogledu${quote}`
        : `aria-label=${quote}Open photograph ${image} of ${total} in full-screen view${quote}`
    ))
    .replace(/title=(['"])YouTube video player\1/gi, (_match, quote) => (
      `title=${quote}${lang === "sl" ? "Predvajalnik videoposnetkov YouTube" : "YouTube video player"}${quote}`
    ));

  if (lang === "en") {
    localized = localized.replace(/href=(['"])(\/\d{4}\/\d{2}\/[^'"?#]+\.html)([^'"]*)\1/gi, (match, quote, url, suffix) => (
      wordpressPermalinks.has(url) ? `href=${quote}/en${url}${suffix}${quote}` : match
    ));
  }

  return renderWordPressEmbeds(localized, lang);
}

function formatBlogDate(value, lang = "en", style = "short") {
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const options = style === "long"
    ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    : { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(lang === "sl" ? "sl-SI" : "en-GB", options).format(date);
}

function rssDate(value) {
  const date = new Date(isoLjubljana(value));
  return Number.isNaN(date.valueOf()) ? "" : date.toUTCString();
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("contains", (value, fragment) => String(value ?? "").includes(String(fragment ?? "")));
  eleventyConfig.addFilter("decodeHtmlEntities", decodeHtmlEntities);
  eleventyConfig.addFilter("renderWordPressEmbeds", renderWordPressEmbeds);
  eleventyConfig.addFilter("localizeWordPressContent", localizeWordPressContent);
  eleventyConfig.addFilter("formatBlogDate", formatBlogDate);
  eleventyConfig.addFilter("imageAlt", (src, lang, fallback = "") => imageDescriptions[src]?.[lang] ?? fallback);
  eleventyConfig.addFilter("absoluteUrl", absoluteUrl);
  eleventyConfig.addFilter("blogPostingJsonLd", blogPostingJsonLd);
  eleventyConfig.addFilter("collectionJsonLd", collectionJsonLd);
  eleventyConfig.addFilter("galleryPageJsonLd", galleryPageJsonLd);
  eleventyConfig.addFilter("featurePageJsonLd", featurePageJsonLd);
  eleventyConfig.addFilter("pressPageJsonLd", pressPageJsonLd);
  eleventyConfig.addFilter("pressArchiveJsonLd", pressArchiveJsonLd);
  eleventyConfig.addFilter("genericPageJsonLd", genericPageJsonLd);
  eleventyConfig.addFilter("profilePageJsonLd", profilePageJsonLd);
  eleventyConfig.addFilter("pageImageSources", pageImageSources);
  eleventyConfig.addFilter("xmlEscape", xmlEscape);
  eleventyConfig.addFilter("isoLjubljana", isoLjubljana);
  eleventyConfig.addFilter("rssDate", rssDate);
  eleventyConfig.addFilter("imageWidth", (src) => imageMetadata(src)?.width ?? null);
  eleventyConfig.addFilter("imageHeight", (src) => imageMetadata(src)?.height ?? null);
  eleventyConfig.addFilter("imageMimeType", (src) => imageMetadata(src)?.mimeType ?? null);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
