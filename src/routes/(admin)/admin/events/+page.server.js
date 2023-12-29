import eventQueries from '$dataSources/api.that.tech/events/queries';
import { error, redirect } from '@sveltejs/kit';

import isInRole from '$lib/isInRole';

export const load = async ({ locals, fetch, url }) => {
	const session = await locals.getSession();

	if (!session) {
		redirect(303, `/login-redirect?returnTo=${url.pathname}`);
	}

	if (!isInRole({ userRoles: session.user?.permissions, requiredRoles: ['admin', 'volunteer'] })) {
		throw error(401, 'Required Privileges Not Met');
	}

	const { queryEventsByCommunity } = eventQueries(fetch);

	const events = await queryEventsByCommunity();
	return {
		events
	};
};
