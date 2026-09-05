"use strict";

const descriptions = Object.assign(
  {},
  require("./blogImageDescriptions"),
  require("./image-descriptions/gallery.json"),
  require("./image-descriptions/site.json"),
  require("./image-descriptions/authored-crescent-sun.json"),
  require("./image-descriptions/authored-planinska-jama.json"),
  require("./image-descriptions/authored-postojna-microplastics.json")
);

for (const [src, description] of Object.entries(descriptions)) {
  if (src.includes("/assets/images/featured/full/")) {
    descriptions[src.replace("/featured/full/", "/featured/thumb/")] = description;
  }
  if (/\/postojna-microplastics\/20260904-IMG_\d+\.jpg$/.test(src)) {
    for (const size of [720, 1200]) descriptions[src.replace(/\.jpg$/, `-${size}.jpg`)] = description;
  }
}

module.exports = descriptions;
