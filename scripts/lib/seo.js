"use strict";

const imageDescriptions = require("../../src/_data/imageDescriptions");
const { imageMetadata } = require("./image-metadata");

function absoluteUrl(value, origin = "https://foto.kafol.net") {
  const url = String(value ?? "");
  if (!url || url.startsWith("data:") || /^https?:\/\//i.test(url)) return url;
  return `${String(origin).replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

function plainText(value) {
  return String(value ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:x27|39);/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function isoLjubljana(value) {
  const raw = String(value ?? "");
  if (!raw || /(?:Z|[+-]\d{2}:?\d{2})$/i.test(raw)) return raw;
  const probe = new Date(`${raw}Z`);
  if (Number.isNaN(probe.valueOf())) return raw;
  const zone = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Ljubljana",
    timeZoneName: "longOffset"
  }).formatToParts(probe).find((part) => part.type === "timeZoneName")?.value;
  const offset = zone?.match(/GMT([+-]\d{2}:\d{2})/)?.[1] ?? "+01:00";
  return `${raw}${offset}`;
}

function imageSources(content, leadImage) {
  const sources = [];
  if (leadImage) sources.push(leadImage);
  for (const match of String(content ?? "").matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    sources.push(match[1]);
  }
  return [...new Set(sources)];
}

function pageImageSources(data) {
  if (data.post) return imageSources(data.post.content, data.post.leadImage);
  if (data.archivePage) return data.archivePage.posts.map((post) => post.featuredImage || post.leadImage).filter(Boolean);
  if (data.galleryPage) return data.galleryPage.gallery.images.map((image) => image.full || image.thumb).filter(Boolean);
  if (data.featurePage) return (data.featurePage.item.images || []).map((image) => image.src).filter(Boolean);
  if (data.pressPage) {
    const item = data.pressPage.item;
    return [...new Set([
      data.pressPage.seoImage?.src,
      item.image,
      item.scan,
      ...(item.scans || []).map((scan) => scan.src)
    ].filter(Boolean))];
  }
  if (data.pressArchivePage) return data.pressArchivePage.site.press.map((item) => item.image).filter(Boolean);
  if (data.homePage) return [...new Set([
    data.homePage.ogImage,
    "/assets/images/featured/full/20210810-IMG_1621.webp",
    "/assets/images/headshot.jpg",
    ...data.homePage.site.works.map((item) => item.image),
    ...data.homePage.site.press.map((item) => item.image)
  ].filter(Boolean))];
  if (data.ogImage) return [data.ogImage];
  return [];
}

function xmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function imageObject(src, lang, origin, suppliedDescription = "", extra = {}) {
  const description = suppliedDescription || imageDescriptions[src]?.[lang];
  const metadata = imageMetadata(src);
  return {
    "@type": "ImageObject",
    contentUrl: absoluteUrl(src, origin),
    ...(description ? { caption: description, description } : {}),
    ...(metadata?.width ? { width: metadata.width } : {}),
    ...(metadata?.height ? { height: metadata.height } : {}),
    ...(metadata?.mimeType ? { encodingFormat: metadata.mimeType } : {}),
    ...extra
  };
}

function person(origin, social = [], lang = "en") {
  return {
    "@type": "Person",
    "@id": `${origin}/#zan-kafol`,
    name: "Žan Kafol",
    url: `${origin}/`,
    jobTitle: lang === "sl" ? "Fotograf in programski inženir" : "Photographer and software engineer",
    homeLocation: {
      "@type": "Place",
      name: lang === "sl" ? "Postojna, Slovenija" : "Postojna, Slovenia"
    },
    image: imageObject("/assets/images/headshot.jpg", lang, origin),
    sameAs: social.map((item) => item.url)
  };
}

function breadcrumb(origin, lang, title, pageUrl) {
  const home = lang === "sl" ? "/sl/" : "/";
  const blog = lang === "sl" ? "/blog/" : "/en/blog/";
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "sl" ? "Domov" : "Home", item: absoluteUrl(home, origin) },
      { "@type": "ListItem", position: 2, name: lang === "sl" ? "Blog" : "Journal", item: absoluteUrl(blog, origin) },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(pageUrl, origin) }
    ]
  };
}

function blogPostingJsonLd(post, origin) {
  const description = plainText(post.seoDescription || post.summary);
  const images = imageSources(post.content, post.leadImage).map((src) => imageObject(src, post.lang, origin));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(post.permalink, origin)}#article`,
        mainEntityOfPage: absoluteUrl(post.permalink, origin),
        url: absoluteUrl(post.permalink, origin),
        headline: post.title,
        description,
        inLanguage: post.lang,
        datePublished: isoLjubljana(post.date),
        dateModified: isoLjubljana(post.modified),
        author: { "@id": `${origin}/#zan-kafol` },
        ...(images.length ? { image: images } : {}),
        keywords: [...new Set([...post.categories, ...(post.tags || [])].map((term) => term.name))].join(", ")
      },
      person(origin, post.site.social, post.lang),
      breadcrumb(origin, post.lang, post.title, post.permalink)
    ]
  }).replace(/</g, "\\u003c");
}

