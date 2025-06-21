import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const external = ['react', 'react-dom', 'iconoir-react', 'prop-types'];
const globals = { react: 'React', 'react-dom': 'ReactDOM', 'iconoir-react': 'IconoirReact', 'prop-types': 'PropTypes' };
const isAnalyze = process.env.ANALYZE === 'true';

const basePlugins = [
  resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react', { runtime: 'automatic' }]]
  }),
  terser()
];

export default [
  {
    input: 'src/index.js',
    external,
    output: { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
    plugins: [...basePlugins, isAnalyze && visualizer({ filename: 'dist/bundle-analysis.html', open: true })].filter(Boolean)
  },
  {
    input: 'src/index.js',
    external,
    output: { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, globals },
    plugins: basePlugins
  }
];