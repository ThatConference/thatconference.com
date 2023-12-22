<script>
	export let value;

	let innerWidth;

	$: if (innerWidth < 640) {
		value = 'xs';
	} else if (innerWidth < 768) {
		// => @media (min-width: 640px)
		value = 'sm';
	} else if (innerWidth < 1024) {
		// => @media (min-width: 768px)
		value = 'md';
	} else if (innerWidth < 1280) {
		// => @media (min-width: 1024px)
		value = 'lg';
	} else if (innerWidth < 1536) {
		// => @media (min-width: 1280px)
		value = 'xl';
	} else {
		// => @media (min-width: 1536px)
		value = '2xl';
	}
</script>

<svelte:window bind:innerWidth />
