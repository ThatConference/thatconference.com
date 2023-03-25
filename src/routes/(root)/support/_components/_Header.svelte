<script>
	export let center = false;
	export let pretext = 'Getting Started';
</script>

<div class="relative mx-auto max-w-prose text-base lg:max-w-none" class:text-center={center}>
	<p
		class="text-base font-semibold uppercase leading-6 tracking-wide
			text-thatOrange-400">
		{pretext}
	</p>
	<h1
		class="mt-2 mb-8 text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl md:text-6xl">
		<slot />
	</h1>
</div>
