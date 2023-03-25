<script>
	import { page } from '$app/stores';
	import lodash from 'lodash';
	import Headroom from 'svelte-headroom';

	import CreateProfileNotification from '$components/notifications/CreateProfile.svelte';

	import BaseNav from './BaseNav.svelte';

	import NavHat from './NavHat.svelte';
	// import EventNav from './EventNav.svelte';
	// import MobileNavHat from './MobileNavHat.svelte';
	// import MobileEventNav from './MobileEventNav.svelte';

	const { isEmpty } = lodash;
	let hidden = true;

	// function handleShow({ detail }) {
	// 	hidden = detail;
	// }
</script>

<div class="relative z-10 bg-white pb-4 sm:pb-8 md:pb-10 lg:max-w-2xl lg:pb-20 xl:pb-72">
	<Headroom
		offset={60}
		on:unpin={() => {
			if (!hidden) hidden = !hidden;
		}}>
		<nav class="relative">
			{#if $page.data.user.isAuthenticated}
				{#if isEmpty($page.data.user.profile)}
					<CreateProfileNotification />
				{/if}
			{/if}

			<div class="block xl:hidden">
				<!-- <MobileNavHat />
			<MobileEventNav {hidden} on:show={handleShow} /> -->
			</div>

			<div class="hidden bg-white pt-8 xl:block">
				<NavHat />
				<div class="py-8">
					<BaseNav />
				</div>
			</div>
		</nav>
	</Headroom>
</div>
