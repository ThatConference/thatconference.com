<script>
	export let title;
	export let preText = 'THAT Legal Stuff';

	import Header from './_Header.svelte';
</script>

<div class="overflow-hidden py-20">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Header center="true" pretext={preText}>{title}</Header>
		<slot />
	</div>
</div>
