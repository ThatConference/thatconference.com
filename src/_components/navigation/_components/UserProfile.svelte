<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { user as userIcon } from '$components/svelte-awesome-icons';
	import Icon from 'svelte-awesome';
	import lodash from 'lodash';
	import { clickOutside } from '$elements/actions';

	const { isEmpty } = lodash;
	let visible = false;
</script>

<div class="relative">
	<div>
		<button
			type="button"
			id="user-menu"
			class="flex h-10 w-10 max-w-xs items-center justify-center rounded-full text-sm duration-150 ease-in-out"
			class:shadow-solid={visible}
			aria-label="User menu"
			aria-haspopup="true"
			on:click|preventDefault={() => (visible = !visible)}>
			{#if $page.data.user.isAuthenticated}
				{#if isEmpty($page.data.user.profile)}
					<div>
						<Icon data={userIcon} class="h-8 w-8 rounded-full" />
						<span class="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-red-400" />
					</div>
				{:else if $page.data.user.profile?.profileImage}
					<img
						class="h-10 w-10 rounded-full"
						src="{$page.data.user.profile.profileImage}?w=256&h=256&fit=crop"
						alt="" />
				{:else}
					<Icon data={userIcon} class="h-8 w-8 rounded-full" />
				{/if}
			{:else}
				<div class="transform transition duration-500 ease-in-out hover:scale-110">
					<Icon data={userIcon} class="h-8 w-8 rounded-full" />
				</div>
			{/if}
		</button>
	</div>

	{#if visible}
		<div use:clickOutside on:click_outside={() => (visible = false)}>
			{#if $page.data.user.isAuthenticated}
				{#if isEmpty($page.data.user.profile)}
					<div class="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg" in:fade>
						<div class="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
							<a
								href="/my/profiles/primary"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Create Profile
							</a>

							<a
								rel="external"
								href="/logout"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Logout
							</a>
						</div>
					</div>
				{:else}
					<div class="absolute right-0 mt-2 w-64 origin-top-right rounded-md shadow-lg" in:fade>
						<div class="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
							<div class="block border-b px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								<a href="/my/profiles/primary" on:click={() => (visible = false)}>
									<p>{$page.data.user.profile.firstName} {$page.data.user.profile.lastName}</p>
									<p class="truncate pt-2">{$page.data.user.profile.email}</p>
								</a>
							</div>

							<a
								href="/my/profiles/primary"
								on:click={() => (visible = false)}
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								My Profiles
							</a>

							<a
								data-sveltekit-prefetch
								href="/my/network"
								on:click={() => (visible = false)}
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								My Network
							</a>

							<a
								data-sveltekit-prefetch
								href="/my/favorites"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								My Favorites
							</a>

							<a
								data-sveltekit-prefetch
								href="/my/submissions"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								My Submissions
							</a>

							<a
								href="/my/notification-preferences"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								My Notification Preferences
							</a>

							<a
								href="/my/settings/badges"
								on:click={() => (visible = false)}
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Orders, Tickets, Membership
							</a>

							<a
								rel="external"
								href="/logout"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Logout
							</a>
						</div>
					</div>
				{/if}
			{:else}
				<div in:fade class="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg">
					<div class="rounded-md bg-white py-1 ring-1 ring-black ring-opacity-5">
						<a
							rel="external"
							href="/login"
							class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
							Login
						</a>
						<a
							rel="external"
							href="/signup"
							class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
							Sign Up
						</a>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
