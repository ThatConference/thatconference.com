<script>
	/*
		this is duplicated ( sorta ) code with the profile emergency contact form. 
		Right now this one acts only client side with no post backs.
	*/

	export let currentEmergencyContact;

	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { getFlash } from 'sveltekit-flash-message';
	import { AlertOctagon } from 'lucide-svelte';
	import Select from 'svelte-select';

	import membersMutationApi from '$dataSources/api.that.tech/members/mutations';
	import { DisabledShell, Shell } from '$elements/buttons';
	import emergencyContactSchema from '$lib/formSchemas/emergencyContact';

	const flash = getFlash(page);
	const dispatch = createEventDispatcher();

	const yesNoDropDown = [
		{ label: 'No', value: false },
		{ label: 'Yes', value: true }
	];

	let nextStep = false;

	function handleNextStep() {
		dispatch('submit-step');
	}

	const { form, enhance, constraints, errors, allErrors } = superForm(
		superValidateSync(currentEmergencyContact, emergencyContactSchema),
		{
			dataType: 'json',
			validators: emergencyContactSchema,
			SPA: true,
			taintedMessage: null, // todo - @csell phone number formatting taints the form.
			onUpdate: async ({ form }) => {
				if (form.valid) {
					const { updateEmergencyContact } = membersMutationApi();

					try {
						await updateEmergencyContact(form.data);

						// We can head to the next step
						nextStep = true;

						const successMessage = {
							type: 'success',
							message: `Your emergency contact information has been updated.`
						};

						$flash = successMessage;
						return { form };
					} catch (error) {
						const errorMessage = {
							type: 'error',
							message: `Whoops!!! ${error.message}`
						};

						$flash = errorMessage;
						return { form };
					}
				}
			}
		}
	);

	let relationshipSelect = $form.relationship;
	let travelingWithYouSelect = yesNoDropDown.find((i) => i.value == $form.travelingWithYou);

	let formattedPhoneNumber = '';
	function formatPhoneNumber(event) {
		// Remove all non-numeric characters from the input
		$form.phoneNumber = event.target.value.replace(/\D/g, '');

		// Always add a plus sign before the number
		$form.phoneNumber = '+' + $form.phoneNumber;

		// Format the phone number nicely
		if ($form.phoneNumber.startsWith('+1')) {
			// Format as a US number
			formattedPhoneNumber = $form.phoneNumber.replace(
				/^(\+\d{1})(\d{3})(\d{3})(\d{4})$/,
				'$1 ($2) $3-$4'
			);
		} else {
			// Format as an international number
			formattedPhoneNumber = $form.phoneNumber.replace(
				/^(\+\d{2})(\d{1,3})(\d{1,3})(\d{1,4})$/,
				'$1 $2 $3 $4'
			);
		}
	}

	// // // Set the phone number when the component is created
	$: {
		formatPhoneNumber({ target: { value: $form.phoneNumber } });
	}
</script>

<div class="space-y-4">
	<slot name="header" />

	<p class="prose prose-lg pt-2 text-gray-500">
		Sometimes things happen. Like any good scout we'd like to make sure we're prepared too. Please
		let us know who we should contact in the unforseen event of an emergency.
	</p>
</div>

<form use:enhance method="POST">
	<div class="my-4 antialiased">
		<div class="flex flex-1 items-center justify-between">
			<div class="flex-1 px-4 py-2 text-sm">
				<p class="font-semibold text-gray-900">Emergency Contact</p>

				<div>
					<div class="mt-8 space-y-6 px-4 pb-4">
						<div>
							<label for="fullName" class="block">
								<span class="text-gray-700">Full Name</span>
							</label>
							<div class="relative">
								<span
									class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>
							<input
								bind:value={$form.fullName}
								{...constraints.fullName}
								name="fullName"
								type="text"
								placeholder="E.g. Clark Sell"
								class="form-imput mt-4 block w-full rounded-md shadow-sm" />
							{#if $errors.fullName}
								<small>{$errors.fullName}</small>
							{/if}
						</div>

						<div>
							<label for="phoneNumber" class="block">
								<span class="text-gray-700"
									>What is the best number to contact them at? (E.g. +13476748428, +493083050, etc.)</span>
							</label>
							<div class="relative">
								<span
									class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>

							<input
								bind:value={formattedPhoneNumber}
								on:input={formatPhoneNumber}
								{...constraints.phoneNumber}
								name="phoneNumber"
								id="phoneNumber"
								placeholder="+1 (123) 456-7890"
								class="form-imput mt-4 block w-full rounded-md shadow-sm" />

							{#if $errors.phoneNumber}
								<small>{$errors.phoneNumber}</small>
							{/if}
						</div>

						<div>
							<label for="email" class="block">
								<span class="text-gray-700">What is their email address?</span>
							</label>
							<div class="relative">
								<span
									class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>
							<input
								name="email"
								type="email"
								bind:value={$form.email}
								{...constraints.email}
								placeholder="E.g. hello@that.us"
								size="30"
								class="form-imput mt-4 block w-full rounded-md shadow-sm" />
							{#if $errors.email}
								<small>{$errors.email}</small>
							{/if}
						</div>

						<div>
							<label for="relationship" class="block">
								<span class="text-gray-700">What is their relationship to you?</span>
							</label>

							<div class="relative">
								<span
									class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>

							<div class="mt-4">
								<Select
									clearable={false}
									inputAttributes={{ name: 'relationship' }}
									items={[
										{ label: 'Spouse', value: 'Spouse' },
										{ label: 'Parent', value: 'Parent' },
										{ label: 'Kid', value: 'Kid' },
										{ label: 'Other', value: 'Other' }
									]}
									bind:value={relationshipSelect}
									bind:justValue={$form.relationship}
									inputStyles="form-multiselect block w-full rounded-md shadow-sm" />
								{#if $errors.relationship}
									<small>{$errors.relationship}</small>
								{/if}
							</div>
						</div>

						<div>
							<label for="travelingWithYou" class="block">
								<span class="text-gray-700">Are they traveling with you?</span>
							</label>
							<div class="relative">
								<span
									class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
							</div>
							<div class="mt-4">
								<Select
									clearable={false}
									inputAttributes={{ name: 'travelingWithYou' }}
									items={yesNoDropDown}
									bind:value={travelingWithYouSelect}
									bind:justValue={$form.travelingWithYou}
									inputStyles="form-multiselect  block w-full rounded-md shadow-sm" />

								{#if $errors.travelingWithYou}
									<small>{$errors.travelingWithYou}</small>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-24 border-t border-gray-400 pt-8">
		{#if $allErrors.length}
			<div class="flex flex-col space-y-3 text-red-500">
				{#each $allErrors as error}
					<div class="flex items-center space-x-2">
						<AlertOctagon />
						<p class="font-medium leading-5">{error.messages}</p>
					</div>
				{/each}
			</div>
		{/if}

		<div class="flex justify-end space-x-4">
			{#if !nextStep}
				{#if $allErrors.length > 0}
					<DisabledShell>
						<div class="px-8 py-2 font-medium">Update Contact Information</div>
					</DisabledShell>
				{:else}
					<button type="submit">
						<Shell>
							<div class="px-8 py-2 font-medium">Update Contact Information</div>
						</Shell>
					</button>
				{/if}
			{:else}
				<button on:click={handleNextStep}>
					<Shell>
						<div class="px-8 py-2 font-medium">Next Step</div>
					</Shell>
				</button>
			{/if}
		</div>
	</div>
</form>

<style lang="postcss">
	small {
		@apply text-sm font-medium text-red-500;
	}
</style>
