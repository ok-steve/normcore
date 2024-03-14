module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": { root: ctx.file.dirname },
    "postcss-minify": {},
    "postcss-preset-env": {
      minimumVendorImplementations: 2,
      preserve: true,
    },
  },
});
