<script>
	import UserProfile from '../_components/UserProfile.svelte';
	import Cart from '../_components/Cart.svelte';
	import ClaimCart from '../_components/ClaimCart.svelte';
	import EventLink from '../_components/EventLink.svelte';
	import NavLink from '../_components/NavLink.svelte';

	import { goto } from '$app/navigation';
</script>

<div class="relative">
	<div class="mx-auto flex items-center justify-around p-8">
		<div>
			<a href="/" class="flex">
				<div>
					<img class="w-32" src="/images/ThatConferenceLogo.svg" alt="THAT Logo" />
				</div>
			</a>
		</div>

		<div class="flex space-x-8 text-lg font-bold">
			<EventLink
				on:eventSelected={({ detail }) => {
					switch (detail.event) {
						case 'TX':
							goto('/tx');
							break;
						case 'WI':
							goto('/wi');
							break;
					}
				}}>
				<span>Upcoming Conferences</span>
			</EventLink>

			<NavLink href="/call-for-speakers/">Call For Speakers</NavLink>
			<NavLink href="/sponsorships/apply/">Sponsor THAT</NavLink>
			<NavLink href="/newsletter/">Join Our Newsletter</NavLink>
			<NavLink href="/support/faq/">About THAT</NavLink>

			<div class="flex w-full flex-1 justify-end space-x-4">
				<ClaimCart />
				<Cart isDarkBackground={false} />
				<UserProfile />
			</div>
		</div>
	</div>
</div>
