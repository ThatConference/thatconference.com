<script>
	export let event;
	export let hidden;

	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$elements/actions';
	import { StandardShell } from '$elements/buttons';

	import MobileUsersProfile from '$components/navigation/_components/MobileUsersProfile.svelte';
	import NavLink from '../_components/NavLink.svelte';

	const dispatch = createEventDispatcher();

	function buildUrl(page) {
		return `/${event.slug}/${page}/`;
	}

	function buildAnchorLink(anchor) {
		return `/${event.slug}#${anchor}`;
	}
</script>

<div
	use:clickOutside
	on:click_outside={() => dispatch('show', true)}
	class="relative bg-white py-6">
	<div class="mx-8 flex items-center justify-between">
		<!-- logo -->
		<div class="cursor">
			<a href={`/${event.slug}`}>
				<img class="h-16" src="/images/ThatConferenceLogo.svg" alt="THAT Logo" />
			</a>
		</div>

		<!-- button -->
		<div>
			{#if hidden}
				<button
					type="button"
					class="rounded-md p-2
					text-gray-600 transition duration-150 ease-in-out
					hover:bg-gray-100 hover:text-gray-500
					focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
					on:click|preventDefault={() => dispatch('show', false)}>
					<svg class="h-10 w-12" stroke="currentColor" fill="none" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			{:else}
				<button
					type="button"
					class="rounded-md p-2
					text-gray-600 transition duration-150 ease-in-out
					hover:bg-gray-100 hover:text-gray-500
					focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
					on:click|preventDefault={() => dispatch('show', true)}>
					<svg class="h-10 w-12" stroke="currentColor" fill="none" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			{/if}
		</div>
	</div>

	{#if !hidden}
		<div class="mx-4 mt-6">
			<div class=" border-t">
				<div class="flex w-full flex-col space-y-2 py-6 text-base font-medium">
					<NavLink on:click={() => dispatch('show', true)} href={buildUrl('tickets')}
						>Tickets</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildUrl('speakers')}
						>Speakers</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildUrl('schedule')}
						>Schedule</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildUrl('attendees')}
						>Attendees</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildUrl('sponsors')}
						>Sponsors</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildAnchorLink('dates')}
						>Dates</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildAnchorLink('faq')}
						>FAQ</NavLink>
					<NavLink on:click={() => dispatch('show', true)} href={buildUrl('travel')}
						>Travel</NavLink>
				</div>

				<div class="py-6">
					<div>
						{#if $page.data.user.isAuthenticated}
							<MobileUsersProfile darkMode={true} />
						{:else}
							<StandardShell>
								<div class="px-4 py-2">
									<a rel="external" href="/login/">Log in</a>
								</div>
							</StandardShell>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
