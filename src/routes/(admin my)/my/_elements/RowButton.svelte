<script>
	export let type = 'button';
</script>

<button
	{...$$restProps}
	{type}
	on:click
	class="rounded-full border-thatBlue-500 bg-thatBlue-500 px-4
		py-1 text-sm font-semibold text-white no-underline
	shadow-md hover:bg-thatOrange-500 focus:outline-none active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400">
	<span>
		<slot />
	</span>
</button>
