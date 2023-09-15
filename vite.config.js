import { defineConfig, loadEnv } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import pkg from './package.json';

const config = ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const sentryConfig = {
		url: 'https://sentry.io',
		authToken: process.env.SENTRY_SRC_MAP_UPLOAD,
		org: 'that-conference',
		project: 'thatconference-com',
		release: pkg.version,
		deploy: {
			env: 'production'
		},
		setCommits: {
			auto: true,
			ignoreMissing: true
		},
		sourceMaps: {
			include: ['./.svelte-kit/output'],
			ignore: ['node_modules'],
			validate: true
		},
		debug: false,
		dryRun: false,
		cleanArtifacts: true
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
