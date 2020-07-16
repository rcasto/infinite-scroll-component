import commonConfig, { bundleGlobal, bundleName } from './rollup.config';
import { terser } from 'rollup-plugin-terser';

const config = {
    ...commonConfig,
	output: [
		{
			name: bundleGlobal,
			file: `dist/${bundleName}.min.js`,
			format: 'iife'
		},
		{
			file: `dist/${bundleName}.es.min.js`,
			format: 'es'
		},
		{
			file: `dist/${bundleName}.cjs.min.js`,
			format: 'cjs'
		}
	]
};
config.plugins.push(terser());

export default config;