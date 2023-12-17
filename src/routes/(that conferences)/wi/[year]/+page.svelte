<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import CallForSpeakers from '$components/cta/_CallForSpeakers.svelte';
	import NewsletterWide from '$components/newsletter/Wide.svelte';
	import UpNextEvent from '$components/activities/UpNextEvent.svelte';

	//layout level
	import Speakers from '../../_components/speakers/Speakers.svelte';
	import Attendees from '../../_components/Attendees.svelte';
	import Partners from '../../_components/Partners.svelte';
	import FAQ from '../../_components/FAQ.svelte';
	import Dates from '../../_components/Dates.svelte';
	import Keynoters from '../../_components/Keynoters.svelte';

	import Hero from './_components/Hero.svelte';
	import WhatIs from './_components/WhatIs.svelte';
	import What from './_components/What.svelte';
	import Gallery from './_components/Gallery.svelte';
	import CamperTickets from './_components/CamperTickets.svelte';

	let { event, keynoters } = data;

	const metaTags = ((title = `${event.name} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${event.description} at THAT`,
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/${event.slug}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<section>
		<Hero {event} />

		<section>
			<WhatIs {event} />
			<div class="my-48">
				<What {event} />
			</div>
		</section>

		<section id="tickets" class="my-48">
			<CamperTickets {event} />
		</section>

		<section class="my-48">
			<Gallery />
		</section>

		<section class="my-48">
			<Keynoters {keynoters} />
		</section>

		<section class="my-48">
			{#if event.isCallForSpeakersOpen === true}
				<section id="upnext">
					<CallForSpeakers {event} />
				</section>
			{:else}
				<section>
					<Speakers {event} />
				</section>
				<section id="upnext">
					<UpNextEvent {event} />
				</section>
			{/if}
		</section>

		{#if event.followers.members.length > 0}
			<section class="my-48">
				<Attendees followers={event.followers.members} />
			</section>
		{/if}

		<section class="my-48">
			<Dates milestones={event.milestones} />
		</section>

		<section class="my-48">
			<NewsletterWide />
		</section>

		<section class="my-48" id="sponsors">
			<Partners {event} />
		</section>

		<section id="faq" />
		<FAQ />
	</section>
</div>
