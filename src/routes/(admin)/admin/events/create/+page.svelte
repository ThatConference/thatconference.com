<script>
	export let data;

	import EventForm from '../_components/EventForm.svelte';

	const { form } = data;
</script>

<div>
	<header>
		<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500">Adding to that</h2>
		<h1 class="hText mb-8 mt-4">Create A New Event</h1>
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
