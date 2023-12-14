<script>
	export let member;

	import { getContext } from 'svelte';
	import { Heart, ChevronDownCircle, ChevronUpCircle } from 'lucide-svelte';
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
<div>
	<StandardButton on:click={() => (showMemberConnectModal = true)}>
		<div class="flex items-center space-x-2">
			<span class="">Connect</span>
			<div>
				<ChevronUpCircle class={meSharingWith ? 'fill-thatOrange-400' : ''} />
				<ChevronDownCircle class={sharingWithMe ? 'fill-thatOrange-400' : ''} />
			</div>
			<Heart class={isFollowing ? 'fill-red-500' : ''} />
		</div>
	</StandardButton>
</div>
