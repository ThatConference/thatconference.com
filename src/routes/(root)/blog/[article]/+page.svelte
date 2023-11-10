<script>
	export let data;

	import dayjs from 'dayjs';
	import { renderRichText } from '@storyblok/svelte';
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	let { story } = data;

	const metaTags = ((title = `${story.content.title} - THAT Conference`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${story.content.subtitle}`,
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/blog/${story.full_slug}`
			}
		})
	}))();

	$: resolvedRichText = renderRichText(story.content.content);
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="relative my-24 sm:my-32 lg:my-40">
	<div class="mx-auto flex max-w-5xl flex-col">
		<header class=" flex flex-col text-center">
			<time dateTime={story.first_published_at} class="text-sm text-neutral-950">
				{dayjs(story.first_published_at).format('MMMM D, YYYY')}
			</time>
			<h1
				class="font-display mt-6 text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
				{story.content.title}
			</h1>
			<!-- 
			<p className="mt-6 text-sm font-semibold text-neutral-950">
				by {article.author.name}, {article.author.role}
			</p> 
			-->
		</header>

		<div class="mt-24 sm:mt-32 lg:mt-40">
			<!-- eslint-disable-next-line  svelte/no-at-html-tags -->
			<div class="prose prose-xl mx-auto">{@html resolvedRichText}</div>
		</div>
	</div>
</div>
