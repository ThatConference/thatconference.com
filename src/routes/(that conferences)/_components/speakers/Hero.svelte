<script>
	export let event;
	export let isOnline = false;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	import Hero from '$elements/layouts/Hero.svelte';

	dayjs.extend(advancedFormat);

	const venue = event.venues[0];
</script>

<Hero imagePath="/images/heros/keynote.jpeg">
	<div class="flex flex-col justify-between px-4">
		<div class="flex max-w-3xl flex-col space-y-8">
			<h2 class="text-2xl font-bold uppercase tracking-wider text-white antialiased">
				{#if !isOnline}
					<span class="text-green-500">{`${venue.city}, ${venue.state}`}</span> /
					{dayjs(event.startDate).format('MMMM Do')} - {dayjs(event.endDate).format(
						'MMMM Do, YYYY'
					)}
				{:else}
					<span class="text-green-500">ONLINE</span> /
					{dayjs(event.startDate).format('MMMM Do')} - {dayjs(event.endDate).format(
						'MMMM Do, YYYY'
					)}
				{/if}
			</h2>
			<h1
				class="text-4xl font-extrabold uppercase text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
				THAT Conference <br />
				Speakers
			</h1>
		</div>
	</div>
</Hero>
