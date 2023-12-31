<script>
	export let days;
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	dayjs.extend(advancedFormat);

	import List from './List.svelte';
</script>

<div class="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
	{#each days as day}
		<div>
			<h3 class="text-2xl font-semibold tracking-tight text-thatBlue-700">
				<time dateTime={day.date}>{dayjs(day.date).format('dddd MMMM, Do')}</time>
			</h3>
			<p class="mt-1.5 text-base tracking-tight text-thatBlue-700">
				{day.summary}
			</p>

			<div class="mt-12">
				<List sessions={day.sessions} />
			</div>
		</div>
	{/each}
</div>
