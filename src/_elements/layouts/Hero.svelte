<script>
	export let imagePath;
	export let isCenter = true;
</script>

<div class="relative overflow-hidden">
	<div
		style="background-image: linear-gradient(rgba(31, 42, 99, 0.8), rgba(31, 42, 99, 0.8)), url({imagePath});"
		class="bg-cover"
		class:bg-center={isCenter}
		class:bg-top={!isCenter}>
		<div class="mx-auto max-w-screen-xl">
			<div class="py-40">
				<slot />
			</div>
			<div class="flex justify-center pb-16 text-green-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 animate-bounce"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>
		</div>
	</div>
</div>
