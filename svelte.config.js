import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { mdsvex } from 'mdsvex';

import mdsvexConfig from './mdsvex.config.js';

const dev = process.env.NODE_ENV === 'development' ? true : false;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
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
				}),
				mdsvex(mdsvexConfig)
		  ]
		: [
				preprocess({
					postcss: true,
					preserve: ['ld+json']
				}),
				mdsvex(mdsvexConfig)
		  ]
};

export default config;
