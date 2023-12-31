<script>
	export let event;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';

	import Hero from '$elements/layouts/Hero.svelte';

	dayjs.extend(advancedFormat);
</script>

<Hero imagePath="/images/heros/online/landing-hero.jpg">
	<div class="px-4 lg:grid lg:grid-cols-7">
		<div class="col-span-5">
			<div class="flex flex-col items-center space-y-8 sm:items-start">
				<h1 class="text-2xl font-bold uppercase tracking-wider text-white antialiased">
					<span class="text-green-500">
						{dayjs(event.startDate).format('MMMM Do')} - {dayjs(event.endDate).format(
							'MMMM Do, YYYY'
						)}
					</span>
				</h1>
				<p class="text-5xl font-extrabold tracking-wider text-white antialiased">
					Join The Live Conversations From The Main Stage At THAT Conference
				</p>
				<div class="flex pt-12">
					<a href={`/${event.slug}#${`tickets`}`}>
						<div
							class="transform rounded-lg border-2 border-thatBlue-400 px-12 py-6 transition duration-500 ease-in-out hover:scale-105">
							<div class="flex items-center space-x-4">
								<div class="col-span-3 flex flex-col items-center justify-center">
									<img
										class="lazyload h-12 w-auto"
										src="/images/faux-ticket-stub.svg"
										alt="THAT Robot Play Button" />
								</div>
								<div>
									<p class="text-xl font-extrabold tracking-wider text-white antialiased">
										Ticket Options
									</p>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</Hero>
