<script>
	export let event;

	import { createEventDispatcher } from 'svelte';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	import lodash from 'lodash';

	import { Standard as StandardButton } from '$elements/buttons';
	import { Check } from '$elements/svgs';

	dayjs.extend(advancedFormat);
	const dispatch = createEventDispatcher();
	const { keyBy } = lodash;

	const tickets = event.products
		.filter((f) => f.isEnabled === true && f.productType === 'TICKET')
		// if claimable_ticket don't filter in if eventActivities includes expo hall
		.filter((e) =>
			e.uiReference === 'CLAIMABLE_TICKET' ? !e.eventActivities?.includes('EXPO_HALL') : true
		);

	const eventTickets = keyBy(
		tickets.filter((t) => t.uiReference),
		(i) => i.uiReference
	);

	const claimableTicket = eventTickets['CLAIMABLE_TICKET'] ?? {};
</script>

<div class="mt-48 bg-gradient-to-t from-thatBlue-400 to-thatBlue-800 px-4 sm:px-6 lg:px-8 lg:py-20">
	<div>
		<div class="relative flex flex-col items-center justify-center space-y-12">
			<p
				class=" text-2xl font-extrabold uppercase text-white antialiased sm:text-3xl lg:text-4xl xl:text-5xl">
				Claim Your Seat
			</p>

			<p class="mx-auto max-w-6xl text-center text-xl text-gray-300 sm:mt-5 sm:text-2xl">
				Join us live on the main stage at THAT Conference. We'll be streaming all of our keynotes,
				panel discussions and a few of our favorite podcasts will rock our main campsite.
			</p>
		</div>
		<div class="mx-auto mt-24 max-w-screen-xl">
			<div
				class="relative mt-12 flex flex-col space-y-10 lg:mt-24 lg:flex-row lg:space-x-10 lg:space-y-0">
				{#if claimableTicket.id}
					<div class="flex flex-col rounded-xl shadow-lg">
						<div class="bg-white px-6 py-8 sm:p-10 sm:pb-6">
							<div class="inline-flex items-center">
								<div>
									<span
										class="rounded-full bg-thatRed-500 px-4 py-1 text-sm font-semibold uppercase leading-5 tracking-wide text-white">
										THAT Conference Online - Event Ticket
									</span>
								</div>
							</div>
							<div class="mt-4 flex items-baseline text-6xl font-extrabold">Free</div>
							<p class="mt-5 text-lg text-gray-500">
								{event.name}
							</p>
							<p class="text-lg text-gray-500">
								{dayjs(event.startDate).format('dddd, MMMM Do')} -
								{dayjs(event.endDate).format('Do, YYYY')}
							</p>
							<p class="mt-6 text-lg text-gray-500">
								{claimableTicket.description}
							</p>
						</div>
						<div
							class="flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pb-8 pt-6 sm:p-10 sm:pt-6">
							<ul class="space-y-4">
								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Online Access</p>
								</li>

								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Create or Join Any Virtual Open Space</p>
								</li>
							</ul>

							<StandardButton
								on:click={() =>
									dispatch('claim-ticket', {
										product: { ...claimableTicket }
									})}>
								Claim Your Ticket
							</StandardButton>
						</div>
					</div>
				{/if}

				<div class="flex flex-col rounded-xl shadow-lg">
					<div class="bg-white px-6 py-8 sm:p-10 sm:pb-6">
						<div class="inline-flex items-center">
							<div>
								<span
									class="rounded-full bg-thatRed-500 px-4 py-1 text-sm font-semibold uppercase leading-5 tracking-wide text-white">
									THAT Conference Online - Event Ticket
								</span>
							</div>
						</div>
						<div class="mt-4 flex items-baseline text-6xl font-extrabold">
							${eventTickets['VIRTUAL_CAMPER'].price}
							<span class="ml-1 text-2xl font-medium text-gray-500"> USD </span>
						</div>
						<p class="mt-5 text-lg text-gray-500">
							{event.name}
						</p>
						<p class="text-lg text-gray-500">
							{dayjs(event.startDate).format('dddd, MMMM Do')} -
							{dayjs(event.endDate).format('Do, YYYY')}
						</p>
						<p class="mt-6 text-lg text-gray-500">
							{eventTickets['VIRTUAL_CAMPER'].description}
						</p>
					</div>
					<div
						class="flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pb-8 pt-6 sm:p-10 sm:pt-6">
						<ul class="space-y-4">
							<li class="flex items-start">
								<div class="flex-shrink-0">
									<span class="text-green-500"><Check /></span>
								</div>
								<p class="ml-3 text-base text-gray-700">Online Access</p>
							</li>

							<li class="flex items-start">
								<div class="flex-shrink-0">
									<span class="text-green-500"><Check /></span>
								</div>
								<p class="ml-3 text-base text-gray-700">Create or Join Any Virtual Open Space</p>
							</li>

							<li class="flex items-start">
								<div class="flex-shrink-0">
									<span class="text-green-500"><Check /></span>
								</div>
								<p class="ml-3 text-base text-gray-700">Helps Support Future Events</p>
							</li>
						</ul>
						<StandardButton on:click={() => dispatch('purchase-event-ticket')}>
							Buy us a Coffee & Claim Ticket
						</StandardButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
