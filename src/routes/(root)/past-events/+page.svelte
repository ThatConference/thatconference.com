<script>
	export let data;

	import { fade } from 'svelte/transition';

	import Seo from '$components/Seo.svelte';
	import seoMetaTags from '$utils/seo/metaTags';

	import EventCard from './_components/EventCard.svelte';

	const metaTags = ((title = 'Upcoming and past events on THAT and THAT Conference.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Upcoming and Past Events at THAT',
			ogImages: {
				twitter: 'events-Twitter.jpg',
				facebook: 'events-Facebook.jpg',
				linkedIn: 'events-LinkedIn.jpg'
			},
			openGraph: {
				type: 'website',
				url: 'https://thatconference.com'
			}
		})
	}))();

	let { events = [] } = data;
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="relative pb-16 md:pb-20 lg:pb-24 xl:pb-32">
	<div class="mx-auto mt-12 max-w-screen-xl px-4 sm:px-6 ">
		<h1
			class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl sm:leading-none md:text-6xl">
			Past Events
		</h1>

		<div class="mx-auto mt-12 grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3">
			{#each events[1] as e (e.id)}
				<div in:fade class="transform transition duration-500 ease-in-out hover:scale-105">
					<a href={`/${e.slug}`}>
						<EventCard event={e} />
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
