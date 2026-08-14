"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const posts = require("../src/_data/wordpressPosts.json");
const blogPostsByLanguage = require("../src/_data/blogPostsByLanguage");
const pressFeatures = require("../src/_data/pressFeatures");
const featurePages = require("../src/_data/featurePages");
const galleryPages = require("../src/_data/galleryPages");
const pressPages = require("../src/_data/pressPages");
const featuredPageVariants = require("../src/_data/featuredPageVariants");
const site = require("../src/_data/site");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.resolve(ROOT, process.env.SITE_OUTPUT || "_site");

function outputPath(urlPath) {
  const cleanPath = urlPath.split(/[?#]/, 1)[0];
  const relativePath = cleanPath.replace(/^\/+/, "");
  if (relativePath.endsWith("/")) return path.join(OUTPUT, relativePath, "index.html");
  return path.join(OUTPUT, relativePath);
}

function collectHtml(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectHtml(entryPath);
    return entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

test("builds every legacy WordPress permalink, English counterpart, and bilingual archive page", () => {
  assert.ok(fs.existsSync(OUTPUT), `Missing site output: ${OUTPUT}`);
  assert.equal(posts.length, 194);

  posts.forEach((post) => {
    assert.ok(fs.existsSync(outputPath(post.permalink)), `Missing post route: ${post.permalink}`);
    assert.ok(fs.existsSync(outputPath(`/en${post.permalink}`)), `Missing English post route: /en${post.permalink}`);
  });

  for (const [lang, root] of [["sl", "blog"], ["en", "en/blog"]]) {
    const languagePosts = blogPostsByLanguage[lang];
    const archivePages = Math.ceil(languagePosts.length / 11);
    const archiveDirectory = path.join(OUTPUT, ...root.split("/"));
    assert.equal(languagePosts.length, 195);
    assert.equal(archivePages, 18);
    assert.ok(fs.existsSync(path.join(archiveDirectory, "index.html")));
    for (let page = 2; page <= archivePages; page += 1) {
      assert.ok(fs.existsSync(path.join(archiveDirectory, "page", String(page), "index.html")), `Missing ${lang} blog page ${page}`);
    }

    const firstArchiveHtml = fs.readFileSync(path.join(archiveDirectory, "index.html"), "utf8");
    const archiveHtml = [
      firstArchiveHtml,
      ...Array.from({ length: archivePages - 1 }, (_, index) => (
        fs.readFileSync(path.join(archiveDirectory, "page", String(index + 2), "index.html"), "utf8")
      ))
    ].join("\n");
    const archiveLinks = [...archiveHtml.matchAll(/<article class="blog-card[^"]*">[\s\S]*?<a href="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(archiveLinks.length, languagePosts.length);
    assert.deepEqual(new Set(archiveLinks), new Set(languagePosts.map((post) => post.permalink)));
    assert.equal((firstArchiveHtml.match(/<article class="blog-card/g) || []).length, 11);
    assert.match(firstArchiveHtml, new RegExp(`href="${lang === "en" ? "\\/en" : ""}\\/2026\\/08\\/crescent-sun-vremscica\\.html"`));
    assert.match(firstArchiveHtml, /src="\/assets\/blog\/2026\/08\/20260812-IMG_1030\.jpg"/);

    const lastArchiveHtml = fs.readFileSync(path.join(archiveDirectory, "page", String(archivePages), "index.html"), "utf8");
    assert.equal((lastArchiveHtml.match(/<article class="blog-card/g) || []).length, 8);
  }
});

test("keeps homepage journal links and the National Geographic route canonical", () => {
  const homepage = fs.readFileSync(path.join(OUTPUT, "index.html"), "utf8");
  const expectedHomepagePosts = [
    "/en/2026/08/crescent-sun-vremscica.html",
    "/en/2025/02/ledena-jama-v-paradani.html",
    "/en/2024/05/severni-sij-aurora-borealis-v-sloveniji-maj-2024.html"
  ];

  expectedHomepagePosts.forEach((permalink) => assert.match(homepage, new RegExp(`href="${permalink.replaceAll("/", "\\/")}"`)));
  assert.match(homepage, /id="journal-title"><a href="\/en\/blog\/">Blog posts<\/a>/);
  assert.doesNotMatch(homepage, /href="\/2023\/12\/letenje-nad-trzaskim-zalivom\.html"/);
  assert.doesNotMatch(homepage, /Nikon Z6II|Nikon Z 6_2|href="\/work\/[^"]*#/i);
  assert.match(homepage, /<cite><a href="\/press\/ce-se-hoces-umakniti-gres-gor-ali-pa-dol\/">Žan Kafol, neDelo, 2023<\/a><\/cite>/);
  assert.doesNotMatch(homepage, /<cite><a href="\/assets\/images\/press-nedelo\.jpg"/);

  const natGeoPath = path.join(OUTPUT, "2023", "10", "druga-zmaga-na-national-geographic.html");
  const natGeo = fs.readFileSync(natGeoPath, "utf8");
  assert.match(natGeo, /<html lang="sl">/);
  assert.match(natGeo, /Druga zmaga na National Geographic/);
  assert.match(natGeo, /\/assets\/blog\//);
});

test("builds local landing pages for every featured and press card", () => {
  assert.equal(site.press.filter((item) => /^https?:/.test(item.url)).length, 0);
  assert.equal(site.features.filter((item) => /^https?:/.test(item.url)).length, 0);
  assert.equal(site.press.filter((item) => !item.description).length, 0);

  const archivePath = outputPath("/press/");
  assert.ok(fs.existsSync(archivePath), "Missing complete press archive");
  const archiveHtml = fs.readFileSync(archivePath, "utf8");
  assert.equal((archiveHtml.match(/<article class="press-archive-card">/g) || []).length, site.press.length);
  assert.match(archiveHtml, /href="\/press\/na-soncni-strani\/"/);
  assert.match(archiveHtml, /focused entirely on paragliding/);
  assert.doesNotMatch(archiveHtml, /Na sončni strani about photography|Na sončni strani about[^<]*karst/i);

  [...pressFeatures, ...featurePages].forEach((item) => {
    assert.ok(fs.existsSync(outputPath(item.permalink)), `Missing landing page: ${item.permalink}`);
  });

  const videoPage = fs.readFileSync(outputPath("/press/fotografija-postojne-iz-zraka-in-pod-zemljo/"), "utf8");
  assert.match(videoPage, /youtube-nocookie\.com\/embed\/TYeM4MJ5kCQ/);

  const nikonPage = fs.readFileSync(outputPath("/featured/i-am-nikon-jaz-sem-raketa/"), "utf8");
  assert.match(nikonPage, /Second place, 2010/);
  assert.match(nikonPage, /feature-i-am-nikon-jaz-sem-raketa\.jpg/);
  assert.match(nikonPage, /feature-i-am-nikon-series-6816\.jpg/);

  const mayorPage = fs.readFileSync(outputPath("/featured/mayors-award-postojna-2024/"), "utf8");
  assert.match(mayorPage, /Mayor Igor Marentič/);
});

test("builds the complete Slovenian non-blog route tree with reciprocal language links", () => {
  const slHomepagePath = outputPath("/sl/");
  assert.ok(fs.existsSync(slHomepagePath), "Missing Slovenian homepage");

  [...galleryPages, ...pressPages, ...featuredPageVariants].forEach((page) => {
    assert.ok(fs.existsSync(outputPath(page.permalink)), `Missing localized page: ${page.permalink}`);
    const html = fs.readFileSync(outputPath(page.permalink), "utf8");
    assert.match(html, new RegExp(`href="${page.alternateUrl.replaceAll("/", "\\/")}"`));
  });

  const homepage = fs.readFileSync(slHomepagePath, "utf8");
  assert.match(homepage, /<html lang="sl">/);
  assert.match(homepage, /Zračna in jamska<br>fotografija/);
  assert.match(homepage, /href="\/" hreflang="en"/);
  assert.match(homepage, /href="\/sl\/work\/award-winning\/"/);
  assert.match(homepage, /href="\/2025\/02\/ledena-jama-v-paradani\.html"/);

  const awardPage = fs.readFileSync(outputPath("/sl/work/award-winning/"), "utf8");
  assert.match(awardPage, /Razsvetljenje \(Vse Mlečne ceste vodijo v Rakov Škocjan\)/);
  assert.match(awardPage, /Presihajoče Cerkniško jezero je fenomen kraških pojavov/);
});

test("does not double-encode HTML entities in titles, metadata, or interface copy", () => {
  const htmlFiles = collectHtml(OUTPUT);
  const doubleEncoded = /&amp;(?:amp|#39|quot|lt|gt);/;

  htmlFiles.forEach((htmlFile) => {
    const html = fs.readFileSync(htmlFile, "utf8");
    assert.doesNotMatch(html, doubleEncoded, `Double-encoded HTML entity in ${htmlFile}`);
  });

  const mayorPage = fs.readFileSync(outputPath("/featured/mayors-award-postojna-2024/"), "utf8");
  assert.match(mayorPage, /<title>Mayor&#39;s Award, Postojna, 2024 — Municipality of Postojna<\/title>/);
  assert.match(mayorPage, /← Featured &amp; awarded/);
});

test("keeps built internal post links and localized assets resolvable", () => {
  const htmlFiles = collectHtml(OUTPUT);
  const legacyHost = /(?:blog\.kafol\.net|\/wp-content\/uploads\/)/i;

  htmlFiles.forEach((htmlFile) => {
    const html = fs.readFileSync(htmlFile, "utf8");
    assert.doesNotMatch(html, legacyHost, `Legacy WordPress URL remains in ${htmlFile}`);
    for (const match of html.matchAll(/href="((?:\/en)?\/\d{4}\/\d{2}\/[^"#?]+\.html)(?:[#?][^"]*)?"/g)) {
      assert.ok(fs.existsSync(outputPath(match[1])), `Broken internal post link ${match[1]} in ${htmlFile}`);
    }

    for (const match of html.matchAll(/(?:href|src)="(\/assets\/[^"#?]+)(?:\?[^"#]*)?"/g)) {
      const assetPath = path.join(OUTPUT, decodeURI(match[1]).replace(/^\/+/, ""));
      assert.ok(fs.existsSync(assetPath), `Missing localized asset ${match[1]} in ${htmlFile}`);
    }
  });
});

test("renders migrated video blocks and avoids duplicate article leads", () => {
  const youtubePost = fs.readFileSync(outputPath("/2024/01/markov-spodmol.html"), "utf8");
  const tiktokPost = fs.readFileSync(outputPath("/2024/10/komet-tsuchinshan-atlas-c-2023-a3.html"), "utf8");
  const duplicateLeadPost = fs.readFileSync(outputPath("/2021/08/najdena-lippertova-jama.html"), "utf8");
  const standaloneLeadPost = fs.readFileSync(outputPath("/2025/10/koledar-2026.html"), "utf8");

  assert.match(youtubePost, /youtube-nocookie\.com\/embed\/jSSJV66OBHs/);
  assert.match(tiktokPost, /tiktok\.com\/player\/v1\/7428462808490134817/);
  assert.doesNotMatch(duplicateLeadPost, /<figure class="article-lead shell">/);
  assert.match(standaloneLeadPost, /<figure class="article-lead shell">/);
});

test("emits complete bilingual metadata, structured data, feeds, and crawl files", () => {
  const htmlFiles = collectHtml(OUTPUT).filter((htmlFile) => htmlFile !== path.join(OUTPUT, "feed", "index.html"));
  const htmlByCanonical = new Map();

  htmlFiles.forEach((htmlFile) => {
    const html = fs.readFileSync(htmlFile, "utf8");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1];
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)">/)?.[1];
    const ogAlt = html.match(/<meta property="og:image:alt" content="([^"]*)">/)?.[1];
    assert.match(canonical || "", /^https:\/\/foto\.kafol\.net\//, `Missing absolute canonical in ${htmlFile}`);
    assert.ok(description?.trim(), `Missing description in ${htmlFile}`);
    assert.match(ogImage || "", /^https:\/\/foto\.kafol\.net\/assets\//, `Missing absolute OG image in ${htmlFile}`);
    assert.ok(ogAlt?.trim(), `Missing OG image alt in ${htmlFile}`);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
    assert.doesNotMatch(html, /&amp;(?:amp|#39|quot|lt|gt);/, `Double-encoded metadata in ${htmlFile}`);
    htmlByCanonical.set(canonical, html);

    const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.equal(jsonLdBlocks.length, 1, `Expected one JSON-LD block in ${htmlFile}`);
    assert.doesNotThrow(() => JSON.parse(jsonLdBlocks[0][1]), `Invalid JSON-LD in ${htmlFile}`);
  });

  for (const variant of blogPostsByLanguage.all) {
    const canonical = `https://foto.kafol.net${variant.permalink}`;
    const alternate = `https://foto.kafol.net${variant.alternateUrl}`;
    const html = htmlByCanonical.get(canonical);
    assert.ok(html, `Missing canonical variant ${canonical}`);
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="${variant.lang}" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`));
    assert.match(html, new RegExp(`href="${alternate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}">`));
  }

  assert.ok(fs.existsSync(path.join(OUTPUT, "sitemap.xml")));
  assert.ok(fs.existsSync(path.join(OUTPUT, "robots.txt")));
  assert.ok(fs.existsSync(path.join(OUTPUT, "blog", "feed.xml")));
  assert.ok(fs.existsSync(path.join(OUTPUT, "en", "blog", "feed.xml")));
  assert.ok(fs.existsSync(path.join(OUTPUT, "feed", "index.html")));
  const wordpressFeed = fs.readFileSync(path.join(OUTPUT, "feed", "index.html"), "utf8");
  assert.match(wordpressFeed, /<rss version="2\.0"/);
  assert.match(wordpressFeed, /<atom:link href="https:\/\/foto\.kafol\.net\/feed\/" rel="self" type="application\/rss\+xml"/);
  assert.match(wordpressFeed, /<link>https:\/\/foto\.kafol\.net\/2026\/08\/crescent-sun-vremscica\.html<\/link>/);
  const sitemap = fs.readFileSync(path.join(OUTPUT, "sitemap.xml"), "utf8");
  assert.match(sitemap, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
  assert.match(sitemap, /<loc>https:\/\/foto\.kafol\.net\/2025\/10\/koledar-2026\.html<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/foto\.kafol\.net\/en\/2025\/10\/koledar-2026\.html<\/loc>/);
  assert.match(sitemap, /<image:loc>https:\/\/foto\.kafol\.net\/assets\/blog\//);
});

test("gives every article photograph localized descriptive alt text", () => {
  for (const post of blogPostsByLanguage.all) {
    const html = fs.readFileSync(outputPath(post.permalink), "utf8");
    const article = html.match(/<main id="main" class="article-main">([\s\S]*?)<\/main>/)?.[1] || "";
    const images = [...article.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
    assert.ok(images.length > 0, `No article image in ${post.permalink}`);
    images.forEach((tag) => {
      assert.match(tag, /\balt="[^"]*\p{L}[^"]*"/u, `Missing descriptive alt in ${post.permalink}: ${tag}`);
    });
  }
});

test("leaves empty alt text only on explicitly decorative or hidden images", () => {
  const socialIcon = /^\/assets\/images\/logo-(?:instagram|facebook|tiktok|youtube)\.svg$/;

  for (const htmlFile of collectHtml(OUTPUT)) {
    const html = fs.readFileSync(htmlFile, "utf8");
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = match[0];
      const src = tag.match(/\bsrc="([^"]*)"/)?.[1] ?? "";
      const alt = tag.match(/\balt="([^"]*)"/)?.[1];
      assert.notEqual(alt, undefined, `Missing alt attribute in ${htmlFile}: ${tag}`);

      if (alt) continue;
      if (socialIcon.test(src)) {
        const before = html.slice(Math.max(0, match.index - 180), match.index);
        assert.match(before, /<a\b[^>]*aria-label="[^"]+"[^>]*>\s*$/, `Decorative social icon lacks a labelled link in ${htmlFile}`);
      } else if (!src) {
        assert.match(tag, /\bdata-lightbox-image\b/, `Unexpected empty image source in ${htmlFile}: ${tag}`);
      } else {
        const hero = html.match(/<div class="blog-hero__media" aria-hidden="true">\s*(<img\b[^>]*>)/)?.[1];
        assert.equal(tag, hero, `Unexpected empty alt text in ${htmlFile}: ${tag}`);
      }
    }
  }
});
