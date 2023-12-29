<script>
	export let value = false;
	export let title, description;

	import Toggle from '$elements/toggles/Toggle.svelte';

	function handleToggled(e) {
		value = e.detail;
	}
</script>

<div class="flex items-center gap-x-3">
	<Toggle on:toggled={handleToggled} checked={value} />
	<div class="text-sm leading-6">
		<label for="comments" class="font-medium text-gray-900">{title}</label>
		{#if description}
			<p class="text-gray-500">{description}</p>
		{/if}
	</div>
</div>
