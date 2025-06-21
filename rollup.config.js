import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const external = ['react', 'react-dom', 'iconoir-react', 'prop-types'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'iconoir-react': 'IconoirReact',
  'prop-types': 'PropTypes'
};

const isAnalyze = process.env.ANALYZE === 'true';

export default [
  // ES Module build
  {
    input: 'src/index.js',
    external,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', { modules: false }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }),
      terser(),
      isAnalyze && visualizer({
        filename: 'dist/bundle-analysis.html',
        open: true
      })
    ].filter(Boolean)
  },
  // CommonJS build
  {
    input: 'src/index.js',
    external,
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      globals
    },
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', { modules: false }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }),
      terser()
    ]
  }
];