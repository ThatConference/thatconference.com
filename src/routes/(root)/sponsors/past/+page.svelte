<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';

	import Seo from '$components/Seo.svelte';
	import PastPartnerCard from '$components/partners/PastPartnerCard.svelte';

	import Hero from '../_components/_PastPartnersHero.svelte';

	let { partners } = data;

	const metaTags = ((
		title = `Visit all of our past sponsors who've helped make THAT Conference possible.`
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Thank you to those who support our great community every day.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/sponsors/past`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<main class="overflow-hidden">
	<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
		<div class="mx-auto mt-32 max-w-screen-xl px-4 sm:px-6 xl:mt-40">
			<Hero />
			<div class="mt-12 py-12">
				<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{#each partners as p, _i (p.id)}
						<li class="col-span-1 flex transform flex-col rounded-lg bg-white text-center shadow">
							<PastPartnerCard {...p} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</main>
