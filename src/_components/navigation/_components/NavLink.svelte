<script>
	export let href;
</script>

<div class="flex">
	<a
		on:click
		data-sveltekit-prefetch
		{href}
		class="w-full rounded-md px-3 py-2 text-gray-600
			transition duration-150 ease-in-out
		hover:bg-that-blue hover:text-white
		focus:bg-that-blue focus:text-white focus:outline-none">
		<div class="flex items-center">
			<span><slot /></span>
		</div>
	</a>
</div>
