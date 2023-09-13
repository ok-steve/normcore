const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'src/js/normcore.js',
  plugins: [terser()],
  output: {
    format: 'iife',
    file: 'dist/js/normcore.js',
    sourcemap: true,
  },
};
