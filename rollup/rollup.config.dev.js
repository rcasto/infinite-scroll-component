import commonConfig from './rollup.config';

const config = {
    ...commonConfig,
    output: [
		{
			name: 'SocialContact',
			file: 'dist/socialcontact.js',
			format: 'iife'
		},
		{
			file: 'dist/socialcontact.es.js',
			format: 'es'
		},
		{
			file: 'dist/socialcontact.cjs.js',
			format: 'cjs'
		}
	]
};

export default config;