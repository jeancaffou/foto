const manifest = require("../../scripts/featured-manifest.json");

const descriptions = {
  "award-winning": "The two National Geographic Slovenia overall winners: Cerkniško polje in 2022 and Enlightened (All Roads Lead to Rakov Škocjan) in 2023.",
  "from-above": "Karst poljes, forests, towns and water seen from the air.",
  "below-ground": "Caves, underground rivers and light shaped with a team.",
  "in-flight": "Paragliding, long views and movement above the landscape.",
  "after-dark": "The Milky Way, storms, aurora and landscapes after sunset.",
  "water-and-ice": "Flooded poljes, rivers, snow and ice across the karst.",
  "land-and-life": "Landscapes, trees, wildlife and life outdoors."
};

const imageByFile = new Map(manifest.images.map((image) => [image.file, image]));

function stem(file) {
  return file.replace(/\.jpe?g$/i, "");
}

function imageData(file, category) {
  const source = imageByFile.get(file);
  if (!source) throw new Error(`Unknown gallery image: ${file}`);
  const id = stem(file);
  const year = source.captured ? source.captured.slice(0, 4) : "";

  return {
    ...source,
    id,
    year,
    full: `/assets/images/featured/full/${id}.webp`,
    thumb: `/assets/images/featured/thumb/${id}.webp`,
    alt: `${category} photograph by Žan Kafol${year ? `, ${year}` : ""}`
  };
}

const awardFiles = [
  "20210228-DJI_0270-Pano.jpg",
  "20210810-IMG_1621.jpg"
];

const categories = [
  {
    id: "award-winning",
    label: "Award-winning",
    cover: awardFiles[0],
    files: awardFiles
  },
  ...manifest.categories
].map((category) => ({
  id: category.id,
  label: category.label,
  description: descriptions[category.id],
  cover: imageData(category.cover, category.label).full,
  images: category.files.map((file) => imageData(file, category.label))
}));

const selected = manifest.selectedWorkTiles.map((tile) => {
  const galleryId = tile.id.startsWith("natgeo-") ? "award-winning" : tile.id;
  return {
    title: tile.label,
    type: tile.kicker,
    image: imageData(tile.file, tile.label).thumb,
    position: "center",
    url: `/work/${galleryId}/#${stem(tile.file)}`
  };
});

module.exports = { categories, selected };
