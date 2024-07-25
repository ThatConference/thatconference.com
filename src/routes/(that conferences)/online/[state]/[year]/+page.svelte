<script>
	export let data;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	import NewsletterWide from '$components/newsletter/Wide.svelte';

	import Keynoters from '../../../_components/Keynoters.svelte';
	import SpeakersLight from '../../../_components/speakers/SpeakersLight.svelte';
	import Attendees from '../../../_components/Attendees.svelte';

	import Hero from '../../_components/Hero.svelte';
	// import Live from '../../_components/Live.svelte';
	import EventTickets from '../../_components/EventTickets.svelte';
	import FAQ from '../../_components/FAQ.svelte';
	import Schedule from '../../_components/Schedule.svelte';
	import Sponsors from '../../_components/Sponsors.svelte';

	let { event, keynoters = [], partners = [] } = data;

	const cart = getContext('cart');
	const claimTicket = getContext('claimTicket');

	async function handleClaimTicket(event, { product }) {
		const ticket = {
			eventId: event.id,
			eventDetails: event,
			productId: product.id,
			productDetails: product
		};

		claimTicket.send('ADD_ITEM', ticket);
		goto('/orders/claim/');
	}

	function handleAddEventTicketClick(eventId, eventProducts, quantity = 1) {
		const eventTicket = eventProducts
			.filter((f) => f.isEnabled)
			.find((e) => e.uiReference === 'VIRTUAL_CAMPER');
		const isBulkPurchase = quantity > 1 ? true : false;

		cart.send('ADD_ITEM', {
			eventId,
			eventDetails: event,
			...eventTicket,
			isBulkPurchase,
			quantity
		});
		goto('/orders/summary/');
	}
</script>

<div>
	<section>
		<Hero {event} />
	</section>

	<section class="my-48">
		<!-- todo: once scheduled -->
		<Live />
	</section>

	<section class="my-48">
		<Keynoters {keynoters} />
	</section>

	<section class="my-48">
		<SpeakersLight {event} max={30} />
	</section>

	<section id="schedule" class="my-48">
		<Schedule />
	</section>

	<section id="tickets" class="my-48">
		<EventTickets
			{event}
			on:claim-ticket={({ detail }) => handleClaimTicket(event, detail)}
			on:purchase-event-ticket={() => handleAddEventTicketClick(event.id, event.products)} />
	</section>

	{#if event.followers.members.length > 0}
		<section class="my-48">
			<Attendees followers={event.followers.members} />
		</section>
	{/if}

	<section class="my-48">
		<NewsletterWide />
	</section>

	<section class="my-48">
		<Sponsors {partners} />
	</section>

	<section class="my-48">
		<FAQ />
	</section>
</div>
