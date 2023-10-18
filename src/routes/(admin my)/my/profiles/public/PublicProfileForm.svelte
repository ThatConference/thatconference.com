<script>
	export let sForm;

	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { getFlash } from 'sveltekit-flash-message';
	import * as flashModule from 'sveltekit-flash-message/client';
	import Icon from 'svelte-awesome';
	import { ScaleOut } from 'svelte-loading-spinners';
	import Tags from 'svelte-tags-input';
	import Checkbox from 'svelte-checkbox';
	import lodash from 'lodash';
	import { AlertOctagon } from 'lucide-svelte';
	import va from '@vercel/analytics';

	import config from '$lib/config.public';
	import publicProfileSchema from '$lib/formSchemas/publicProfile';
	import { Shell, DisabledShell } from '$elements/buttons';
	import socialLinks from './socialLinks';

	const flash = getFlash(page);
	const { isEmpty } = lodash;

	const { form, enhance, constraints, errors, allErrors } = superForm(sForm, {
		dataType: 'json',
		validators: publicProfileSchema,
		syncFlashMessage: false,
		taintedMessage:
			'Are you sure you want to leave this page? There are changes to your profile and they will not be saved.',
		flashMessage: {
			module: flashModule
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				invalidateAll();
				va.track('form:public-profile:submitted');
			}
			window.scrollTo(0, 0);
		}
	});

	let profileImageUploading;
	let slugValues = {};
	let socialLinkValues = {};
	let socialLinksState = $form.profileLinks || [];

	function buildSocialLink(linkType, baseAddress, userSlug) {
		return {
			isPublic: true,
			linkType,
			url: `${baseAddress}${userSlug.trim()}`
		};
	}

	function updateLinksInputValues(link, userValue) {
		console.log('updateLinksInputValues', link, userValue);

		// clear out the value regardless.
		socialLinksState = socialLinksState.filter((i) => i.linkType !== link.linkType);

		// if we have a value.. add it back
		if (!isEmpty(userValue)) {
			let slug = '';
			if (Array.isArray(link.slug)) slug = slugValues[link.linkType] || link.slug[0];
			else slug = link.slug;

			socialLinksState.push(buildSocialLink(link.linkType, slug, userValue));
		}

		return socialLinksState;
	}

	function getInitialSocialLinkValue(link) {
		let result = '';

		if ($form.profileLinks?.length > 0) {
			const [socialLink] = $form.profileLinks.filter((i) => i.linkType === link.linkType);

			if (socialLink) {
				// If link.slugs is an array, match socialLink.url with the proper element
				if (Array.isArray(link.slug)) {
					link.slug.forEach((el) => {
						const [, value] = socialLink.url.split(el);
						if (value) result = value;
					});
				} else {
					const [, value] = socialLink.url.split(link.slug);
					result = value;
				}
			}

			socialLinkValues[link.linkType] = result;
		}

		return result;
	}

	function getInitialSelectValue(link) {
		// initial state should be the first element in slug array
		let result = link.slug[0];

		if ($form.profileLinks?.length > 0) {
			const [socialLink] = $form.profileLinks.filter((i) => i.linkType === link.linkType);
			if (socialLink) {
				link.slug.forEach((el) => {
					const [, value] = socialLink.url.split(el);
					if (value) {
						result = el;
						slugValues[link.linkType] = el;
					}
				});
			}
		}

		return result;
	}

	function updateLinkSlugValue(link, userValue) {
		// This is called from blur so we're looking for:
		// 1. Link existed in DB and changing url
		// 2. Already entered/changed slug
		// 3. No value in User Slug - So either removed or never set

		let userSlug = '';
		slugValues[link.linkType] = userValue;

		// get existing link if available
		const existingLink = socialLinksState.filter((l) => l.linkType === link.linkType);

		// clear out the value regardless.
		socialLinksState = socialLinksState.filter((i) => i.linkType !== link.linkType);

		if (existingLink[0]) {
			link.slug.forEach((s) => {
				const [, value] = existingLink[0].url.split(s);
				if (value) {
					userSlug = value;
				}
			});
		}

		if (!isEmpty(userSlug)) {
			socialLinksState.push(buildSocialLink(link.linkType, userValue, userSlug));
		}

		return socialLinksState;
	}

	async function postProfilePicture(profilePhoto) {
		profileImageUploading = true;
		const formData = new FormData();
		formData.append('file', profilePhoto.currentTarget.files[0]);

		const res = await fetch(config.profileImageApi, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${$page.data.user.accessToken}`
			},
			body: formData
		});

		if (!res.ok) {
			console.log('yea error');
			const errorMessage = {
				type: 'error',
				message: `There was an error uploading your profile picture.`
			};

			$flash = errorMessage;
			return null;
		}

		const json = await res.json();

		console.log(json.data.url);

		profileImageUploading = false;
		return json.data.url;
	}
</script>

<form use:enhance method="POST">
	<div>
		<h2 class="text-xl font-bold leading-6 text-gray-900">Public and Speaker Profile</h2>
		<p class="mt-4 text-sm leading-5 text-gray-500">
			This information is what we feature about you if you choose to make your profile public.
		</p>

		<p class="mt-4 text-sm leading-5 text-gray-500">
			To submit any type activity, your profile will have to be public.
		</p>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-x-4 gap-y-12 px-4 sm:grid-cols-6">
		<!-- First Name -->
		<div class="sm:col-span-3">
			<label for="first_name" class="block text-sm font-medium leading-5 text-gray-700">
				First or Given Name
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<input
				name="firstName"
				id="firstName"
				type="text"
				bind:value={$form.firstName}
				{...$constraints.firstName}
				class="form-imput mt-4 block w-full rounded-md shadow-sm" />

			{#if $errors.firstName}
				<small>{$errors.firstName}</small>
			{/if}
		</div>

		<!-- Last Name -->
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
				type="text"
				bind:value={$form.lastName}
				{...$constraints.lastName}
				class="form-imput mt-4 block w-full rounded-md shadow-sm" />
			{#if $errors.lastName}
				<small>{$errors.lastName}</small>
			{/if}
		</div>

		<!-- Profile Photo -->
		<div class="sm:col-span-6">
			<label for="photo" class="block text-sm font-medium leading-5 text-gray-700">
				Profile Photo
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<div class="mt-4 flex items-center">
				<span class="h-16 w-16 overflow-hidden rounded-full ring-4 ring-that-blue">
					{#if profileImageUploading}
						<div class="flex h-full w-full flex-grow justify-center">
							<ScaleOut />
						</div>
					{:else if $form.profileImage}
						<img
							class="h-full w-full object-cover"
							src={`${$form.profileImage}?auto=format&fit=facearea&facepad=5&mask=ellipse&h=200&w=200&q=75`}
							alt="" />
					{:else}
						<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904
                    0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0
                    018 0z" />
						</svg>
					{/if}
				</span>
				<span class="ml-5 rounded-md shadow-sm">
					<input name="profileImage" bind:value={$form.profileImage} hidden />
					<input
						name="profileImageFile"
						on:change={(e) => postProfilePicture(e).then((r) => ($form.profileImage = r))}
						type="file"
						accept="image/x-png,image/png,.png,image/jpeg,.jpg,.jpeg,image/gif,.gif"
						class="focus:ring-blue rounded-md border border-gray-300 px-3 py-2
                  text-sm font-medium leading-4 text-gray-700
                  transition duration-150
                  ease-in-out hover:text-gray-500
                  focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800" />
				</span>
			</div>
			<p class="mt-4 text-sm text-gray-500">
				Make sure you <strong>hit save</strong> to update your profile picture.
			</p>
		</div>

		<!-- Bio -->
		<div class="sm:col-span-6">
			<label for="about" class="block text-sm font-medium leading-5 text-gray-700">
				About Yourself
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
			<textarea
				name="bio"
				id="bio"
				type="text"
				bind:value={$form.bio}
				{...$constraints.bio}
				rows="10"
				class="form-textarea mt-4 block w-full rounded-md shadow-sm" />

			{#if $errors.bio}
				<small>{$errors.bio}</small>
			{/if}
		</div>

		<!-- Company -->
		<div class="sm:col-span-3">
			<label for="company" class="block text-sm font-medium leading-5 text-gray-700">
				Company
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>

			<input
				name="company"
				id="company"
				type="text"
				bind:value={$form.company}
				{...$constraints.company}
				class="form-input mt-4 block w-full rounded-md shadow-sm" />
			{#if $errors.company}
				<small>{$errors.company}</small>
			{/if}
		</div>

		<!-- Job Title -->
		<div class="sm:col-span-3">
			<label for="jobTitle" class="block text-sm font-medium leading-5 text-gray-700">
				Job Title
			</label>
			<div class="relative">
				<span
					class="absolute left-0 top-0 block h-2 w-2 -translate-x-4 -translate-y-4 transform rounded-full bg-red-400" />
			</div>
			<input
				name="jobTitle"
				id="jobTitle"
				type="text"
				bind:value={$form.jobTitle}
				{...$constraints.jobTitle}
				class="form-input mt-4 block w-full rounded-md shadow-sm" />
			{#if $errors.jobTitle}
				<small>{$errors.jobTitle}</small>
			{/if}
		</div>
	</div>

	<!-- Social Links -->
	<div class="mt-24 border-t border-gray-400 px-4 pt-8">
		<div>
			<h3 class="text-lg font-medium leading-6 text-gray-900">Social Links</h3>
			<p class="mt-1 text-sm leading-5 text-gray-500">Where would you like people to follow you?</p>
		</div>

		<div class="mt-6">
			<div class="sm:col-span-4">
				{#each socialLinks as link}
					<div class="mt-4 flex rounded-md border shadow-sm">
						<div
							class="inline-flex w-1/3 items-center rounded-l-md border
                  border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500
                  sm:text-sm">
							<span class="w-6">
								<Icon data={link.icon} />
							</span>
							{#if Array.isArray(link.slug)}
								<select
									class="form-input w-full cursor-pointer border-none bg-transparent p-1 text-gray-500 outline-none sm:text-sm"
									value={getInitialSelectValue(link)}
									on:blur={(e) => ($form.profileLinks = updateLinkSlugValue(link, e.target.value))}>
									{#each link.slug as slug}
										<option value={slug}>{slug}</option>
									{/each}
								</select>
							{:else}{link.slug}{/if}
						</div>

						<input
							name={link.name}
							type="text"
							value={getInitialSocialLinkValue(link)}
							on:change={(e) => ($form.profileLinks = updateLinksInputValues(link, e.target.value))}
							class="form-input block w-full min-w-0 flex-1 rounded-none rounded-r-md
                  border sm:text-sm
                  sm:leading-5" />
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Interests -->
	<div class="mt-24 border-t border-gray-400 pt-8">
		<div>
			<h3 class="text-lg font-medium leading-6 text-gray-900">Campfire Facts</h3>
			<p class="mt-1 text-sm leading-5 text-gray-500">
				There is more to you than just some social links, tell us a few interesting facts.
			</p>
		</div>

		<div class="mt-8">
			<div class="sm:col-span-6">
				<div class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
					<div class="block text-sm font-medium leading-5 text-gray-700 sm:col-span-6">
						<label for="interests"> What are some things you're interested in? </label>
						<p class="mt-2 text-gray-500">Please note return/enter is the delimiter.</p>

						<div class="tags-input-override mt-4">
							<Tags
								name="interests"
								bind:tags={$form.interests}
								allowBlur={true}
								maxTags={25}
								onlyUnique={true} />
						</div>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
					<div class="sm:col-span-6">
						<label for="lifeHack" class="block text-sm font-medium leading-5 text-gray-700">
							What is a 1 sentence "life hack" that you'd share with someone?
						</label>
						<textarea
							name="lifeHack"
							id="lifeHack"
							type="text"
							placeholder="E.g. `Embrace failure, lean into the journey and if you don't like the road, take the fork.`"
							bind:value={$form.lifeHack}
							{...$constraints.lifeHack}
							class="form-input mt-4 block w-full rounded-md border shadow-sm" />
						{#if $errors.lifeHack}
							<small>{$errors.lifeHack}</small>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Privacy -->
	<div class="mt-24 border-t border-gray-400 pt-8">
		<div>
			<h3 class="text-lg font-medium leading-6 text-gray-900">Make your profile public(ish).</h3>

			<div class="mt-1 text-sm leading-5 text-gray-500">
				<p>By allowing us to feature you, you can...</p>
				<p class="pt-4">
					Submit an activity across THAT (that.us or thatconference.com). Your profile will then be
					featured across different areas of the Website. We don't sell or share any of your data.
				</p>
				<p class="pt-4 font-semibold">
					After toggling this, it takes a few moments for our robots to wake up and do their jobs.
				</p>
			</div>
		</div>

		<div class="mt-6">
			<label for="canFeature" class="block text-sm font-medium leading-5 text-gray-700">
				Yes, please feature me.
			</label>

			<div class="mt-2 flex items-start">
				<Checkbox
					name="canFeature"
					id="canFeature"
					bind:checked={$form.canFeature}
					{...$constraints.canFeature}
					size="2.5rem"
					class="flex-none" />
				{#if $errors.canFeature}
					<small>{$errors.canFeature}</small>
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
</form>

<style lang="postcss">
	small {
		@apply text-sm font-medium text-red-500;
	}

	.tags-input-override :global(.svelte-tags-input-layout) {
		padding: 15px 10px 15px 10px !important;
	}

	.tags-input-override :global(.svelte-tags-input-tag) {
		background: #26529a !important;
		color: #fff !important;
		border-radius: 4px !important;
		padding: 5px 15px 5px 15px !important;
	}
</style>
