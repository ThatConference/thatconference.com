<script>
	export let event;

	import { LeftArrow, Star } from '$elements/svgs';

	import UserProfile from '$components/navigation/_components/UserProfile.svelte';
	import Cart from '$components/navigation/_components/Cart.svelte';

	const [venue] = event.venues;
</script>

<div class="relative h-16 bg-that-navy px-24 text-white">
	<div class="flex h-full items-center justify-between">
		<div class="flex space-x-3">
			<div class="font-semibold antialiased">
				<a href="/" class="flex items-center space-x-2">
					<LeftArrow />
					<span>Back to THAT</span>
				</a>
			</div>
			<div>-</div>
			<div class="font-semibold antialiased">
				<a href="/that-conference" class="flex items-center space-x-2">
					<span>Ticket are currently on sale</span>
				</a>
			</div>
		</div>
		<div class="flex items-center space-x-12">
			<div class="flex items-center space-x-3">
				<a href={`/that-conference`}>
					<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
						<div>THAT Conference</div>
					</div>
				</a>

				<span>-</span>

				<a href={`/events/${event.slug}`}>
					<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
						<div class="flex items-center space-x-2 uppercase text-white">
							<span>{venue.city}</span>
							<Star />
							<span>{venue.state}</span>
						</div>
					</div>
				</a>
			</div>

			<div class="flex items-center space-x-4 font-bold">
				<Cart />
				<UserProfile />
			</div>
		</div>
	</div>
</div>
