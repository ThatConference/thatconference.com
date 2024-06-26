<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { useMachine } from '@xstate/svelte';

	import { debug } from '$lib/config.public';
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import Hero from '../_components/_Hero.svelte';
	import FeaturedMembers from '../_components/_FeaturedMembers.svelte';
	import Goals from '../_components/_Goals.svelte';
	import Followers from '../_components/_Followers.svelte';
	import CTA from '../_components/_CTA.svelte';
	import JobListings from '../_components/_JobListings.svelte';
	import FeaturedSessions from '../_components/_FeaturedSessions.svelte';
	import PartnerCta from '../_components/_PartnerCta.svelte';
	import { Action as ActionModal } from '$elements/modals';
	import { Standard as StandardLink } from '$elements/links';
	import createMachine from '../_machines/partner';
	import ShareWithSponsorModal from '../_components/ShareWithSponsor.svelte';

	const { partner } = $page.params;
	const eventId = $page.url.searchParams.get('eventId');

	const { state, send } = useMachine(createMachine(partner), {
		devTools: debug.xstate
	});

	let metaTags;

	// todo - we need to look into how things now load
	$: if (['profileLoaded'].some($state.matches)) {
		const { profile } = $state.context;

		metaTags = ((title = `${profile.companyName} - sponsor spotlight.`) => ({
			title,
			tags: seoMetaTags({
				title,
				description: `${profile.aboutUs}`,
				openGraph: {
					type: 'website',
					url: `https://thatconference.com/sponsors/${partner}`
				}
			})
		}))();
	}

	$: if ($page.data.user.isAuthenticated) {
		send('AUTHENTICATED', { status: true });
	} else {
		send('AUTHENTICATED', { status: false });
	}

	let delayCounter = 200;

	function getDelay(reset = false) {
		let current = delayCounter;
		delayCounter = delayCounter + 200;

		if (reset) delayCounter = 200;
		return current;
	}
	let showShareWithSponsorModal = false;
</script>

<Seo title={metaTags?.title || ''} tags={metaTags?.tags || []} />

{#if ['profileLoaded'].some($state.matches)}
	{#if $state?.context?.profile?.isActiveSponsor === false}
		<ActionModal
			title="Currently Not Sponsoring"
			text="This partner isn't currently an active sponsor.">
			<div class="flex justify-center space-x-6">
				<StandardLink href="/sponsors">Current Sponsors</StandardLink>
				<StandardLink href="/sponsorships/apply">Become a Sponsor</StandardLink>
			</div>
		</ActionModal>
	{/if}
	{#if showShareWithSponsorModal}
		<ShareWithSponsorModal
			on:HIDE_SHARE_SPONSOR_MODAL={() => (showShareWithSponsorModal = false)}
			partner={$state.context.profile}
			{eventId} />
	{/if}

	<div class="flex flex-col">
		<div in:fade={{ delay: getDelay() }}>
			<Hero
				partner={$state.context.profile}
				isFollowing={$state.context.isFollowing}
				wasContactExchanged={$state.context.leadAdded}
				{eventId}
				on:TOGGLE_FOLLOW={() =>
					send('FOLLOW', {
						id: $state.context.profile.id
					})}
				on:SHOW_SHARE_SPONSOR_MODAL={() => (showShareWithSponsorModal = true)}
				on:HIDE_SHARE_SPONSOR_MODAL={() => (showShareWithSponsorModal = false)} />
		</div>

		{#if $state?.context?.profile?.members?.length > 0}
			<div in:fade={{ delay: getDelay() }}>
				<FeaturedMembers members={$state.context.profile.members} />
			</div>
		{/if}

		{#if $state?.context?.profile?.goals?.length > 0}
			<div in:fade={{ delay: getDelay() }}>
				<Goals goals={$state.context.profile.goals} />
			</div>
		{/if}

		{#if $state?.context?.profile?.callToActionSpotlight}
			<div in:fade={{ delay: getDelay() }}>
				<PartnerCta
					action={$state.context.profile.callToActionSpotlight}
					url={$state.context.profile.callToActionUrl} />
			</div>
		{/if}

		{#if $state?.context?.profile?.sessions?.length > 0}
			<div in:fade={{ delay: getDelay() }}>
				<FeaturedSessions sessions={$state.context.profile.sessions} />
			</div>
		{/if}

		{#if $state?.context?.profile?.jobListings?.length > 0}
			<div in:fade={{ delay: getDelay() }}>
				<JobListings listings={$state.context.profile.jobListings} />
			</div>
		{/if}

		<div in:fade={{ delay: getDelay(true) }}>
			<div in:fade={{ delay: getDelay() }}>
				<Followers followers={$state.context.followers} />
			</div>

			<CTA
				partner={$state.context.profile}
				isFollowing={$state.context.isFollowing}
				{eventId}
				on:TOGGLE_FOLLOW={() =>
					send('FOLLOW', {
						id: $state.context.profile.id
					})}
				on:SHOW_SHARE_SPONSOR_MODAL={() => (showShareWithSponsorModal = true)}
				on:HIDE_SHARE_SPONSOR_MODAL={() => (showShareWithSponsorModal = false)} />
		</div>
	</div>
{/if}
