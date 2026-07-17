"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { parseTables } = require("../scripts/lib/mysql-dump");
const {
  getMediaPaths,
  makeExcerpt,
  rewriteWordPressUrls
} = require("../scripts/lib/wordpress-content");

test("MySQL parser preserves complex WordPress HTML and escaped values", () => {
  const fixture = [
    "INSERT INTO `kafol_posts` (`ID`, `post_content`, `post_title`, `nullable`) VALUES",
    "(1, '<p>comma, semicolon; and parenthesis )</p>\\n<!-- wp:html -->', 'Žan\\'s post', NULL),",
    "(2, '<a data-json=\\\"{\\\"key\\\":\\\"value\\\"}\\\">link</a>', 'Second', 12);",
    ""
  ].join("\n");
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "wordpress-import-"));
  const dump = path.join(directory, "fixture.sql");
  fs.writeFileSync(dump, fixture);

  const rows = parseTables(dump, ["kafol_posts"]).kafol_posts;

  assert.equal(rows.length, 2);
  assert.equal(rows[0].post_title, "Žan's post");
  assert.match(rows[0].post_content, /semicolon; and parenthesis \)/);
  assert.equal(rows[0].nullable, null);
  assert.equal(rows[1].nullable, 12);
  assert.match(rows[1].post_content, /data-json="\{"key":"value"\}"/);
});

test("URL rewriting localizes current, legacy, and Photon WordPress media", () => {
  const content = [
    '<a href="https://blog.kafol.net/2023/10/story.html">Story</a>',
    '<a href="http://kafol.net/blog/2018/04/older.html">Older</a>',
    '<a href="https://blog.kafol.net/2019/10/tandemski-polet-z-jadralnim-padalom-iz-javornikov-in-planinske-gore.html">Corrected legacy link</a>',
    '<img src="https://i2.wp.com/blog.kafol.net/wp-content/uploads/2023/10/photo.jpg?ssl=1&amp;w=1024">',
    '<img src="https://blog.kafol.net/wp-content/uploads/2020/01/a%20b.jpg">',
    '<img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Animation_of_C%EF%BC%8F2023_A3_around_Sun.gif">'
  ].join("");

  const rewritten = rewriteWordPressUrls(content);

  assert.match(rewritten, /href="\/2023\/10\/story\.html"/);
  assert.match(rewritten, /href="\/2018\/04\/older\.html"/);
  assert.match(rewritten, /href="\/2019\/12\/tandemski-polet-z-jadralnim-padalom-iz-javornikov-in-planinske-gore\.html"/);
  assert.match(rewritten, /src="\/assets\/blog\/2023\/10\/photo\.jpg"/);
  assert.match(rewritten, /src="\/assets\/blog\/2020\/01\/a%20b\.jpg"/);
  assert.match(rewritten, /src="\/assets\/blog\/external\/animation-of-c-2023-a3-around-sun\.gif"/);
  assert.deepEqual(getMediaPaths(rewritten).sort(), [
    "2020/01/a b.jpg",
    "2023/10/photo.jpg",
    "external/animation-of-c-2023-a3-around-sun.gif"
  ]);
});

test("excerpt generation strips block markup without losing text entities", () => {
  const excerpt = makeExcerpt("", "<!-- wp:paragraph --><p>Žan &amp; Ana visit the karst.</p><!-- /wp:paragraph -->");
  assert.equal(excerpt, "Žan & Ana visit the karst.");
});
