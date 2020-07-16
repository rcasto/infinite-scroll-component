import babel from '@rollup/plugin-babel';

const config = {
	input: 'src/infinite-scroll.js',
	plugins: [
		babel({
			babelHelpers: 'bundled'
		})
	],
};

export default config;