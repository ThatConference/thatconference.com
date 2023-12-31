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
	<div class="relative mx-auto max-w-2xl px-4 lg:max-w-7xl">
		<header class="pb-24">
			<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">Geeks With Mics</h3>
			<h2 class="hText mb-8 mt-8">Speakers and Panelists</h2>
			<p class="mt-6 text-2xl text-gray-500">
				Meet the geeks who will be on the main stage throughout our time together. The conversations
				are unscripted and you can participate by joining in the live stream.
			</p>
			<p class="mt-6 text-xl leading-7">
				<a class="a-decorate" href={`speakers`}>View the full speaker lineup.</a>
			</p>
		</header>

		<div class="mt-12">
			<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each speakers as s}
					<li class="col-span-1">
						<MemberCard {...filterMemberData(s)} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style lang="postcss">
	.hText {
		@apply text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}
</style>
