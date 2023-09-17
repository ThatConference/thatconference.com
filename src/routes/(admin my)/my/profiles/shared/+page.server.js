import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import meQueryApi from '$dataSources/api.that.tech/me/queries';
import meMutationsApi from '$dataSources/api.that.tech/me/mutations';
import sharedProfileSchema from '$lib/formSchemas/sharedProfile';

export async function load({ fetch }) {
	const { queryMeSharedProfile } = meQueryApi(fetch);

	let sharedProfile = await queryMeSharedProfile();
	let form = await superValidate(sharedProfile, sharedProfileSchema);

	return {
		sharedProfile,
		form
	};
}

export const actions = {
	default: async (event) => {
		const { updateSharedProfile } = meMutationsApi(event.fetch);

		const form = await superValidate(event, sharedProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await updateSharedProfile(form.data);

			const successMessage = {
				type: 'success',
				message: `Your shared profile contact information has been updated.`
			};

			setFlash(successMessage, event);
			return { form };
		} catch (error) {
			const errorMessage = {
				type: 'error',
				message: `Whoops!!! ${error.message}`
			};

			throw redirect(errorMessage, event);
		}
	}
};
