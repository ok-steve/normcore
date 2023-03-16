import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/normcore.js',
  plugins: [terser()],
  output: {
    format: 'iife',
    file: 'dist/js/normcore.js',
    sourcemap: true,
  },
};
