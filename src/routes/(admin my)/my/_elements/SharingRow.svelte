<script>
	export let rowIndex;
	export let share;

	import { createEventDispatcher } from 'svelte';
	import RowButton from './RowButton.svelte';
	import ShareDetailsModal from './ShareDetailsModal.svelte';

	const dispatch = createEventDispatcher();
	let showDetailsModal = false;
	let notes = share.meSharing?.notes ?? '';
	let shareWithId = share.meSharing?.id ?? null;
	let sharingWithMeData = {};
	if (share.sharingWithMe) {
		sharingWithMeData = {
			...share.sharingWithMe,
			isSharingWithMe: true
		};
	} else {
		sharingWithMeData = {
			...share.meSharing,
			isSharingWithMe: false
		};
	}
</script>

{#if showDetailsModal && share.meSharing}
	<ShareDetailsModal
		{...sharingWithMeData}
		bind:notes
		bind:shareWithId
		{rowIndex}
		on:closeDetail={() => (showDetailsModal = false)}
		on:stopSharing={(event) => dispatch('stopSharing', event.detail)}></ShareDetailsModal>
{/if}
<div class="flex items-center px-4 py-4 sm:px-6">
	<div class="flex min-w-0 flex-1 items-center">
		<div class="min-w-0 flex-1 items-center px-4 md:grid md:grid-cols-2 md:gap-4">
			<div>
				{#if share.sharingWithMe}
					<p class="truncate text-sm font-medium text-thatBlue-800">
						{`${share.sharingWithMe.firstName} ${share.sharingWithMe.lastName}`}
					</p>
					<p class="mt-0 text-sm text-gray-500">{share.sharingWithMe.email}</p>
				{:else}
					<p class="truncate text-sm font-medium text-thatBlue-800">Not sharing with you</p>
				{/if}
			</div>
			<div class="mt-4 md:mt-0">
				<div class="flex justify-start space-x-4">
					{#if share.meSharing}
						<div class="max-w-full">
							<p class="truncate text-sm font-medium text-thatBlue-800">
								{`${share.meSharing.firstName} ${
									share.meSharing.lastName ?? share.meSharing.lastInitial
								}`}
							</p>
							<p class="mt-0 truncate text-sm text-gray-500">
								{notes}
							</p>
						</div>
					{:else}
						<div>
							<p>
								<RowButton on:click={() => dispatch('shareBack', rowIndex)}>Share Back</RowButton>
							</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div>
		<!-- Heroicon name: solid/chevron-right -->
		{#if share.meSharing}
			<button on:click={() => (showDetailsModal = true)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5 text-thatBlue-500 hover:text-thatOrange-500">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				</svg>
			</button>
		{/if}
	</div>
</div>
