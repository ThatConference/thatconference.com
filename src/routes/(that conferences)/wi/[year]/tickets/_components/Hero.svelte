<script>
	export let event;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import { scrollto } from 'svelte-scrollto';

	import Hero from '$elements/layouts/Hero.svelte';

	dayjs.extend(advancedFormat);

	const venue = event.venues[0];
</script>

<Hero imagePath="/images/heros/wi/badge.jpg">
	<div class="flex flex-col px-4">
		<div class="flex max-w-3xl flex-col space-y-8">
			<h2 class="text-2xl font-bold uppercase tracking-wider text-white antialiased">
				<span class="text-green-500">{`${venue.city}, ${venue.state}`}</span> / {dayjs(
					event.startDate
				).format('MMMM Do')} - {dayjs(event.endDate).format('MMMM Do, YYYY')}
			</h2>
			<h1
				class="text-4xl font-extrabold uppercase text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
				THAT Conference <br />
				Ticket Information
			</h1>
		</div>

		<div class="mt-24 flex flex-col space-y-4 p-8 sm:flex-row sm:space-x-4 sm:space-y-0">
			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#professionals'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 px-12 py-6 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Professionals
						</p>
					</div>
				</a>
			</div>

			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#workshops'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 px-12 py-6 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Workshops
						</p>
					</div>
				</a>
			</div>

			<div class="flex-1 cursor-pointer">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="w-full text-center" use:scrollto={'#families'}>
					<div
						class="transform rounded-lg border-2 border-thatBlue-400 px-12 py-6 transition duration-500 ease-in-out hover:scale-105">
						<p class="text-2xl font-extrabold uppercase tracking-wider text-white antialiased">
							Families
						</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</Hero>
