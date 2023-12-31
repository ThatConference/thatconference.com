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

<section class="bg-thatBlue-800 py-12 lg:py-24">
	<div class="relative isolate mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2
					class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-white sm:text-5xl sm:leading-10">
					Session Spotlights
				</h2>

				<p class="text-xl leading-7 text-gray-300">
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href={`schedule`}>View the full schedule.</a>
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
			</ul>

			<div class="flex justify-end">
				<slot name="action" />
			</div>
		</div>
		<div
			class="absolute inset-x-0 top-28 -z-10 flex transform-gpu justify-center overflow-hidden blur-2xl"
			aria-hidden="true">
			<div
				class="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
				style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)">
			</div>
		</div>
	</div>
</section>
