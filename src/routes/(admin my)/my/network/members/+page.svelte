<script>
	export let data;

	import shareWithMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';
	import SharingRow from '../../_components/SharingRow.svelte';

	const { sharing } = data;
	const { removeShareWith, shareWithByProfile } = shareWithMutationApi();

	async function shareBack({ detail: idx }) {
		const shareWithId = sharing[idx]?.sharingWithMe?.sharedWithMeProfile?.id ?? '';
		if (shareWithId) {
			const result = await shareWithByProfile({ id: shareWithId });
			if (result.isSuccess) {
				sharing[idx].meSharing = {
					notes: result.sharedWith.notes,
					...result.sharedWith.sharingWithProfile
				};
				location.reload();
			} else {
				throw new Error(`Share back failed: ${result.message}`);
			}
		}
	}

	async function removeShare({ detail: idx }) {
		const memberId = sharing[idx].meSharing.id;
		const result = await removeShareWith(memberId);
		if (memberId === result) {
			sharing[idx].meSharing = null;
			if (!sharing[idx].sharingWithMe) {
				// no share either way, remove
				sharing.splice(idx, 1);
			}
			location.reload();
		} else {
			throw new Error('Remove share result memberId mismatch');
		}
	}
</script>

<div>
	<div>
		<div class="flex justify-between">
			<div>
				<h2 class="text-xl font-bold leading-6 text-gray-900">Members You've Met</h2>
				<p class="mt-4 text-sm leading-5 text-gray-500">
					See who's sharing their information with you and who you're sharing with.
				</p>
			</div>
		</div>

		<div class="px-4 py-8">
			<div class="grid grid-cols-7 gap-4 p-4">
				<div class="col-span-3">
					<span class="text-lg font-semibold text-gray-900">Who is Sharing With Me</span>
				</div>
				<div class="col-span-3">
					<span class="text-lg font-semibold text-gray-900">Who I'm Sharing With</span>
				</div>
			</div>

			<div class="overflow-hidden bg-white shadow sm:rounded-md">
				<ul class="divide-y divide-gray-200">
					{#each sharing as share, idx (share.index)}
						<li>
							<SharingRow
								{share}
								rowIndex={idx}
								on:shareBack={shareBack}
								on:stopSharing={removeShare} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
