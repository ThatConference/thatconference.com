<script>
	export let sharedWithMeProfile;
	export let rowIndex;
	export let shareWithId; // sharing with memberId
	export let firstName;
	export let lastName;
	export let lastInitial;
	export let isSHaringWithMe;
	export let email;
	export let phone;
	export let createdAt;
	export let notes;

	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$elements/actions';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import sharingSchema from '$lib/formSchemas/sharingForm';
	import defaultConfig from '$lib/config.public';
	import buildImageSrc from '$lib/image';
	import RowButton from './RowButton.svelte';

	const dispatch = createEventDispatcher();
	let { profileImage } = sharedWithMeProfile ?? {};
	profileImage = profileImage ? profileImage : defaultConfig.defaultProfileImage;
	const srcset = buildImageSrc(profileImage, ['96']);
	const sharedWithMeOn = dayjs(createdAt).format('MMMM M, YYYY');
	let shareStatus;
	if (isSHaringWithMe === false) {
		shareStatus = `${firstName} is not sharing their information with you.`;
	}

	let formData = {
		id: shareWithId,
		notes
	};

	const { form, errors, allErrors, enhance } = superForm(
		superValidateSync(formData, sharingSchema),
		{
			id: shareWithId,
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
	if ($allErrors?.length > 0) {
		console.log('🚨 Why?', $allErrors);
	}

	const stopSharingAction = () => {
		dispatch('stopSharing', rowIndex);
		dispatch('closeDetail');
	};
</script>

<div>
	<div
		class="fixed inset-0 z-30 overflow-y-auto overscroll-none"
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
		pt-5 shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6 md:max-w-xl"
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
							<p class="text-sm text-gray-400">{sharedWithMeOn}</p>
							<p class="mt-1 text-xl font-semibold text-thatBlue-500">
								{firstName}
								{lastName ?? lastInitial}
							</p>
							{#if email}
								<p class="text-sm text-gray-600">{email}</p>
							{/if}
							{#if phone}
								<p class="text-sm text-gray-600">{phone}</p>
							{/if}
							{#if shareStatus}
								<p class="mt-4 text-sm font-semibold text-thatBlue-700">{shareStatus}</p>
							{/if}
							<form use:enhance method="POST">
								<div class="mt-4">
									<label for="notes" class="block text-sm font-medium text-gray-500"
										>Private notes</label>
									<textarea
										name="notes"
										id="notes"
										bind:value={$form.notes}
										type="text"
										rows="6"
										class="w-full rounded-md border-gray-500 p-2"
										placeholder="We met at THAT Conference discussing..." />
									{#if $errors.notes}
										<small class="max-md text-red-500">{$errors.notes}</small>
									{/if}
								</div>
								<div class="mt-2 flex space-x-4">
									<RowButton on:click={() => stopSharingAction()}>Stop Sharing</RowButton>
									<RowButton disabled={$allErrors?.length > 0} type={'submit'}
										>Update Notes</RowButton>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
