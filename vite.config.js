import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import pkg from './package.json';

const config = ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const sentryConfig = {
		sourceMapsUploadOptions: {
			org: 'that-conference',
			project: 'thatconference-com',
			release: pkg.version,
			authToken: process.env.SENTRY_SRC_MAP_UPLOAD,
			url: 'https://sentry.io',
			cleanArtifacts: true,
			rewrite: false,
			// vite overrides NODE_ENV to production when running 'vite build'
			uploadSourceMaps: process.env.PUBLIC_VERCEL_ENV === 'production',
			deploy: {
				env: 'production'
			},
			setCommits: {
				auto: true,
				ignoreMissing: true
			},
			sourceMaps: {
				assets: ['./.svelte-kit/output'],
				ignore: ['node_modules']
			},
			debug: false,
			dryRun: false
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
// sentry's vite plugin based on v0.61 per support ticket
// https://www.npmjs.com/package/@sentry/vite-plugin/v/0.6.1
