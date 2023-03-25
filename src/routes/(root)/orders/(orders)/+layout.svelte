<script>
	import Prerequisites from '../_components/_Prerequisites.svelte';
</script>

<div class="relative mx-auto mt-12 max-w-screen-xl">
	<div class="mt-12 lg:flex lg:justify-between">
		<div>
			<h2 class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl md:text-6xl">
				Order Summary
			</h2>

			<div class="mt-12">
				<Prerequisites />
			</div>
		</div>
	</div>

	<slot />
</div>
