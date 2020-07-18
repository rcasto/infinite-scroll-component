import commonConfig, { bundleGlobal, bundleName } from './rollup.config';

const config = {
    ...commonConfig,
    output: [
		{
			name: bundleGlobal,
			file: `dist/${bundleName}.js`,
			format: 'iife'
		},
		{
			name: bundleGlobal,
			file: `public/${bundleName}.js`,
			format: 'iife'
		},
		{
			file: `dist/${bundleName}.es.js`,
			format: 'es'
		},
		{
			file: `dist/${bundleName}.cjs.js`,
			format: 'cjs'
		}
	]
};

export default config;