module.exports = function (eleventyConfig) {
  // README.md is the only file that will be built. Set global data to force it
  // to be displayed as the index page.
  eleventyConfig.addGlobalData("permalink", "index.html");
  eleventyConfig.addGlobalData("layout", "layout.njk");

  // Add assets in development.
  if (process.env.ELEVENTY_RUN_MODE === "serve") {
    eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
    eleventyConfig.addPassthroughCopy({ "src/css": "css" });
    eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  }

  return {
    dir: {
      output: "dist",
    },
  };
};
