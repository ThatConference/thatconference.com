<script>
	import { getContext } from 'svelte';
	import Icon from 'svelte-awesome';
	import { plus } from '$components/svelte-awesome-icons';

	import CartWarning from '../Cart.svelte';
	import ClaimCartWarning from '../ClaimCart.svelte';

	import UserProfile from '../UserProfile.svelte';
	import links from './links';

	const { state } = getContext('cart');

	$: cartItems = Object.keys($state.context.cart).length;
</script>

<div class="hidden text-gray-500 md:items-center md:justify-between lg:flex">
	<div class="md:ml-10 md:flex md:pr-4">
		{#each links as l}
			<a
				data-sveltekit-prefetch
				href={l.href}
				class="ml-1 rounded-md px-3 py-2 text-sm font-medium  text-gray-500
        transition duration-150 ease-in-out hover:bg-that-blue
          hover:bg-opacity-50 hover:text-white
          focus:bg-that-blue focus:text-white focus:outline-none">
				<div class="flex items-center">
					<svg class="h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M11 0h3L9 20H6l5-20z" />
					</svg>
					<span>{l.text}</span>
				</div>
			</a>
		{/each}
	</div>

	<div class="flex items-center">
		<div>
			<ClaimCartWarning />
		</div>

		<div>
			<CartWarning />
		</div>

		<div class="flex items-center justify-center">
			<div class="ml-4 rounded-full p-1  hover:bg-thatBlue-500  hover:text-white focus:text-white">
				<a href="/activities/create/">
					<Icon data={plus} class="h-8 w-8" />
				</a>
			</div>
		</div>

		<div
			class="ml-4 rounded-full p-1 text-that-orange hover:bg-thatBlue-500 hover:text-thatOrange-500 focus:text-white md:flex">
			<UserProfile />
		</div>
	</div>
</div>
