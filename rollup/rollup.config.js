import babel from '@rollup/plugin-babel';

export const bundleGlobal = 'InfiniteScroll';
export const bundleName = 'infinite-scroll';

const config = {
	input: 'src/infinite-scroll.js',
	plugins: [
		babel({
			babelHelpers: 'bundled'
		})
	],
};

export default config;