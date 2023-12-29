<script>
	import { page } from '$app/stores';
	import { Standard as StandardLink } from '$elements/links';

	import MobileUsersProfile from '../_components/MobileUsersProfile.svelte';

	import links from './links';
</script>

<div class="flex flex-col space-y-2">
	{#each links as l}
		<a href={l.href}>
			<div
				class="flex rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-that-blue hover:text-white focus:bg-that-blue focus:text-white focus:outline-none">
				{l.text}
			</div>
		</a>
	{/each}
</div>

<div class="my-4 flex flex-col space-y-5">
	{#if $page.data.user.isAuthenticated}
		<MobileUsersProfile />
	{:else}
		<StandardLink rel="external" href="/login">Log in</StandardLink>
	{/if}
</div>
