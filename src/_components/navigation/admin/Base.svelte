<script>
	import UserProfile from '../_components/UserProfile.svelte';
	import NavLink from '../_components/NavLink.svelte';
</script>

<div class="relative">
	<div class="mx-auto flex items-center justify-around p-8">
		<div>
			<a href="/admin" class="flex">
				<div>
					<img class="w-32" src="/images/ThatConferenceLogo.svg" alt="THAT Logo" />
				</div>
			</a>
		</div>

		<div class="flex space-x-8 text-lg font-bold">
			<NavLink href="/admin/events">Events</NavLink>
			<NavLink href="/admin/speakers">Speakers</NavLink>
			<NavLink href="/admin/sessions">Sessions</NavLink>
			<NavLink href="/admin/sponsors">Sponsors</NavLink>
			<NavLink href="/">THAT Conference</NavLink>

			<div class="flex w-full flex-1 justify-end space-x-4">
				<UserProfile />
			</div>
		</div>
	</div>
</div>
