module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": { root: ctx.file.dirname },
    "postcss-preset-env": {
      minimumVendorImplementations: 2,
      preserve: true,
    },
    "postcss-minify": {},
  },
});
