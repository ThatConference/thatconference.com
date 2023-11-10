<script>
	export let article, slug;

	import { CalendarPlus } from 'lucide-svelte';
	import { Standard } from '$elements/links';
</script>

<div class="m-4">
	<div class="p-8 sm:flex">
		<div class="sm:w-2/3">
			<div class="font-display text-2xl font-semibold text-neutral-950">
				<a href={slug}>
					{article.title}
				</a>
			</div>

			<p class="mt-6 max-w-2xl text-base text-neutral-600">
				{article.teaser}
			</p>

			<div class="mt-8 flex items-center space-x-4 text-gray-500">
				<CalendarPlus />
				<span>Published on November 10, 2023</span>
			</div>
		</div>

		<div class="mt-8 grid place-content-center sm:mt-0">
			<Standard href={slug}>Read more</Standard>
		</div>
	</div>
</div>
