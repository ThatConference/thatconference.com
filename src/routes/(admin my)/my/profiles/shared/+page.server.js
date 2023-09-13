import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import meQueryApi from '$dataSources/api.that.tech/me/queries';
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
	default: async ({ request }) => {
		const form = await superValidate(request, sharedProfileSchema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return { form };
	}
};
