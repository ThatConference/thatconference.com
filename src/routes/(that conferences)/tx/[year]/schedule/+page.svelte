<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from '../../../_components/schedule/Hero.svelte';
	import List from '../../../_components/schedule/List.svelte';

	let { event, sessions, filterForFamily } = data;

	const metaTags = ((title = 'THAT Conference Texas Speakers and Schedule.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'That Conference Texas Speakers and Schedule',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/tx/${event.slug}/schedule`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<section>
		<Hero {event} days={['Monday', 'Tuesday', 'Wednesday']} />
	</section>

	<section>
		<List event={sessions} {filterForFamily} />
	</section>
</div>
