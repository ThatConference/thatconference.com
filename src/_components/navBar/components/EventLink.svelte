<script>
	import { createEventDispatcher } from 'svelte';
	import EventPicker from '$components/EventPicker.svelte';
	const dispatch = createEventDispatcher();

	let showPicker = false;
	function buttonOnClick() {
		showPicker = !showPicker;
	}
</script>

<div class="flex">
	<button
		on:click={buttonOnClick}
		class="w-full rounded-md px-3 py-2 text-gray-600 transition duration-150 ease-in-out hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white focus:outline-none">
		<div class="flex items-center">
			<svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
				<path d="M11 0h3L9 20H6l5-20z" />
			</svg>
			<slot />
		</div>
	</button>
</div>

{#if showPicker}
	<EventPicker
		on:eventSelected={({ detail }) => {
			showPicker = false;
			dispatch('eventSelected', detail);
		}}
		on:click_outside={() => {
			showPicker = false;
		}}
		on:close={() => {
			showPicker = false;
		}} />
{/if}
