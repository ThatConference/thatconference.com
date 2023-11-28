<script>
	export let data;

	import { Standard as StandardLink } from '$elements/links';
	import shareWithMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';
	import SharingRow from '../../_elements/SharingRow.svelte';

	const { removeShareWith, shareWithByProfile } = shareWithMutationApi();
	const { sharing } = data;

	const shareBack = async (idx) => {
		const shareWithId = sharing[idx]?.sharingWithMe?.sharedWithMeProfile?.id ?? '';
		if (shareWithId) {
			const result = await shareWithByProfile({ id: shareWithId });
			console.log('shareBack, shareWithByProfile result:', result);
			if (result.isSuccess) {
				sharing[idx].meSharing = {
					notes: result.sharedWith.notes,
					...result.sharedWith.sharingWithProfile
				};
				location.reload();
			} else {
				throw new Error(`Share back failed: ${result.message}`);
			}
		} else {
			// return message: No id present (or something like that)
		}
	};
	const remove = async (idx) => {
		const memberId = sharing[idx].meSharing.id;
		const result = await removeShareWith(memberId);
		console.log('memberId, result', memberId, result);
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
	};

	function shareBackCallback(event) {
		return shareBack(event.detail);
	}
	function stopSharingCallback(event) {
		return remove(event.detail);
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
			<StandardLink href="/my/member-sharing">New Share</StandardLink>
		</div>

		<div class="px-4 py-8">
			<div class="flex items-center px-4 py-4 sm:px-6">
				<div class="flex min-w-0 flex-1 items-center">
					<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
						<div>
							<span class="text-lg font-semibold text-gray-900">Who is Sharing With Me</span>
						</div>
						<div>
							<span class="text-lg font-semibold text-gray-900">Who I'm Sharing With</span>
						</div>
					</div>
				</div>
			</div>

			<div class="overflow-hidden bg-white shadow sm:rounded-md">
				<ul class="divide-y divide-gray-200">
					{#each sharing as share, idx (share.index)}
						<li>
							<SharingRow
								{share}
								rowIndex={idx}
								on:shareBack={shareBackCallback}
								on:stopSharing={stopSharingCallback} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
