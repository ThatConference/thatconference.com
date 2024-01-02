<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Level from '../../../../_components/sponsors/Level.svelte';
	import Hero from '../../../../_components/sponsors/Hero.svelte';

	let { event, levels } = data;
	let { id: eventId } = event ?? {};

	const metaTags = ((title = 'THAT Conference sponsors and partners.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Thank you to those who support our great community every day.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/tx/${event.slug}/sponsors/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<main>
	<Hero {event} isOnline={true} />
	<div class="relative">
		<div class="mx-auto max-w-2xl lg:max-w-7xl">
			{#if levels['RANGER']}
				<Level header="Ranger Sponsors" partners={levels['RANGER']} {eventId} />
			{/if}

			{#if levels['TRAILBLAZER']}
				<Level header="Trailblazer Sponsors" partners={levels['TRAILBLAZER']} {eventId} />
			{/if}
		</div>
	</div>
</main>
