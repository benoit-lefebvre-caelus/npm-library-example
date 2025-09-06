import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
/*import postcss from 'rollup-plugin-postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';*/
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'auto',
      banner: '"use client";'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      banner: '"use client";'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'] // enables JSX transform
    }),
    /**postcss({
      plugins: [tailwindcss(), autoprefixer()],
      extract: true, // generates dist/index.css
      minimize: true, // optional: minify the CSS
      sourceMap: true
    }),*/
    copy({
      targets: [
        { src: 'wiki/**/*', dest: 'dist/wiki' }
      ],
      flatten: false 
    })
  ],
  external: ['react', 'react-dom', 'prop-types']
};
