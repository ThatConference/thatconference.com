import { storyblok } from '$lib/config.public.js';

import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

export async function load() {
	storyblokInit({
		accessToken: storyblok.accessToken,
		use: [apiPlugin],
		apiOptions: {
			region: 'us'
		}
	});

	let storyblokApi = await useStoryblokApi();

	return {
		storyblokApi: storyblokApi
	};
}
