import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import eventSchema from '$lib/formSchemas/event.js';
import eventMutations from '$dataSources/api.that.tech/admin/events/mutations.js';

export const load = async () => {
	const form = await superValidate(eventSchema);

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const { fetch } = event;

		const form = await superValidate(event, eventSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { createEvent } = eventMutations(fetch);

		let results;

		try {
			results = await createEvent(form.data);
		} catch (error) {
			const errorMessage = {
				type: 'error',
				message: `${error.message}`
			};

			setFlash(errorMessage, event);
			return fail(400, {
				form
			});
		}

		const message = { type: 'success', message: `New Event Created with ID: ${results.id}` };
		throw redirect(303, '/admin/events', message, event);
	}
};
