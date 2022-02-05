import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/js/normcore.js',
  plugins: [terser()],
  output: {
    file: 'dist/js/normcore.js',
    sourcemap: true,
  },
};
