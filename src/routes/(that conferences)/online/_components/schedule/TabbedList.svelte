<script>
	export let days;
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';

	dayjs.extend(advancedFormat);

	import List from './List.svelte';

	let currentSelection = days[0];
</script>

<div class="lg:hidden">
	<div class="flex">
		{#each days as day}
			<button on:click={() => (currentSelection = day)} class="anchorButton m-2 grow">
				<div>{dayjs(day.date).format('dddd')}</div>
			</button>
		{/each}
	</div>

	<div class="mt-12">
		<h3 class="text-center text-2xl font-semibold tracking-tight text-thatBlue-700">
			<time>
				{dayjs(currentSelection.date).format('dddd MMMM Do, YYYY')}
			</time>
		</h3>
		<p class="mt-1.5 text-center text-base tracking-tight text-thatBlue-700">
			{currentSelection.summary}
		</p>
		<div class="mt-8">
			<List sessions={currentSelection.sessions} />
		</div>
	</div>
</div>

<style lang="postcss">
	.anchorButton {
		@apply rounded-md bg-thatBlue-500 px-4 py-4 text-center font-medium tracking-wide text-white shadow-md md:text-xl;
	}

	.anchorButton:hover {
		@apply bg-thatBlue-400 transition duration-150 ease-in-out;
	}
	.anchorButton:focus {
		@apply underline underline-offset-4;
	}
</style>
