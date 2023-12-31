<script>
	export let data;

	import Hero from '../../../../_components/speakers/Hero.svelte';
	import MemberCard from '$components/members/MemberCard.svelte';

	let { speakers, event } = data;
</script>

<main>
	<header>
		<Hero {event} />
	</header>

	<section class="mx-auto my-24 max-w-2xl lg:max-w-7xl">
		<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each speakers as speaker (speaker.id)}
				<li class="col-span-1">
					<MemberCard {...speaker} />
				</li>
			{/each}
		</ul>
	</section>
</main>
