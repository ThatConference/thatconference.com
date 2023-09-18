<script>
	export let sForm;

	import { getContext } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import { AlertOctagon } from 'lucide-svelte';
	import Select from 'svelte-select';
	import va from '@vercel/analytics';

	import { DisabledShell, Shell } from '$elements/buttons';
	import sharedProfileFormSchema from '$lib/formSchemas/sharedProfile';

	const { countryCode } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');

	const { form, enhance, constraints, errors, allErrors } = superForm(sForm, {
		dataType: 'json',
		validators: sharedProfileFormSchema,
		syncFlashMessage: false,
		taintedMessage: null, // todo - @csell phone number formatting taints the form.
		flashMessage: {
			module: flashModule
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				invalidateAll();
				va.track('form:public-profile:submitted');
			}
		}
	});

	let countryCodeSelect = countryCode?.options?.find(({ value }) => value === $form.country);
	let formattedPhoneNumber = '';
	function formatPhoneNumber(event) {
		// Remove all non-numeric characters from the input
		$form.phone = event.target.value.replace(/\D/g, '');

		// Always add a plus sign before the number
		$form.phone = '+' + $form.phone;

		// Format the phone number nicely
		if ($form.phone.startsWith('+1')) {
			// Format as a US number
			formattedPhoneNumber = $form.phone.replace(
				/^(\+\d{1})(\d{3})(\d{3})(\d{4})$/,
				'$1 ($2) $3-$4'
			);
		} else {
			// Format as an international number
			formattedPhoneNumber = $form.phone.replace(
				/^(\+\d{2})(\d{1,3})(\d{1,3})(\d{1,4})$/,
				'$1 $2 $3 $4'
			);
		}
	}

	// // // Set the phone number when the component is created
	$: {
		formatPhoneNumber({ target: { value: $form.phone } });
	}
</script>

<form method="POST" use:enhance>
	<div>
		<div>
			<h2 class="text-xl font-bold leading-6 text-gray-900">Shared Profile</h2>

			<p class="mt-4 text-sm leading-5 text-gray-500">
				Your shared profile is an opportunity for you to change your primary profile information
				with information that you'd rather share with a sponsor.
			</p>

			<p class="mt-4 text-sm leading-5 text-gray-500">
				Below is the information we'll share with sponsors. By default it takes information from
				your main profile. Edit the fields below to change what's shared. This will not change the
				information on your main profile.
			</p>
		</div>

		<div class="px-4">
			<div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="firstName" class="block text-sm font-medium leading-5 text-gray-700">
						First or Given Name
					</label>
					<div class="relative">
						<span
							class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<input
						bind:value={$form.firstName}
						{...$constraints.firstName}
						name="firstName"
						type="text"
						class="form-input mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.firstName}
						<small>{$errors.firstName}</small>
					{/if}
				</div>

				<div class="sm:col-span-3">
					<label for="lastName" class="block text-sm font-medium leading-5 text-gray-700">
						Last or Family Name
					</label>
					<div class="relative">
						<span
							class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>

					<input
						bind:value={$form.lastName}
						{...$constraints.lastName}
						name="lastName"
						class="form-input mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.lastName}
						<small>{$errors.lastName}</small>
					{/if}
				</div>

				<div class="sm:col-span-6">
					<label for="email" class="block text-sm font-medium leading-5 text-gray-700">
						Email address
					</label>
					<div class="relative">
						<span
							class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<input
						bind:value={$form.email}
						{...$constraints.email}
						name="email"
						type="email"
						class="form-input mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.email}
						<small>{$errors.email}</small>
					{/if}
				</div>

				<div class="relative py-6 sm:col-span-6">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-300" />
					</div>
					<div class="relative flex justify-center">
						<span class="bg-gray-100 px-6 text-sm uppercase text-gray-500"> Optional Fields </span>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="city" class="block text-sm font-medium leading-5 text-gray-700"> City </label>

					<input
						bind:value={$form.city}
						{...$constraints.city}
						name="city"
						type="text"
						class="form-input mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.city}
						<small>{$errors.city}</small>
					{/if}
				</div>

				<div class="sm:col-span-3">
					<label for="state" class="block text-sm font-medium leading-5 text-gray-700">
						State
					</label>

					<input
						bind:value={$form.state}
						{...$constraints.state}
						name="state"
						type="text"
						class="form-input mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.state}
						<small>{$errors.state}</small>
					{/if}
				</div>

				<div class="sm:col-span-3">
					<label for="state" class="block text-sm font-medium leading-5 text-gray-700">
						Country
					</label>

					<div class="mt-4">
						<Select
							inputAttributes={{
								name: 'country'
							}}
							inputStyles="form-multiselect block w-full rounded-md shadow-sm"
							items={countryCode.options}
							bind:value={countryCodeSelect}
							bind:justValue={$form.country} />
						{#if $errors.country}
							<small>{$errors.country}</small>
						{/if}
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="about" class="block text-sm font-medium leading-5 text-gray-700">
						Phone Number
					</label>

					<input
						bind:value={formattedPhoneNumber}
						on:input={formatPhoneNumber}
						{...constraints.phone}
						name="phone"
						id="phone"
						placeholder="+1 (123) 456-7890"
						class="form-imput mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.phone}
						<small>{$errors.phone}</small>
					{/if}
				</div>

				<div class="sm:col-span-3">
					<label for="company" class="block text-sm font-medium leading-5 text-gray-700">
						Company
					</label>

					<input
						bind:value={$form.company}
						{...$constraints.company}
						name="company"
						type="text"
						class="form-imput mt-4 block w-full rounded-md shadow-sm" />

					{#if $errors.company}
						<small>{$errors.company}</small>
					{/if}
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
				{#if $allErrors.length > 0}
					<DisabledShell>
						<div class="px-8 py-2 font-medium">Save Profile</div>
					</DisabledShell>
				{:else}
					<button type="submit">
						<Shell>
							<div class="px-8 py-2 font-medium">Save Profile</div>
						</Shell>
					</button>
				{/if}
			</div>
		</div>
	</div>
</form>
