<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from '../../../../_components/schedule/Hero.svelte';
	import List from '../../../../_components/schedule/List.svelte';

	let { event, sessions } = data;

	const metaTags = ((title = 'THAT Conference Online Speakers and Schedule.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'That Conference Online Speakers and Schedule',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/${event.slug}/schedule`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="relative">
	<section>
		<Hero {event} days={['Tuesday', 'Wednesday', 'Thursday']} isOnline={true} />
	</section>

	<section>
		<List event={sessions} />
	</section>
</div>
