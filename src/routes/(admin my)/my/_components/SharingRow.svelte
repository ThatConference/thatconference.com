<script>
	export let rowIndex;
	export let share;

	import { createEventDispatcher } from 'svelte';
	import { Share2, Settings } from 'lucide-svelte';

	import { Standard as StandardButton } from '$elements/buttons';

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
<div class="flex items-center justify-between px-6 py-4">
	<div class="grid w-full grid-cols-7 gap-4 px-4">
		<div class="col-span-3">
			{#if share.sharingWithMe}
				<div>
					<p class="truncate text-sm font-medium text-thatBlue-800">
						{`${share.sharingWithMe.firstName} ${share.sharingWithMe.lastName}`}
					</p>
					<p class="mt-0 text-sm text-gray-500">{share.sharingWithMe.email}</p>
				</div>
			{:else}
				<div>
					<p class="truncate text-sm font-medium text-thatBlue-800">Not sharing with you</p>
				</div>
			{/if}
		</div>

		<div class="col-span-3 ml-4">
			{#if share.meSharing}
				<div>
					<p class="truncate text-sm font-medium text-thatBlue-800">
						{`${share.meSharing.firstName} ${
							share.meSharing.lastName ?? share.meSharing.lastInitial
						}`}
					</p>
					<p class="truncate text-sm text-gray-500">
						{notes}
					</p>
				</div>
			{:else}
				<div>
					<StandardButton on:click={() => dispatch('shareBack', rowIndex)}>
						<div class="flex items-center space-x-4">
							<Share2 />
							<span>Share Back</span>
						</div>
					</StandardButton>
				</div>
			{/if}
		</div>
		<div class="flex place-self-center">
			{#if share.meSharing}
				<button
					class="text-thatBlue-500 hover:text-thatBlue-300"
					on:click={() => (showDetailsModal = true)}>
					<Settings />
				</button>
			{/if}
		</div>
	</div>
</div>
