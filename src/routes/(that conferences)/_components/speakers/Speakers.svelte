<script>
	import lodash from 'lodash';
	const { uniqBy, pick } = lodash;
	export let event;
	export let max = 15;

	$: speakers = uniqBy(
		event.speakers.filter((s) => s).filter((x) => x.profileSlug != 'thatconference'),
		(i) => i.id
	).slice(0, max);

	import MemberCard from '$components/members/MemberCard.svelte';

	function filterMemberData(m) {
		return pick(m, [
			'firstName',
			'lastName',
			'jobTitle',
			'company',
			'profileImage',
			'profileSlug',
			'earnedMeritBadges',
			'profileLinks'
		]);
	}
</script>

{#if speakers.length > 0}
	<section class=" bg-thatBlue-800 py-12 lg:py-24">
		<div class="relative isolate mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2
					class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-white sm:text-5xl sm:leading-10">
					Speaker Spotlights
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href={`speakers`}>View the full speaker lineup.</a>
					</span>
				</p>
			</div>

			<div class="mt-12">
				<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{#each speakers as s}
						<li class="col-span-1">
							<MemberCard {...filterMemberData(s)} darkMode={true} />
						</li>
					{/each}
				</ul>
			</div>
			<div
				class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
				aria-hidden="true">
				<div
					class="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
					style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)">
				</div>
			</div>
		</div>
	</section>
{/if}
