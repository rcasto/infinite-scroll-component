import commonConfig from './rollup.config';
import { terser } from 'rollup-plugin-terser';

const config = {
    ...commonConfig,
    output: [
		{
			name: 'SocialContact',
			file: 'dist/socialcontact.min.js',
			format: 'iife'
		},
		{
			file: 'dist/socialcontact.es.min.js',
			format: 'es'
		},
		{
			file: 'dist/socialcontact.cjs.min.js',
			format: 'cjs'
		}
	]
};
config.plugins.push(terser());

export default config;