import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'

export default {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    }
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      target: 'es5',
    }),
    json(),
    commonjs({
      include: 'node_modules/**'
    }),
  ]
}