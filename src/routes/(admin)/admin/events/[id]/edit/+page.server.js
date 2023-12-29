import { fail, error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import eventQueries from '$dataSources/api.that.tech/admin/events/queries.js';
import eventSchema from '$lib/formSchemas/event.js';
import eventMutations from '$dataSources/api.that.tech/admin/events/mutations.js';

import isInRole from '$lib/isInRole';

export const load = async ({ params, fetch, locals }) => {
	const session = await locals.getSession();

	if (!isInRole({ userRoles: session.user?.permissions, requiredRoles: ['admin'] })) {
		throw error(401, 'Required Administrative Privileges');
	}

	const { id } = params;

	const { getEventById } = eventQueries(fetch);
	const event = await getEventById(id);

	if (!event) {
		throw error(404, {
			message: 'Event Not Found'
		});
	}

	const form = await superValidate(event, eventSchema);

	return {
		form,
		name: event.name,
		startDate: event.startDate
	};
};

export const actions = {
	default: async (event) => {
		const { fetch, params } = event;
		const { id } = params;

		const form = await superValidate(event, eventSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { updateEvent } = eventMutations(fetch);

		try {
			await updateEvent(id, form.data);
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

		const message = { type: 'success', message: `Event Updated` };
		throw redirect(303, '/admin/events', message, event);
	}
};