function collectionJsonLd(page, origin) {
  const pageSize = Number(page.pageSize) || 11;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(page.canonicalPath, origin),
    name: page.title,
    description: page.metaDescription,
    inLanguage: page.lang,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.posts.map((post, index) => ({
        "@type": "ListItem",
        position: page.pageNumber * pageSize + index + 1,
        url: absoluteUrl(post.permalink, origin),
        name: post.title
      }))
    }
  }).replace(/</g, "\\u003c");
}

function galleryPageJsonLd(page, origin) {
  const url = absoluteUrl(page.canonicalPath, origin);
  const images = page.gallery.images.map((image) => imageObject(
    image.full,
    page.lang,
    origin,
    image.alt,
    {
      name: image.title || image.alt,
      thumbnailUrl: absoluteUrl(image.thumb, origin),
      ...(image.captured ? { dateCreated: image.captured.slice(0, 10).replaceAll(":", "-") } : {}),
      creator: { "@id": `${origin}/#zan-kafol` },
      creditText: "Žan Kafol"
    }
  ));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: page.gallery.label,
        description: page.seoDescription || page.gallery.description,
        inLanguage: page.lang,
        primaryImageOfPage: imageObject(page.gallery.cover, page.lang, origin, page.gallery.coverAlt),
        mainEntity: { "@id": `${url}#gallery` }
      },
      {
        "@type": "ImageGallery",
        "@id": `${url}#gallery`,
        name: page.gallery.label,
        inLanguage: page.lang,
        associatedMedia: images
      },
      person(origin, page.site.social, page.lang)
    ]
  }).replace(/</g, "\\u003c");
}

function featurePageJsonLd(page, origin) {
  const url = absoluteUrl(page.canonicalPath, origin);
  const images = (page.item.images || []).map((image) => imageObject(image.src, page.lang, origin, image.alt));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url,
        name: page.item.title,
        description: page.item.summary,
        inLanguage: page.lang,
        ...(images.length ? { primaryImageOfPage: images[0], associatedMedia: images } : {}),
        about: { "@id": `${origin}/#zan-kafol` }
      },
      person(origin, page.site.social, page.lang)
    ]
  }).replace(/</g, "\\u003c");
}

function pressPageJsonLd(page, origin) {
  const url = absoluteUrl(page.canonicalPath, origin);
  const item = page.item;
  const imageEntries = item.scans || (item.scan
    ? [{ src: item.scan, alt: item.scanAlt }]
    : item.image ? [{ src: item.image, alt: item.imageAlt }]
      : page.seoImage ? [page.seoImage] : []);
  const images = imageEntries.map((image) => imageObject(image.src, page.lang, origin, image.alt));
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name: item.title,
    description: item.summary,
    inLanguage: page.lang,
    isPartOf: absoluteUrl(page.lang === "sl" ? "/sl/press/" : "/press/", origin),
    ...(images.length ? { primaryImageOfPage: images[0], associatedMedia: images } : {}),
    about: { "@type": "Person", name: "Žan Kafol", url: `${origin}/` }
  }).replace(/</g, "\\u003c");
}

function pressArchiveJsonLd(page, origin) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(page.canonicalPath, origin),
    name: page.copy.press.archiveTitle,
    description: page.copy.press.archiveMeta,
    inLanguage: page.lang,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.site.press.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(item.url, origin),
        name: item.title
      }))
    }
  }).replace(/</g, "\\u003c");
}

function genericPageJsonLd(pageUrl, title, description, lang, image, origin) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: absoluteUrl(pageUrl, origin),
    name: plainText(title),
    description: plainText(description),
    inLanguage: lang || "en",
    ...(image ? { primaryImageOfPage: imageObject(image, lang || "en", origin) } : {})
  }).replace(/</g, "\\u003c");
}

function profilePageJsonLd(homePage, origin) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(homePage.permalink.replace(/index\.html$/, ""), origin),
    name: homePage.copy.home.title,
    description: homePage.copy.home.metaDescription,
    inLanguage: homePage.lang,
    primaryImageOfPage: imageObject(homePage.ogImage, homePage.lang, origin, homePage.ogImageAlt),
    mainEntity: person(origin, homePage.site.social, homePage.lang)
  }).replace(/</g, "\\u003c");
}

module.exports = {
  absoluteUrl,
  blogPostingJsonLd,
  collectionJsonLd,
  featurePageJsonLd,
  galleryPageJsonLd,
  genericPageJsonLd,
  imageSources,
  isoLjubljana,
  pageImageSources,
  plainText,
  pressArchiveJsonLd,
  pressPageJsonLd,
  profilePageJsonLd,
  xmlEscape
};
