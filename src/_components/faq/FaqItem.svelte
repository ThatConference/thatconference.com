<script>
	export let faqs = [];
</script>

<div class="mt-6 border-t-2 border-gray-200 pt-6">
	<dl>
		{#each faqs as faq, i}
			{#if i === 0}
				<div class="md:grid md:grid-cols-12 md:gap-8">
					<dt class="text-base font-medium leading-6 text-gray-900 md:col-span-5">
						{faq.question}
					</dt>

					<dd class="mt-2 md:col-span-7 md:mt-0">
						<p class="text-base leading-6 text-gray-500">
							<!-- eslint-disable-next-line  svelte/no-at-html-tags -->
							{@html faq.answer}
						</p>
					</dd>
				</div>
			{:else}
				<div
					class="mt-8 border-t border-gray-200 pt-6 md:grid md:grid-cols-12
						md:gap-8">
					<dt class="text-base font-medium leading-6 text-gray-900 md:col-span-5">
						{faq.question}
					</dt>
					<dd class="mt-2 md:col-span-7 md:mt-0">
						<p class="text-base leading-6 text-gray-500">
							<!-- eslint-disable-next-line  svelte/no-at-html-tags -->
							{@html faq.answer}
						</p>
					</dd>
				</div>
			{/if}
		{/each}
	</dl>
</div>
