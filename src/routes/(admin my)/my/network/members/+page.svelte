<script>
	import { Standard as StandardLink } from '$elements/links';
	import RowButton from '../../_elements/RowButton.svelte';
	import shareWithMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';

	export let data;

	const { removeShareWith, shareWithByProfile } = shareWithMutationApi();

	const { sharing } = data;
	const shareBack = async (idx) => {
		const shareWithId = sharing[idx]?.sharingWithMe?.sharedWithMeProfile?.id ?? '';
		if (shareWithId) {
			const result = await shareWithByProfile({ id: shareWithId });
			if (result.isSuccess) {
				sharing[idx].meSharing = {
					notes: result.sharedWith.notes,
					...result.sharedWith.sharingWithProfile
				};
			} else {
				// TODO: RETURN ERROR TO USER SOMEHOW!
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
			if (sharing[idx].sharingWithMe) {
				// Can share back from this page
				sharing[idx].meSharing = null;
			} else {
				// no share either way, remove
				// null set needed first to invoke reactively
				sharing[idx].meSharing = null;
				sharing.splice(idx, 1);
			}
		} else {
			throw new Error('Remove share result memberId mismatch');
		}
	};
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
							<!-- <a href role="button" on:click={() => go()} class="block hover:bg-gray-50"> -->
							<div class="flex items-center px-4 py-4 sm:px-6">
								<div class="flex min-w-0 flex-1 items-center">
									<!-- <div class="flex-shrink-0">
										<span>✔️</span>
									</div> -->

									<div class="min-w-0 flex-1 items-center px-4 md:grid md:grid-cols-2 md:gap-4">
										<div>
											{#if share.sharingWithMe}
												<p class="truncate text-sm font-medium text-thatBlue-800">
													{`${share.sharingWithMe.firstName} ${share.sharingWithMe.lastName}`}
												</p>
												<p class="mt-0 text-sm text-gray-500">{share.sharingWithMe.email}</p>
											{:else}
												<p class="truncate text-sm font-medium text-thatBlue-800">
													Not sharing with you
												</p>
												<!-- <p class="mt-0 text-sm text-gray-500">{share.sharingWithMe.email}</p> -->
											{/if}
										</div>
										<!-- <div class="hidden md:block"> -->
										<div class="mt-4 md:mt-0">
											<div class="flex flex-1 space-x-4">
												{#if share.meSharing}
													<div>
														<p class="truncate text-sm font-medium text-thatBlue-800">
															{`${share.meSharing.firstName} ${
																share.meSharing.lastName ?? share.meSharing.lastInitial
															}`}
														</p>
														<p class="mt-0 truncate text-sm text-gray-500">
															{share.meSharing.notes}
														</p>
													</div>
													<div>
														<RowButton on:click={() => remove(idx)}>Remove</RowButton>
													</div>
													<!-- {:else if !share.meSharing && !share.sharingWithMe}
													<div class="flex flex-shrink-0"></div> -->
												{:else}
													<div class="flex flex-shrink-0">
														<RowButton on:click={() => shareBack(idx)}>Share Back</RowButton>
													</div>
												{/if}
											</div>
										</div>
									</div>
								</div>
								<div>
									<!-- Heroicon name: solid/chevron-right -->
									<svg
										class="h-5 w-5 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clip-rule="evenodd" />
									</svg>
								</div>
							</div>
							<!-- </a> -->
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>
