const test = require("node:test");
const assert = require("node:assert/strict");
const manifest = require("../scripts/featured-manifest.json");

const awardFiles = [
  "20210228-DJI_0270-Pano.jpg",
  "20210810-IMG_1621.jpg"
];

test("assigns every featured photograph to exactly one collection", () => {
  const assignments = new Map();
  const assign = (file, category) => {
    const categories = assignments.get(file) || [];
    categories.push(category);
    assignments.set(file, categories);
  };

  awardFiles.forEach((file) => assign(file, "award-winning"));
  manifest.categories.forEach((category) => {
    category.files.forEach((file) => assign(file, category.id));
  });

  const sourceFiles = manifest.images.map((image) => image.file).sort();
  assert.deepEqual([...assignments.keys()].sort(), sourceFiles);
  assignments.forEach((categories, file) => {
    assert.equal(categories.length, 1, `${file} appears in ${categories.join(", ")}`);
  });
});

test("keeps collection counts and selected-work labels synchronized", () => {
  const categories = new Map(manifest.categories.map((category) => [category.id, category]));

  manifest.selectedWorkTiles.forEach((tile) => {
    if (tile.id.startsWith("natgeo-")) return;
    const category = categories.get(tile.id);
    assert.ok(category, `Missing category for ${tile.id}`);
    assert.equal(tile.kicker, `${category.files.length} photographs`);
  });
});
