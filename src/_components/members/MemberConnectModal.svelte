<script>
	export let firstName;
	export let lastName;
	export let isSHaringWithMe;
	export let email;
	export let phone;
	export let createdAt;
	export let notes;
	export let isFollowing;
	export let meSharingWith;
	export let sharingWithMe;
	let memberId = null;
	export { memberId as id };
	export let profileImage;

	import dayjs from 'dayjs';
	import { DisabledShell, Standard as StandardButton } from '$elements/buttons';
	import { createEventDispatcher, getContext } from 'svelte';
	import { clickOutside } from '$elements/actions';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import sharingSchema from '$lib/formSchemas/sharingForm';
	import defaultConfig from '$lib/config.public';
	import buildImageSrc from '$lib/image';

	const meFollowing = getContext('meFollowing');
	const { toggleFollow } = meFollowing;

	const dispatch = createEventDispatcher();
	profileImage = profileImage ? profileImage : defaultConfig.defaultProfileImage;
	const srcset = buildImageSrc(profileImage, ['96']);
	const sharedWithMeOn = dayjs(createdAt).format('MMMM M, YYYY');
	let shareStatus;
	if (isSHaringWithMe === false) {
		shareStatus = `${firstName} is not sharing their information with you.`;
	}

	let formData = {
		id: memberId,
		notes
	};

	const toggleFollowAction = () => {
		isFollowing = toggleFollow(memberId);
	};

	const { form, errors, allErrors, enhance } = superForm(
		superValidateSync(formData, sharingSchema),
		{
			id: memberId,
			dataType: 'json',
			validators: sharingSchema,

			onUpdated({ form }) {
				if (form.valid) {
					notes = form.data.notes;
					dispatch('closeDetail');
				}
			}
		}
	);

	function handleStopSharing() {
		notes = '';
		dispatch('STOP_SHARING');
		// dispatch('closeDetail');
	}
</script>

<div>
	<div
		class="fixed inset-0 z-50 overflow-y-auto overscroll-none"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true">
		<div class="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:p-10">
			<div class="fixed inset-0">
				<div class="absolute inset-0 bg-gray-500 opacity-75" />
			</div>
			<div
				use:clickOutside
				on:click_outside={() => dispatch('closeDetail')}
				class="transform overflow-hidden rounded-lg bg-white px-4 pb-4
		pt-5 shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6 md:max-w-2xl"
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-headline">
				<div>
					<div class="flex justify-start gap-x-8 text-left">
						<img
							class="lazyload h-20 w-20 rounded-full"
							alt="profile"
							data-sizes="auto"
							data-src={srcset.src}
							data-srcset={srcset.srcset} />
						<div class="grow pr-10">
							<p class="mb-3 mt-1 text-2xl font-semibold text-thatBlue-500">
								{firstName}
								{lastName}
							</p>
							{#if sharingWithMe}
								<p class="text-md mb-2 text-gray-600">
									Started sharing with you on {sharedWithMeOn}
								</p>
							{:else}
								<p class="text-md mb-2 text-gray-600">Is currently not sharing with you</p>
							{/if}
							{#if email}
								<p class="text-sm text-gray-600">{email}</p>
							{/if}
							{#if phone}
								<p class="text-sm text-gray-600">{phone}</p>
							{/if}
							{#if shareStatus}
								<p class="mt-4 text-sm font-semibold text-thatBlue-700">{shareStatus}</p>
							{/if}

							<div class="my-10 space-y-2">
								<StandardButton on:click={() => toggleFollowAction()}>
									<span
										>{#if !isFollowing}Follow{:else}Un-Follow{/if}
										{firstName}</span>
								</StandardButton>

								{#if meSharingWith}
									<StandardButton on:click={() => handleStopSharing()}>
										Stop Sharing with {firstName}
									</StandardButton>
								{:else}
									<StandardButton on:click={() => dispatch('START_SHARING')}>
										Share With {firstName}
									</StandardButton>
								{/if}
							</div>

							{#if meSharingWith}
								<p class="text-md mt-4 text-gray-600">
									You are sharing your <a
										class="text-thatBlue-500 hover:text-thatOrange-500"
										href="/my/profiles/shared">Shared Profile</a>
									with {firstName}
								</p>
								<form use:enhance method="POST" action="/my/network/members">
									<div class="mt-2">
										<label for="notes" class="my-2 block text-sm font-medium text-gray-500"
											>Your private notes:</label>
										<textarea
											name="notes"
											id="notes"
											bind:value={$form.notes}
											type="text"
											rows="6"
											class="w-full rounded-md border-gray-500 p-2"
											placeholder="E.g. We met at THAT Conference discussing..." />
										{#if $errors.notes}
											<small class="max-md text-red-500">{$errors.notes}</small>
										{/if}
									</div>
									<div class="mt-2 flex flex-row-reverse space-x-4 space-x-reverse">
										{#if $allErrors?.length > 0}
											<DisabledShell>
												<div class="px-8 py-2 font-medium">Update Notes</div>
											</DisabledShell>
										{:else}
											<button type="submit" class="anchorButtonHighlight"> Update Notes </button>
										{/if}
									</div>
								</form>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	/* .anchorButton {
		@apply rounded-md bg-slate-50 px-4 py-2 text-center font-normal tracking-wide text-thatBlue-500 shadow-md md:text-xl;
	}

	.anchorButton:hover {
		@apply bg-slate-200 transition duration-150 ease-in-out;
	}
	.anchorButton:focus {
		@apply underline underline-offset-4;
	} */

	.anchorButtonHighlight {
		@apply rounded-md bg-thatBlue-500 px-4 py-2 text-center font-normal tracking-wide text-white shadow-md md:text-xl;
	}

	.anchorButtonHighlight:hover {
		@apply bg-thatBlue-400 transition duration-150 ease-in-out;
	}
	.anchorButtonHighlight:focus {
		@apply underline underline-offset-4;
	}
</style>
