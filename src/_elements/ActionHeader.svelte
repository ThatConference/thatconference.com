<script>
	export let title = '';
</script>

<header>
	<div class="mx-auto mt-6 px-4 lg:px-0">
		<div class="flex items-center justify-between">
			<h1 class="text-4xl font-bold tracking-tight text-thatBlue-700 sm:text-5xl">
				<slot name="title">{title}</slot>
			</h1>
			<div>
				<slot />
			</div>
		</div>
	</div>
</header>
