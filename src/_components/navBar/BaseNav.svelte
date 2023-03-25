<script>
	import UserProfile from '$components/nav/UserProfile.svelte';
	import Cart from '$components/nav/Cart.svelte';

	import EventLink from './components/EventLink.svelte';
	import NavLink from './components/NavLink.svelte';

	import { goto } from '$app/navigation';
</script>

<div class="relative bg-white ">
	<div class="mx-auto flex max-w-screen-xl items-center">
		<div class="flex space-x-2 text-sm font-bold">
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
				<span>Purchase Tickets</span>
			</EventLink>
			<NavLink href="/sponsors">Sponsors</NavLink>
			<NavLink href="/sponsorships/apply/">Sponsorship Prospectus</NavLink>
			<NavLink href="/call-for-speakers/">Call For Speakers</NavLink>
			<EventLink
				on:eventSelected={({ detail }) => {
					switch (detail.event) {
						case 'TX':
							goto('/support/travel/tx');
							break;
						case 'WI':
							goto('/support/travel/wi');
							break;
					}
				}}>
				<span>Travel</span>
			</EventLink>
			<NavLink href="/support/faq/">FAQ</NavLink>
		</div>

		<div class="flex w-full flex-1 justify-end space-x-4">
			<Cart isDarkBackground={false} />
			<UserProfile />
		</div>
	</div>
</div>
