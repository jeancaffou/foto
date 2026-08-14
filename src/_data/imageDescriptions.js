"use strict";

const descriptions = Object.assign(
  {},
  require("./blogImageDescriptions"),
  require("./image-descriptions/gallery.json"),
  require("./image-descriptions/site.json"),
  require("./image-descriptions/authored-crescent-sun.json")
);

for (const [src, description] of Object.entries(descriptions)) {
  if (src.includes("/assets/images/featured/full/")) {
    descriptions[src.replace("/featured/full/", "/featured/thumb/")] = description;
  }
}

module.exports = descriptions;
