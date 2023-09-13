import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

const dev = process.env.NODE_ENV === 'development' ? true : false;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	kit: {
		serviceWorker: {
			register: false
		},
		adapter: adapter(),
		alias: {
			$components: resolve('./src/_components'),
			$elements: resolve('./src/_elements'),
			$dataSources: resolve('./src/_dataSources')
		},
		version: {
			name: process.env?.npm_package_version || '0.0.0'
		}
	},
	preprocess: !dev
		? [
				preprocess({
					sourceMap: true,
					postcss: true,
					preserve: ['ld+json']
				})
		  ]
		: [
				preprocess({
					preserve: ['ld+json']
				})
		  ]
};

export default config;
