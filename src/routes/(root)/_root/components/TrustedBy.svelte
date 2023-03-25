<script>
	export let sponsors = [];
	import Ticker from '$components/sponsors/Ticker.svelte';
</script>

<div class="py-12">
	<div class="relative my-12 mx-auto max-w-screen-xl">
		<h3
			class="flex flex-col items-center text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl md:text-6xl">
			Trusted By
		</h3>
	</div>

	<Ticker partners={sponsors} />
</div>
