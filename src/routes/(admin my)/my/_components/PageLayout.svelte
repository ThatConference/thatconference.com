<main class="relative mb-24 mt-12 flex-grow">
	<div class="mx-auto max-w-7xl">
		<slot name="header" />

		<div id="content-block" class="mt-12 rounded-lg bg-gray-100 px-5 py-6 shadow sm:px-6">
			<slot />
		</div>
	</div>
</main>
