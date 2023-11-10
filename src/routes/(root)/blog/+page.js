import { storyblok } from '$lib/config.public.js';

export async function load({ parent }) {
	const { storyblokApi } = await parent();

	const { data } = await storyblokApi.get('cdn/stories', {
		version: storyblok.version,
		starts_with: 'blog'
	});

	return {
		stories: data
	};
}
