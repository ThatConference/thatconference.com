<script>
	export let partners;

	import PartnerCard from '$components/partners/PartnerCard.svelte';
	import { Standard as StandardLink } from '$elements/links';

	const { id, partners: sponsors } = partners;

	const q = id ? `?eventId=${id}` : '';
</script>

<div class="relative mx-auto max-w-screen-xl px-8">
	<header class="pb-24">
		<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">Thank You</h3>
		<h2
			class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
			Visit Our Sponsors
		</h2>
		<p class="mt-6 text-2xl text-gray-500">
			We are grateful for the continued support of our sponsors, who make it possible to run THAT
			Conference. You have a unique opportunity to connect with each of them and learn more about
			what they do and how you could leverage them.
		</p>
	</header>

	<div>
		<div class="pt-8">
			<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each sponsors as p}
					<li
						class="col-span-1 flex transform flex-col rounded-lg bg-white text-center shadow transition duration-500 ease-in-out hover:scale-105 hover:bg-that-offWhite">
						<a href={`/sponsors/${p.slug}${q}`}>
							<PartnerCard {...p} />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="mt-36 justify-between lg:flex">
		<div class="mb-12">
			<div class="text-2xl font-bold uppercase text-gray-500">
				Interested In Sponsoring THAT Conference?
			</div>

			<div class="prose mt-6 text-xl text-gray-500">
				We partner with industry-leading organizations and companies that are looking to connect
				with software developers and practitioners.
			</div>
		</div>

		<div>
			<StandardLink href="/sponsorships/apply/#prospectus">Apply Today</StandardLink>
		</div>
	</div>
</div>
