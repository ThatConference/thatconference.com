<script>
	export let title = '';
</script>

<header>
	<div class="mx-auto">
		<div class="flex justify-between">
			<h1 class="mt-6 text-4xl font-bold tracking-tight text-thatBlue-700 sm:text-5xl">
				<slot name="title">{title}</slot>
			</h1>
			<span class="inline-flex rounded-md shadow-sm">
				<slot />
			</span>
		</div>
	</div>
</header>
