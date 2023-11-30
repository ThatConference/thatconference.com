import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import sharingFormSchema from '$lib/formSchemas/sharingForm.js';
import sharingQueryApi from '$dataSources/api.that.tech/memberShareWith/queries';
import sharingMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';

export async function load({ fetch }) {
	const { getMeSharingWith, getSharingWithMe } = sharingQueryApi(fetch);

	let meSharing;
	let sharingWithMe;

	try {
		[meSharing, sharingWithMe] = await Promise.all([getMeSharingWith(), getSharingWithMe()]);
	} catch (err) {
		const errorMessage = {
			type: 'error',
			message: `Whoops!!! ${err.message}`
		};

		throw redirect(errorMessage, event);
	}

	let index = 1;
	const sharing = [];

	sharingWithMe.forEach((swm) => {
		let meShareResult = null;
		const meSharingToo =
			meSharing.find((ms) => ms.sharingWithProfile.id === swm.sharedWithMeProfile.id) ?? null;

		if (meSharingToo) {
			meSharingToo.isTwoWayShare = true;
			meShareResult = {
				notes: meSharingToo?.notes,
				...meSharingToo?.sharingWithProfile
			};
		}

		sharing.push({
			index,
			sharingWithMe: {
				sharedWithMeProfile: swm.sharedWithMeProfile,
				createdAt: swm.createdAt,
				...swm.sharedWithMeSharedProfile
			},
			meSharing: meShareResult
		});

		index += 1;
	});

	meSharing.forEach((ms) => {
		if (!ms.isTwoWayShare) {
			sharing.push({
				index,
				sharingWithMe: null,
				meSharing: {
					notes: ms.notes,
					...ms.sharingWithProfile
				}
			});
			index += 1;
		}
	});

	return {
		meSharing,
		sharingWithMe,
		sharing
	};
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, sharingFormSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const { updateShareWith } = sharingMutationApi(event.fetch);
			const { id: memberId, notes } = form.data;
			await updateShareWith(memberId, notes);

			const successMessage = {
				type: 'success',
				message: `Connection updated.`
			};

			setFlash(successMessage, event);
			return { form };
		} catch (err) {
			const errorMessage = {
				type: 'error',
				message: `Whoops!!! ${err.message}`
			};

			throw redirect(errorMessage, event);
		}
	}
};
