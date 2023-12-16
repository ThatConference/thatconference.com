<script>
	export let partner;
	export let eventId;

	console.log('🦛 partner', partner);
	import { Standard as StandardButton } from '$elements/buttons';
	import { Action as ActionModal } from '$elements/modals';
	import { createEventDispatcher } from 'svelte';
	import partnerLeadMutationApi from '$dataSources/api.that.tech/partner/leads/mutations';

	const dispatch = createEventDispatcher();
	const { companyName = '', id: partnerId } = partner;
	const { addLead } = partnerLeadMutationApi();

	const actionTitle = `Connect with ${companyName}`;
	const actionText = `By clicking the button below you agree to share your shared profile with <span class="font-bold">${companyName}</span>. 
		See what you're sharing in your 
		<a class="a-decorate" href="/my/profiles/primary">Shared Profile<a/>,
			located in your settings.`;

	function shareWithSponsorAction() {
		if (partnerId) {
			return addLead(partnerId, eventId).then(() => dispatch('HIDE_SHARE_SPONSOR_MODAL'));
		}
	}
</script>

<ActionModal title={actionTitle} text={actionText}>
	<div class="flex justify-center space-x-4">
		<StandardButton on:click={() => shareWithSponsorAction()}>Share with Sponsor</StandardButton>
		<StandardButton on:click={() => dispatch('HIDE_SHARE_SPONSOR_MODAL')}>Cancel</StandardButton>
	</div>
</ActionModal>
