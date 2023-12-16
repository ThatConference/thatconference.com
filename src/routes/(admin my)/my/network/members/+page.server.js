import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import sharingFormSchema from '$lib/formSchemas/sharingForm.js';
import sharingQueryApi from '$dataSources/api.that.tech/memberShareWith/queries';
import sharingMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';

export async function load({ fetch }) {
	const { getSharingData } = sharingQueryApi(fetch);

	const sharing = await getSharingData();

	return {
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
