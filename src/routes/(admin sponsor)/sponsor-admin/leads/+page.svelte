<script>
	import { Standard as StandardLink } from '$elements/links';
	import { events } from '$lib/config.public';
</script>

<div class="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
	<h1 class="mt-2 text-xl font-bold leading-6 text-thatBlue-800">THAT Contact Exchange</h1>
	<p>Select an event</p>

	<div class="mt-10 flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-8 sm:space-y-0">
		<StandardLink href="/sponsor-admin/leads/{events.next.wi.id}">Wisconsin</StandardLink>
		<StandardLink href="/sponsor-admin/leads/{events.next.tx.id}">Texas</StandardLink>
	</div>
</div>
