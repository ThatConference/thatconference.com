<script>
	export let event;

	import { fade } from 'svelte/transition';
	import lodash from 'lodash';

	import { FeaturedActivity } from '$elements/activities';

	let sessions = event.sessions.sessions;

	$: sessionsFiltered = sessions
		.filter((s) => s)
		.filter((s) => s.status === 'ACCEPTED')
		.filter((s) => s.speakers[0].profileSlug !== 'thatconference')
		.slice(0, 9);
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
	<div class="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl">
					Featured Activities
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					Do you have a ticket?
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href={`/activities/${event.slug}`}>View the full schedule.</a>
					</span>
				</p>
			</div>

			<ul class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
				{#if event.sessions.sessions}
					{#each sessionsFiltered as s (s.id)}
						<li in:fade>
							<FeaturedActivity {...lodash.pick(s, ['id', 'title', 'speakers', 'startTime'])} />
						</li>
					{/each}
				{/if}

				<!-- <li class="h-full w-full" in:fade>
					<FeaturedActivityAdd eventId={event.id} />
				</li> -->
			</ul>

			<div class="flex justify-end">
				<slot name="action" />
			</div>
		</div>
	</div>
</section>
