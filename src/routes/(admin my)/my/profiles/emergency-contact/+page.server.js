import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import meQueryApi from '$dataSources/api.that.tech/me/queries';
import membersMutationApi from '$dataSources/api.that.tech/members/mutations';
import emergencyContactSchema from '$lib/formSchemas/emergencyContact';

export async function load({ fetch }) {
	const { queryMeEmergencyContact } = meQueryApi(fetch);

	let emergencyContactInformation = await queryMeEmergencyContact();
	const form = await superValidate(emergencyContactInformation, emergencyContactSchema);

	return {
		form
	};
}

export const actions = {
	default: async (event) => {
		const { updateEmergencyContact } = membersMutationApi(event.fetch);

		const form = await superValidate(event, emergencyContactSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await updateEmergencyContact(form.data);

			const successMessage = {
				type: 'success',
				message: `Your emergency contact information has been updated.`
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
