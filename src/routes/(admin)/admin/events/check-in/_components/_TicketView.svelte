<script>
	export let registrations = [];

	import Fuse from 'fuse.js'; // https://fusejs.io/api/options.html

	import Toggle from '$elements/Toggle.svelte';

	import Ticket from './_Ticket.svelte';
	// todo.. need a better top level reporting.. this isn't a valid ssr component? not sure what that means
	// import SemiCircle from './_SemiCircle.svelte';

	const searchOptions = {
		// isCaseSensitive: false,
		// includeScore: true,
		shouldSort: true,
		// includeMatches: false,
		findAllMatches: false,
		minMatchCharLength: 3,
		// location: 0,
		threshold: 0.2,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		keys: [
			'allocatedTo.firstName',
			'allocatedTo.lastName',
			'allocatedTo.email',
			'purchasedBy.firstName',
			'purchasedBy.lastName',
			'purchasedBy.email',
			'product.name'
		]
	};

	let registrationsFiltered = [];
	let registrationsSearched = [];
	let searchterm = '';
	let viewAll = false;

	$: if (searchterm?.length < searchOptions.minMatchCharLength || searchterm === '') {
		registrationsSearched = registrationsFiltered;
	} else {
		registrationsSearched = fuse.search(searchterm).map((r) => r.item);
	}

	$: if (viewAll) {
		registrationsFiltered = [...registrations];
	} else {
		registrationsFiltered = registrations.filter((x) => !x.hasCheckedIn);
	}

	$: fuse = new Fuse(registrations, searchOptions);
</script>

<section>
	<div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-8 sm:space-y-0">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			autofocus
			class="form-input rounded-md border"
			bind:value={searchterm}
			placeholder="type to search..." />

		<slot name="toggle" />

		<Toggle title="All" subTitle="Regardless of status" bind:checked={viewAll} />
	</div>

	<div class="mt-12">
		<ul class="space-y-4">
			{#each registrationsSearched as ticket (ticket.id)}
				<li>
					<Ticket {ticket} />
				</li>
			{/each}
		</ul>
	</div>
</section>
