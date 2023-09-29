import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import pkg from './package.json';

const config = ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const sentryConfig = {
		sourceMapsUploadOptions: {
			url: 'https://sentry.io',
			authToken: process.env.SENTRY_SRC_MAP_UPLOAD,
			org: 'that-conference',
			project: 'thatconference-com',
			release: pkg.version,
			setCommits: {
				auto: true,
				ignoreMissing: true
			},
			sourceMaps: {
				assets: ['./.svelte-kit/output'],
				ignore: ['node_modules'],
				validate: true
			},
			deploy: {
				env: 'production'
			},
			debug: false,
			dryRun: false,
			cleanArtifacts: true
		}
	};

	return defineConfig({
		plugins: [sentrySvelteKit(sentryConfig), sveltekit()],
		build: {
			sourcemap: true
		},
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	});
};

export default config;

// Sentry vite plugin reference:
// https://github.com/getsentry/sentry-javascript-bundler-plugins/tree/259018857f1fd58b29a8fa92fa573953a9c30fca/packages/vite-plugin
