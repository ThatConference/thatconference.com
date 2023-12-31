<script>
	import { LeftArrow } from '$elements/svgs';

	import UserProfile from '$components/navigation/_components/UserProfile.svelte';
	import Cart from '$components/navigation/_components/Cart.svelte';
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
				<a href="/" class="flex items-center space-x-2">
					<span>Join Free, Claim Your Seat Today!</span>
				</a>
			</div>
		</div>
		<div class="flex items-center space-x-12">
			<div class="flex items-center space-x-3">
				<a href={`/`}>
					<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
						<div>THAT Conference Online</div>
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
