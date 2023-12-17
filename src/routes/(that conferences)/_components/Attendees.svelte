<script>
	export let followers = [];
	import MemberCard from '$components/members/MemberCard.svelte';
	import StandardLink from '$elements/links/Standard.svelte';

	let randomFollowers = followers
		.slice()
		.sort(() => Math.random() - 0.5)
		.slice(0, 15);
</script>

<div class="relative mx-auto max-w-screen-xl px-8">
	<header class="pb-24">
		<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">
			Connecting the Community
		</h3>
		<h2
			class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
			Your_Tribe++;
		</h2>
		<p class="mt-6 text-2xl text-gray-500">
			Come for the content, leave with a community. At THAT Conference one of our core principles is
			to better connect our community. We do this through our online activities, our events, and the
			platform we built to serve you.
		</p>
	</header>

	<div>
		<ul
			class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5">
			{#each randomFollowers as m (m.id)}
				<li class="col-span-1">
					<MemberCard {...m} />
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex justify-end py-24 font-extrabold text-red-500">
		<StandardLink href="attendees">Meet The Campers</StandardLink>
	</div>
</div>
