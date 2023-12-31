<script>
	import StaticList from './schedule/StaticList.svelte';
	import TabbedList from './schedule/TabbedList.svelte';

	const days = [
		{
			date: '2024-01-29T08:30:00.000Z',
			summary: 'The first day of the conference is focused on dark patterns for ecommerce.',
			sessions: [
				{
					name: 'Shaundai Person',
					description: 'Keynote',
					start: '8:30 AM'
				},
				{
					name: 'Panel Conversation',
					description: 'Not so one-time payments',
					start: '10:30 AM'
				},
				{
					name: 'Lunch / Break',
					description: 'Not so one-time payments',
					start: '11:30 AM'
				},
				{
					name: 'Compressed FM Live',
					description: 'Not so one-time payments',
					start: '1:00 PM'
				},
				{
					name: 'Panelist Conversation',
					description: 'Not so one-time payments',
					start: '2:30 PM'
				},
				{
					name: 'Panelist Conversation',
					description: 'Not so one-time payments',
					start: '4:00 AM'
				}
			]
		},
		{
			date: '2024-01-30T08:30:00.000Z',
			summary: 'The first day of the conference is focused on dark patterns for ecommerce.',
			sessions: [
				{
					name: 'Danny Thompson',
					description: 'Keynote',
					start: '8:30 AM'
				},
				{
					name: 'Panelist Conversation',
					description: 'Not so one-time payments',
					start: '10:30 AM'
				},
				{
					name: 'Lunch Break',
					description: 'Not so one-time payments',
					start: '11:30 AM'
				},
				{
					name: 'Tech Commute Live',
					description: 'Not so one-time payments',
					start: '1:00 PM'
				},
				{
					name: 'Panelist Conversation',
					description: 'Not so one-time payments',
					start: '2:30 PM'
				},
				{
					name: 'Whiskey Web and Whatnot Live',
					description: 'Not so one-time payments',
					start: '4:00 PM'
				}
			]
		},
		{
			date: '2024-01-31T08:30:00.000Z',
			summary: 'The first day of the conference is focused on dark patterns for ecommerce.',
			sessions: [
				{
					name: 'Kelly Vaughn',
					description: 'Keynote',
					start: '8:30 AM'
				},
				{
					name: 'Panelist Conversation',
					description: 'Not so one-time payments',
					start: '10:30 AM'
				},
				{
					name: 'Lunch Break',
					description: 'Not so one-time payments',
					start: '11:30 AM'
				},
				{
					name: 'Podcast Live',
					description: 'Not so one-time payments',
					start: '1:00 PM'
				},
				{
					name: 'Panelist Conversation',
					description: 'Not so one-time payments',
					start: '2:30 PM'
				},
				{
					name: 'Closing',
					description: 'Not so one-time payments',
					start: '4:00 AM'
				}
			]
		}
	];
</script>

<div class="relative mx-auto max-w-2xl px-4 lg:max-w-7xl">
	<header class="pb-24">
		<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">Overview</h3>
		<h2 class="hText mb-8 mt-8">Daily Schedule</h2>
		<p class="mt-6 text-2xl text-gray-500">
			Meet the geeks who will be on the main stage throughout our time together. The conversations
			are unscripted and you can participate by joining in the live stream.
		</p>
		<p class="mt-6 text-xl leading-7">
			<a class="a-decorate" href="schedule">View the detailed schedule.</a>
		</p>
	</header>

	<TabbedList {days} />
	<StaticList {days} />
</div>

<style lang="postcss">
	.hText {
		@apply text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}
</style>
