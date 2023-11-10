<script>
	export let data;
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ArticleCard from './components/ArticleCard.svelte';

	let articles = data.stories;

	const metaTags = ((title = `Blog - THAT Conference`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'News and announcements from THAT Conference.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/blog`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="relative overflow-x-hidden">
	<div class="mx-auto my-12 max-w-screen-xl px-4 sm:px-6">
		<header class="mt-24">
			<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500">that blog</h2>
			<h1
				class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
				The latest articles and announcements
			</h1>

			<p class="mt-6 text-2xl text-gray-500">
				Learn practical techniques on how to build your network, navigate in the tech community and
				have some fun growing your career along the way. Of course, stay up-to-date on all things
				THAT Conference.
			</p>
		</header>

		<div class="relative py-12">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300"></div>
			</div>
		</div>

		<main>
			<div class="grid divide-y divide-gray-200">
				{#each articles.stories as article}
					<ArticleCard article={article.content} slug={article.full_slug} />
				{/each}
			</div>
		</main>
	</div>
</div>
