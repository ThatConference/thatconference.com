<script>
	export let sForm;

	import { getContext } from 'svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import * as flashModule from 'sveltekit-flash-message/client';
	import Select from 'svelte-select';
	import MaskInput from 'svelte-input-mask/MaskInput.svelte';

	import { Shell } from '$elements/buttons';
	import sharedProfileFormSchema from '$lib/formSchemas/sharedProfile';

	const { countryCode } = getContext('DROP_DOWN_KEY_VALUE_PAIRS');

	let countryCodeValue = countryCode?.options?.find(({ value }) => value === sForm.country);

	const { form, enhance, constraints } = superForm(sForm, {
		dataType: 'json',
		validators: sharedProfileFormSchema,
		syncFlashMessage: false,
		taintedMessage:
			'Are you sure you want to leave this page? There are changes to your profile and they will not be saved.',
		flashMessage: {
			module: flashModule
		}
	});
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
					<div class="mt-1 rounded-md border shadow-sm">
						<input
							bind:value={$form.firstName}
							{...$constraints.firstName}
							name="firstName"
							type="text"
							class="form-input block w-full" />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="lastName" class="block text-sm font-medium leading-5 text-gray-700">
						Last or Family Name
					</label>
					<div class="relative">
						<span
							class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<div class="mt-1 rounded-md border shadow-sm">
						<input
							bind:value={$form.lastName}
							{...$constraints.lastName}
							name="lastName"
							class="form-input block w-full" />
					</div>
				</div>

				<div class="sm:col-span-6">
					<label for="email" class="block text-sm font-medium leading-5 text-gray-700">
						Email address
					</label>
					<div class="relative">
						<span
							class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
					</div>
					<div class="mt-1 rounded-md border shadow-sm">
						<input
							bind:value={$form.email}
							{...$constraints.email}
							name="email"
							type="email"
							class="form-input block w-full" />
					</div>
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
					<div class="mt-1 rounded-md border shadow-sm">
						<input
							bind:value={$form.city}
							{...$constraints.city}
							name="city"
							type="text"
							class="form-input block w-full" />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="state" class="block text-sm font-medium leading-5 text-gray-700">
						State
					</label>
					<div class="mt-1 rounded-md border shadow-sm">
						<input
							bind:value={$form.state}
							{...$constraints.state}
							name="state"
							type="text"
							class="form-input block w-full" />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="state" class="block text-sm font-medium leading-5 text-gray-700">
						Country
					</label>
					<div class="mt-1 rounded-md border shadow-sm">
						<Select
							inputAttributes={{
								name: 'country'
							}}
							inputStyles="form-multiselect hover:border-gray-700"
							items={countryCode.options}
							bind:value={countryCodeValue} />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="about" class="block text-sm font-medium leading-5 text-gray-700">
						Phone Number
					</label>
					<div class="mt-1 rounded-md border shadow-sm">
						<MaskInput
							name="phone"
							alwaysShowMask
							mask="+0 (000) 000 - 0000"
							size={20}
							showMask
							maskChar="_"
							class="form-input block w-full"
							bind:value={$form.phone} />
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="company" class="block text-sm font-medium leading-5 text-gray-700">
						Company
					</label>
					<div class="mt-1 rounded-md border shadow-sm">
						<input
							bind:value={$form.company}
							{...$constraints.company}
							name="company"
							type="text"
							class="form-input block w-full" />
					</div>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-200 pt-5">
			<div class="flex justify-end space-x-4">
				<div class="flex">
					<Shell>
						<button type="submit" class="w-full px-8 py-2 text-sm font-medium leading-5">
							<span>Update Shared Profile</span>
						</button>
					</Shell>
				</div>
			</div>
		</div>
	</div>
</form>

<div class="py-12">
	<SuperDebug data={$form} />
</div>
