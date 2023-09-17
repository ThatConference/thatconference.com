<script>
	export let event;

	import { Shell as ShellButton, StandardShell } from '$elements/buttons';
	import NavLink from './components/navLink.svelte';

	function buildUrl(page) {
		return `/${event.slug}/${page}/`;
	}

	function buildAnchorLink(anchor) {
		return `/${event.slug}#${anchor}`;
	}
</script>

<div class=" bg-white py-12">
	<div class="mx-auto flex max-w-screen-xl items-center justify-between">
		<!-- logo -->
		<div class="flex items-center">
			<div class="cursor">
				<a data-sveltekit-prefetch href="/{event.slug}/">
					<img class="h-16" src="/images/Trees-Solid.svg" alt="THAT Logo" />
				</a>
			</div>

			<!-- links -->
			<div class="ml-8 flex space-x-4 text-lg font-bold">
				<NavLink href={buildUrl('speakers')}>Speakers</NavLink>
				<NavLink href={buildUrl('schedule')}>Schedule</NavLink>
				<NavLink href={buildUrl('sponsors')}>Sponsors</NavLink>
				<NavLink href={buildAnchorLink('dates')}>Dates</NavLink>
				<NavLink href={buildUrl('travel')}>Travel</NavLink>
				<NavLink href={buildAnchorLink('fieldGuide')}>Field Guide</NavLink>
			</div>
		</div>

		<div class="flex space-x-4">
			<ShellButton>
				<div class="px-4 py-2">
					<a href="/sponsorships/apply/#prospectus">Sponsor Today</a>
				</div>
			</ShellButton>
			<StandardShell>
				<div class="px-4 py-2">
					<a href={buildUrl('tickets')}>Purchase Tickets</a>
				</div>
			</StandardShell>
		</div>
	</div>
</div>
