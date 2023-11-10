import { storyblok } from '$lib/config.public.js';

export async function load({ params, parent }) {
	const { storyblokApi } = await parent();

	let slug = params.article;
	let path = `cdn/stories/blog/${slug}`;

	const dataStory = await storyblokApi.get(path, {
		version: storyblok.version
	});

	return {
		story: dataStory.data.story
	};
}
