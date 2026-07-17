const test = require("node:test");
const assert = require("node:assert/strict");
const manifest = require("../scripts/featured-manifest.json");
const galleries = require("../src/_data/galleries");

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

  manifest.images.forEach((image) => {
    assert.deepEqual(image.tags, assignments.get(image.file), `${image.file} has stale category tags`);
  });
});

test("excludes the removed 20170427 flight photograph", () => {
  assert.equal(manifest.images.some((image) => image.file === "20170427-_MG_7839.jpg"), false);
  assert.equal(manifest.categories.some((category) => category.files.includes("20170427-_MG_7839.jpg")), false);
});

test("uses editorial descriptors instead of collection counts in selected work", () => {
  const categories = new Map(manifest.categories.map((category) => [category.id, category]));

  manifest.selectedWorkTiles.forEach((tile) => {
    if (tile.id.startsWith("natgeo-")) return;
    const category = categories.get(tile.id);
    assert.ok(category, `Missing category for ${tile.id}`);
    assert.doesNotMatch(tile.kicker, /^\d+ photographs$/);
  });
});

test("uses the requested collection covers and lists newest photographs first", () => {
  const expectedCovers = {
    "below-ground": "20250212-IMG_7268-Enhanced-NR.jpg",
    "in-flight": "20211114-vlcsnap-2021-11-14-19h39m09s315-Edit-2.jpg",
    "after-dark": "20201029-DJI_0456.jpg",
    "water-and-ice": "20231105-DJI_0307-Pano.jpg",
    "land-and-life": "20211025-IMG_2309.jpg"
  };

  const selectedById = new Map(manifest.selectedWorkTiles.map((tile) => [tile.id, tile]));
  manifest.categories.forEach((category) => {
    if (expectedCovers[category.id]) {
      assert.equal(category.cover, expectedCovers[category.id]);
      assert.equal(selectedById.get(category.id).file, expectedCovers[category.id]);
    }
  });

  galleries.categories.forEach((category) => {
    const dates = category.images.map((image) => {
      const timestamp = image.captured || image.file.slice(0, 8);
      return timestamp.replace(/\D/g, "").padEnd(14, "0");
    });
    assert.deepEqual(dates, [...dates].sort().reverse(), `${category.id} is not newest first`);
  });
});
