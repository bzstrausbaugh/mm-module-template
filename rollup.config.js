//import banner from 'rollup-plugin-banner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-import-css';
import path from 'path';
import { fileURLToPath } from 'node:url';

const moduleNameSplit = path.dirname(fileURLToPath(import.meta.url)).split('/');
const moduleName = moduleNameSplit[moduleNameSplit.length - 1];
console.log('ModuleName', moduleName);
export default [
  {
    input: './src/index.ts',
    plugins: [
      typescript(),
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.MODULE_NAME': moduleName,
        preventAssignment: true,
      }),
      css({ output: `${moduleName}.css` }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx'],
      }),
      commonjs(),
    ],
    output: {
      file: `./dist/${moduleName}.js`,
      format: 'iife',
    },
  },
  {
    input: './src/node_helper.ts',
    plugins: [typescript()],
    output: {
      file: './dist/node_helper.js',
      format: 'umd',
    },
  },
];
