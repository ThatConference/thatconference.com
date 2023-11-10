<script>
	import { createEventDispatcher } from 'svelte';
	import EventPicker from '$components/EventPicker.svelte';
	import Standard from '$elements/buttons/Standard.svelte';

	const dispatch = createEventDispatcher();

	let showPicker = false;
	function buttonOnClick() {
		showPicker = !showPicker;
	}
</script>

<Standard on:click={buttonOnClick}>
	<slot />
</Standard>

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
