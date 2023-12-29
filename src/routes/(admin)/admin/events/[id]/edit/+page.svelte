<script>
	export let data;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import EventForm from '../../_components/EventForm.svelte';
	import { Breakpoints } from '$components/breakpoints';

	dayjs.extend(advancedFormat);

	const { form, name, startDate } = data;
	let currentBreakpoint;
</script>

<Breakpoints bind:value={currentBreakpoint} />

<div>
	<header>
		<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500">Making Updates to:</h2>
		<h3 class="hText mb-8 mt-4">
			{#if ['xs', 'sm', 'md'].includes(currentBreakpoint)}
				{name}, {dayjs(startDate).format('YY')}
			{:else}
				{name}, {dayjs(startDate).format('MMM Do YYYY')}
			{/if}
		</h3>
	</header>

	<div class="mt-20">
		<EventForm sForm={form} />
	</div>
</div>

<style lang="postcss">
	.hText {
		@apply text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}
</style>
