<script>
	export let data;

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import { Hero } from '../_root/components';
	import ThatActiveEvents from '$components/events/thatconference/Upcoming.svelte';

	let { thatActiveEvents } = data;
	const metaTags = ((title = 'THAT Conference Texas and Wisconsin') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Join us at THAT Conference Wisconsin or THAT Conference Texas or BOTH!',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/that-conference/`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<Hero />
	<ThatActiveEvents events={thatActiveEvents} />
</div>
