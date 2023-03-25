<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';

	import Seo from '$components/Seo.svelte';
	import PartnerCard from '$components/partners/PartnerCard.svelte';

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
		<div class="mx-auto mt-12 max-w-screen-xl px-4 sm:px-6 ">
			<header>
				<h2
					class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl">
					Past Sponsors
				</h2>
			</header>

			<div class="mt-12 py-12">
				<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{#each partners as p, i (p.id)}
						<li class="col-span-1 flex  flex-col rounded-lg bg-white text-center shadow ">
							<PartnerCard {...p} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</main>
