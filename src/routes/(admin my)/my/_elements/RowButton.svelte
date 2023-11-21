<button
	{...$$restProps}
	type="button"
	on:click
	class="mr-2 rounded-full border-thatBlue-500 bg-thatBlue-500 px-4 py-1
		text-sm font-semibold text-white no-underline shadow-md
	hover:bg-thatOrange-500 focus:outline-none active:shadow-none">
	<span>
		<slot />
		<slot name="success" />
	</span>
</button>
