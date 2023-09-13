<script>
	export let isNewProfile;
	export let sForm;

	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import Checkbox from 'svelte-checkbox';

	import { ErrorCircle } from '$elements/svgs';
	import { Shell, DisabledShell } from '$elements/buttons';
	import primaryProfileFormSchema from '$lib/formSchemas/primaryProfile';

	const { form, enhance, constraints, errors, allErrors } = superForm(sForm, {
		dataType: 'json',
		validators: primaryProfileFormSchema,
		syncFlashMessage: false,
		taintedMessage:
			'Are you sure you want to leave this page? There are changes to your profile and they will not be saved.',
		flashMessage: {
			module: flashModule
		},
		onUpdated({ form }) {
			if (form.valid) {
				invalidateAll();
			}
		}
	});
</script>

<form use:enhance method="POST">
	<div>
		<h2 class="text-xl font-bold leading-6 text-gray-900">System Profile</h2>
		<p class="mt-4 text-sm leading-5 text-gray-500">
			To submit any type sessions, you will also need to create a
			<a class="text-that-blue hover:text-thatBlue-800" href="/my/profiles/public/"
				>public / speaker profile</a
			>.
		</p>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-x-4 gap-y-12 px-4 sm:grid-cols-6">
		<div class="sm:col-span-3">
			<label for="first_name" class="block text-sm font-medium leading-5 text-gray-700">
				First or Given Name
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<input
				bind:value={$form.firstName}
				{...$constraints.firstName}
				type="text"
				name="firstName"
				id="firstName"
				class="form-imput mt-4 block w-full rounded-md shadow-sm" />

			{#if $errors.firstName}
				<small>{$errors.firstName}</small>
			{/if}
		</div>

		<div class="sm:col-span-3">
			<label for="last_name" class="block text-sm font-medium leading-5 text-gray-700">
				Last or Family Name
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<input
				name="lastName"
				id="lastName"
				class="form-imput mt-4 block w-full rounded-md shadow-sm"
				bind:value={$form.lastName} />

			{#if $errors.lastName}
				<small>{$errors.lastName}</small>
			{/if}
		</div>

		<div class="sm:col-span-4">
			<label for="email" class="block text-sm font-medium leading-5 text-gray-700">
				Email address
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>
			<p class="mt-2 text-sm text-gray-500">
				This is your system email address separate of your account login.
			</p>

			<input
				bind:value={$form.email}
				{...$constraints.email}
				type="email"
				name="email"
				placeholder="e.g. user@example.com"
				class="form-input mt-4 block w-full rounded-md shadow-sm" />

			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</div>

		<div class="sm:col-span-4">
			<label for="username" class="block text-sm font-medium leading-5 text-gray-700">
				Member Page Slug
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<p class="mt-2 text-sm text-gray-500">
				If you ever choose to make your profile public, this sets the path to your profile page. It
				can only be created once.
			</p>

			<div class="mt-4 flex">
				<span
					class="form-input inline-flex items-center rounded-l-md border border-r-0
                border-gray-300 bg-gray-50 px-3 text-gray-500">
					https://that.us/members/
				</span>

				<input
					bind:value={$form.profileSlug}
					{...$constraints.profileSlug}
					type="text"
					disabled={!isNewProfile}
					name="profileSlug"
					class="form-input block w-full min-w-0 flex-1 rounded-none rounded-r-md
                  border bg-gray-50 text-gray-500" />
			</div>
		</div>
	</div>

	<!-- Terms of Service -->
	<div class="mt-24 border-t border-gray-400 pt-8">
		<div>
			<h3 class="text-lg font-medium leading-6 text-gray-900">Terms of Service</h3>
			<p class="mt-1 text-sm leading-5 text-gray-500">
				Everyone is awesome, and we want your help in keeping it that way. Also lawyers.
			</p>
		</div>

		<div class="mt-8 px-4">
			<fieldset>
				<legend class="text-base font-medium text-gray-900"> Do you agree to our: </legend>
				<div class="relative">
					<span
						class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
				</div>

				<div class="mt-4">
					<div class="relative flex items-start">
						<Checkbox
							name="acceptedCodeOfConduct"
							bind:checked={$form.acceptedCodeOfConduct}
							size="2.5rem"
							class="flex-none" />

						<div class="ml-3 text-sm leading-5">
							<label for="comments" class="font-medium text-gray-700">
								<a
									tabindex="-1"
									href="/support/code-of-conduct/"
									class="font-medium text-that-blue transition
										duration-150 ease-in-out hover:text-thatBlue-800">
									Code of Conduct
								</a>
							</label>
							<p class="text-gray-500">Be epic. Together we're a family of geeks and geeklings!</p>
						</div>
					</div>
					<div class="mt-4">
						<div class="relative flex items-start">
							<Checkbox
								name="acceptedAntiHarassmentPolicy"
								bind:checked={$form.acceptedAntiHarassmentPolicy}
								size="2.5rem"
								class="flex-none" />

							<div class="ml-3 text-sm leading-5">
								<label for="comments" class="font-medium text-gray-700">
									<a
										tabindex="-1"
										href="/suppoprt/anti-harassment/"
										class="font-medium text-that-blue transition
											duration-150 ease-in-out hover:text-thatBlue-800">
										Commitment Anti-Harassment
									</a>
								</label>
								<p class="text-gray-500">We do not accept any sort of harassment.</p>
							</div>
						</div>

						<div class="mt-4">
							<div class="relative flex items-start">
								<Checkbox
									name="acceptedCommitmentToDiversity"
									bind:checked={$form.acceptedCommitmentToDiversity}
									size="2.5rem"
									class="flex-none" />

								<div class="ml-3 text-sm leading-5">
									<label for="comments" class="font-medium text-gray-700">
										<a
											tabindex="-1"
											href="/support/commitment-to-diversity/"
											class="font-medium text-that-blue
												transition duration-150 ease-in-out
												hover:text-thatBlue-800">
											Commitment to Diversity
										</a>
									</label>
									<p class="text-gray-500">
										Everyone is welcome at THAT! It's our daily responsibility to make our industry
										the best place it can be, regardless of color, gender, location, or even tech
										stack.
									</p>
								</div>
							</div>

							<div class="mt-4">
								<div class="relative flex items-start">
									<Checkbox
										name="acceptedTermsOfService"
										bind:checked={$form.acceptedTermsOfService}
										size="2.5rem"
										class="flex-none" />

									<div class="ml-3 text-sm leading-5">
										<label for="candidates" class="font-medium text-gray-700">
											<a
												tabindex="-1"
												href="/support/terms-of-use/"
												class="font-medium text-that-blue
													transition duration-150 ease-in-out
													hover:text-thatBlue-800">
												Terms of Use
											</a>
										</label>
										<p class="text-gray-500">Lawyer speak.</p>
									</div>
								</div>
							</div>

							<div class="mt-4">
								<div class="relative flex items-start">
									<Checkbox
										name="isOver13"
										bind:checked={$form.isOver13}
										size="2.5rem"
										class="flex-none" />

									<div class="ml-3 text-sm leading-5">
										<label for="offers" class="font-medium text-gray-700">
											Are you >= to the age of 13?
										</label>
										<p class="text-gray-500">
											I'm sorry, but to have an account on THAT.us or THATConference.com you must be
											at least 13 years old.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</fieldset>
		</div>
	</div>

	<!-- Deactivate Account -->
	<div class="mt-24 border-t border-gray-400 pt-8">
		<fieldset>
			<legend class="text-base font-medium text-gray-900"> User Account </legend>

			<div class="mt-4">
				<div class="relative flex items-start">
					<Checkbox
						name="isDeactivated"
						bind:checked={$form.isDeactivated}
						size="2.5rem"
						class="flex-none" />

					<div class="ml-3 text-sm leading-5">
						<label for="comments" class="font-medium text-gray-700">
							<a
								tabindex="-1"
								href="/support/code-of-conduct/"
								class="font-medium text-that-blue transition
									duration-150 ease-in-out hover:text-thatBlue-800">
								Deactivate my account.
							</a>
						</label>
						<p class="text-gray-500">...</p>
					</div>
				</div>
			</div>
		</fieldset>
	</div>

	<div class="mt-24 border-t border-gray-400 pt-8">
		{#if $allErrors.length}
			<div class="flex flex-col space-y-3 text-red-500">
				{#each $allErrors as error}
					<div class="flex items-center space-x-2">
						<ErrorCircle />
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
</form>

<style lang="postcss">
	small {
		@apply text-sm font-medium text-red-500;
	}
</style>
