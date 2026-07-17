const { renderWordPressEmbeds } = require("./scripts/lib/wordpress-content");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addShortcode("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("contains", (value, fragment) => String(value ?? "").includes(String(fragment ?? "")));
  eleventyConfig.addFilter("renderWordPressEmbeds", renderWordPressEmbeds);

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
