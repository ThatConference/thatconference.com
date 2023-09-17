import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import memberApi from '$dataSources/api.that.tech/members/mutations';
import meApi from '$dataSources/api.that.tech/me';

import publicProfileSchema from '$lib/formSchemas/publicProfile';

export const load = async ({ fetch }) => {
	const { queryMe } = meApi(fetch);
	const me = await queryMe();

	const form = await superValidate(me, publicProfileSchema);

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const { updateProfile } = memberApi(event.fetch);

		const form = await superValidate(event, publicProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await updateProfile(form.data);

			const successMessage = {
				type: 'success',
				message: `Your public profile has been updated.`
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
