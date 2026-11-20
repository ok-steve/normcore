import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Add assets in development.
  if (process.env.ELEVENTY_RUN_MODE === "serve") {
    eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
    eleventyConfig.addPassthroughCopy({ "./src": "." });
  }

  return {
    dir: {
      input: "docs",
      output: "dist",
      layouts: "_layouts",
    },
  };
}
