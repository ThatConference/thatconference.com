<main class="relative flex-grow">
	<div class="mx-auto max-w-7xl pb-12">
		<slot name="header" />

		<div id="content-block" class="mt-12 rounded-xl bg-gray-100 px-5 py-6 shadow-xl sm:px-6">
			<slot />
		</div>
	</div>
</main>
