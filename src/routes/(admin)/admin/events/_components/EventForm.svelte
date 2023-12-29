<script>
	export let sForm;

	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import { AlertOctagon } from 'lucide-svelte';

	import { Shell, DisabledShell } from '$elements/buttons';
	import InputDateTime from '../_components/InputDateTime.svelte';
	import InputText from '../_components/InputText.svelte';
	import InputTextArea from '../_components/InputTextArea.svelte';
	import InputBoolean from '../_components/InputBoolean.svelte';

	const formInstance = superForm(sForm, {
		dataType: 'json',
		flashMessage: {
			module: flashModule
		},
		onUpdated: () => {
			window.scrollTo(0, 0);
		}
	});

	const { form, enhance, allErrors } = formInstance;

	const dates = [
		{ label: 'Event Start Date', id: 'startDate' },
		{ label: 'Event End datetime-local', id: 'endDate' },
		{ label: 'Ticket Sales On Sale Starting', id: 'ticketsOnSaleFrom' },
		{ label: 'Ticket Sales On Sale Until', id: 'ticketsOnSaleUntil' },
		{ label: 'Call For Speakers Opens On', id: 'callForSpeakersOpenDate' },
		{ label: 'Call For Speakers Closes At', id: 'callForSpeakersCloseDate' },
		{ label: 'Online Call For Speakers Opens On', id: 'callForOnSpeakersOpenDate' },
		{ label: 'Online Call For Speakers Closes At', id: 'callForOnSpeakersCloseDate' },
		{ label: 'Voting Open Start Date', id: 'voteOpenDate' },
		{ label: 'Voting Closes On', id: 'voteCloseDate' }
	];
</script>

<form use:enhance method="POST">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-28">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Overall Event Metadata</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				This is the high level meta data about the event as shown on the platform.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-4">
					<InputText sForm={formInstance} label="Event Name" field="name" />
				</div>

				<div class="col-span-full">
					<InputText sForm={formInstance} field="slogan" label="Event Sloan" />
				</div>

				<div class="col-span-full">
					<InputTextArea
						sForm={formInstance}
						field="description"
						label="Event Description"
						description="todo: where will this be seen and used." />
				</div>

				<div class="sm:col-span-2">
					<InputText sForm={formInstance} label="Website Address" field="website" />
				</div>

				<div class="sm:col-span-2">
					<InputText sForm={formInstance} label="Email Address" field="email" />
				</div>

				<div class="sm:col-span-2">
					<InputText sForm={formInstance} label="Phone Number" field="phoneNumber" />
				</div>
			</div>
		</div>

		<div class="border-b border-gray-900/10 pb-28">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Platform Data</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">Tech details about the event.</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<InputText sForm={formInstance} label="Platform Community" field="community" />
				</div>

				<div class="sm:col-span-3">
					<InputText sForm={formInstance} label="Event Type" field="type" />
				</div>

				<div class="sm:col-span-3">
					<InputText sForm={formInstance} label="Website Slug" field="slug" />
				</div>

				<div class="sm:col-span-3">
					<InputText sForm={formInstance} label="Website Logo" type="url" field="logo" />
				</div>

				<div class="sm:col-span-3">
					<InputBoolean
						bind:value={$form.isActive}
						title="Is Active"
						description="Is this event currently Active, or being setup?" />
				</div>

				<div class="sm:col-span-3">
					<InputBoolean
						bind:value={$form.isFeatured}
						title="Is Featured"
						description="Should this event be featured on the website?" />
				</div>
			</div>
		</div>

		<div class="border-b border-gray-900/10 pb-28">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Tickets and Access</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">Who has access to the event</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<InputBoolean
						bind:value={$form.isTicketRequiredToJoin}
						title="Is A Ticket Required To Join" />
				</div>

				<div class="sm:col-span-3">
					<InputBoolean bind:value={$form.canMembershipJoin} title="Can Paying Members Join?" />
				</div>

				<div class="sm:col-span-3">
					<InputBoolean
						bind:value={$form.isTicketRequiredToMutate}
						title="Is A Ticket Required To Mutate"
						description="TODO: need more here?" />
				</div>

				<div class="sm:col-span-3">
					<InputBoolean
						bind:value={$form.canMembershipMutate}
						title="Can Paying Members Mutate"
						description="todo: need more here" />
				</div>
			</div>
		</div>

		<div class="border-b border-gray-900/10 pb-28">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Milestone Dates</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				All of the major milestones our event will have.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-4">
					<InputText sForm={formInstance} label="Event Year" type="number" field="year" />
				</div>

				{#each dates as date}
					<div class="sm:col-span-3">
						<InputDateTime sForm={formInstance} field={date.id} label={date.label} />
					</div>
				{/each}
			</div>
		</div>

		<div class="border-b border-gray-900/10 pb-28">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Orders and Stripe</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">asdfasdfasdfasdf</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<InputText
						sForm={formInstance}
						type="url"
						label="Checkout Success URL"
						field="checkoutSuccess" />
				</div>

				<div class="sm:col-span-3">
					<InputText
						sForm={formInstance}
						type="url"
						label="Cancel Checkout URL"
						field="checkoutCancel" />
				</div>

				<div class="sm:col-span-3">
					<InputText
						sForm={formInstance}
						label="Email Template on Successful Purchase"
						field="emailTemplateTicketPurchased" />
				</div>
			</div>
		</div>

		<div class="mt-24">
			{#if $allErrors.length}
				<div class="flex flex-col space-y-3 text-red-500">
					{#each $allErrors as error}
						<div class="flex items-center space-x-2">
							<AlertOctagon />
							<p class="font-medium leading-5">{error.messages}, field: {error.path}</p>
						</div>
					{/each}
				</div>
			{/if}

			<div class="flex justify-end space-x-4">
				{#if $allErrors.length > 0}
					<DisabledShell>
						<div class="px-8 py-2 font-medium">Save Event</div>
					</DisabledShell>
				{:else}
					<button type="submit">
						<Shell>
							<div class="px-8 py-2 font-medium">Save Event</div>
						</Shell>
					</button>
				{/if}
			</div>
		</div>
	</div>
</form>
