<script>
	export let event;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	import TicketCard from '../../../../_components/TicketCard.svelte';

	const { send } = getContext('cart');
	const { products } = event;

	const geeklingTicket = products.find((p) => p.uiReference === 'GEEKLING');

	const campmateTicket = products.find((p) => p.uiReference === 'CAMPMATE');

	const pigRoast = products.find((p) => p.uiReference === 'HOG_ROAST');

	const familyTickets = [
		{
			...geeklingTicket,
			includes: ['Family Sessions', 'THAT Badge', 'T-Shirt', 'Happy Hour', 'BBQ', 'Game Night']
		},
		{
			...campmateTicket,
			includes: ['Family Sessions', 'THAT Badge', 'T-Shirt', 'Happy Hour', 'BBQ', 'Game Night']
		}
	];

	if (pigRoast?.isEnabled === true) {
		familyTickets.push({
			...pigRoast,
			includes: ['BBQ']
		});
	}

	function handleAddToCart(uiReference) {
		const eventTicket = event.products
			.filter((p) => p.isEnabled)
			.find((p) => p.uiReference === uiReference);

		send('ADD_ITEM', {
			eventId: event.id,
			eventDetails: event,
			...eventTicket
		});

		goto('/orders/summary/');
	}
</script>

<div class="relative">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-3">
			<img
				class="col-start-2 object-center"
				src="/images/characters/what_to_expect_families_welcome.png"
				alt />
		</div>
	</div>

	<div id="families">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="lg:pr-12">
				<h2 class="text-3xl font-extrabold text-thatBlue-800 sm:text-4xl lg:text-5xl">
					Families Welcome!
				</h2>

				<p class="prose-xl mt-12 text-gray-500">
					At our core, THAT Conference is about family, community and the next generation of
					technologists. We strive to provide opportunities for children to speak, learn and
					experience many areas of the STEM field while interacting with industry professionals. At
					THAT Conference, families are not only welcomed, but encouraged to join us for family
					sessions.
				</p>
			</div>
		</div>

		<div class="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
			<div class="relative">
				<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div class="grid grid-cols-1 gap-x-8 gap-y-52 sm:grid-cols-2">
						{#each familyTickets as ticket}
							<TicketCard
								ticketDetails={ticket}
								on:click={() => handleAddToCart(ticket.uiReference)} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
