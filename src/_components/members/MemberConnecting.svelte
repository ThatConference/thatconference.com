<script>
	export let member;

	import { getContext } from 'svelte';
	import { Heart, ArrowDown, ArrowUp } from 'lucide-svelte';
	import { Standard as StandardButton } from '$elements/buttons';
	import MemberConnectModal from '$components/members/MemberConnectModal.svelte';

	const { id: memberId } = member;
	const memberSharing = getContext('memberSharing') ?? [];
	const meFollowing = getContext('meFollowing') ?? [];
	const { isMeSharingWithMember, isMemberSharingWithMe, shareMyInfoWith, stopSharingWith } =
		memberSharing;

	const shareWith = async () => {
		await shareMyInfoWith(memberId);
		meSharingWith = isMeSharingWithMember(memberId);
	};
	const stopShareWith = async () => {
		await stopSharingWith(memberId);
		meSharingWith = isMeSharingWithMember(memberId);
	};

	$: meSharingWith = isMeSharingWithMember(memberId);
	$: sharingWithMe = isMemberSharingWithMe(memberId);
	$: isFollowing = $meFollowing?.includes(memberId) ?? false;
	let sharingWithMeData =
		$memberSharing.find((m) => m?.sharingWithMe?.sharedWithMeProfile?.id === memberId) ?? {};

	let notes = sharingWithMeData?.meSharing?.notes ?? '';

	let showMemberConnectModal = false;
</script>

{#if showMemberConnectModal}
	<MemberConnectModal
		{...member}
		{sharingWithMe}
		{...sharingWithMeData.sharingWithMe}
		bind:meSharingWith
		bind:isFollowing
		bind:notes
		on:closeDetail={() => (showMemberConnectModal = false)}
		on:STOP_SHARING={() => stopShareWith()}
		on:START_SHARING={() => shareWith()}></MemberConnectModal>
{/if}
<div class="group">
	<StandardButton on:click={() => (showMemberConnectModal = true)}>
		<div class="flex items-center space-x-4">
			<span class="uppercase">Connect</span>

			<div class="flex text-gray-300">
				<span class="group-hover:text-white" class:text-that-blue={isFollowing}>
					<Heart />
				</span>
				<span class="group-hover:text-white" class:text-that-blue={meSharingWith}>
					<ArrowUp />
				</span>
				<span class="group-hover:text-white" class:text-that-blue={sharingWithMe}>
					<ArrowDown />
				</span>
			</div>
		</div>
	</StandardButton>
</div>
