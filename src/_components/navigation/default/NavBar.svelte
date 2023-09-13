<script>
	import { page } from '$app/stores';
	import lodash from 'lodash';

	import Hamburger from '$elements/svgs/Hamburger.svelte';

	import CreateProfileNotification from '$components/notifications/CreateProfile.svelte';
	import Base from './Base.svelte';
	import Mobile from './Mobile.svelte';

	const { isEmpty } = lodash;
	let hidden = true;
</script>

<!-- <div class="z-10">
	
	<div class="block xl:hidden">
		<Mobile {hidden} on:show={handleShow} />
	</div>
	
	<div class="hidden xl:block">
		<Base />
	</div>
</div> -->

{#if $page.data.user.isAuthenticated}
	{#if isEmpty($page.data.user.profile)}
		<CreateProfileNotification />
	{/if}
{/if}

<div class="relative z-20">
	<div
		class="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition xl:hidden"
		class:hidden
		class:block={!hidden}>
		<div class="rounded-xl shadow-md">
			<div
				class="overflow-hidden rounded-xl bg-slate-50 ring-1 ring-black ring-opacity-5"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="main-menu">
				<div class="flex items-center justify-between px-5 pt-4">
					<div>
						<img class="h-8 w-auto" src="/images/THAT-Full-Wide.svg" alt="THAT Logo" />
					</div>
					<div class="-mr-2">
						<button
							type="button"
							class="inline-flex items-center justify-center rounded-md p-2
								text-gray-400 transition duration-150
								ease-in-out hover:bg-gray-100 hover:text-gray-500
								focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
							aria-label="Close menu"
							on:click|preventDefault={() => (hidden = !hidden)}>
							<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<div class="px-4 pb-3 pt-3">
					<Mobile />
				</div>
			</div>
		</div>
	</div>

	<nav>
		<div class="hidden xl:block">
			<Base />
		</div>

		<div class="flex items-center justify-between p-4 xl:hidden">
			<a data-sveltekit-prefetch href="/" aria-label="Home">
				<img class="h-10 w-auto" src="/images/THAT-Full-Wide.svg" alt="THAT Logo" />
			</a>

			<button
				class="inline-flex items-center justify-center rounded-md p-2
							text-gray-400 transition duration-150
							ease-in-out hover:bg-gray-100 hover:text-gray-500
							focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
				id="main-menu"
				aria-label="Main menu"
				aria-haspopup="true"
				on:click|preventDefault={() => (hidden = !hidden)}>
				<Hamburger />
			</button>
		</div>
	</nav>
</div>
