<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from '../../../../_components/schedule/Hero.svelte';
	import List from '../../../../_components/schedule/List.svelte';

	let { event, sessions } = data;
	const metaTags = ((title = 'THAT Conference Speakers and Schedule.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'That Conference Speakers and Schedule',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/events/${event.slug}/schedule`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<section class="mt-40">
		<Hero {event} />
	</section>

	<section>
		<List event={sessions} />
	</section>
</div>
