import { error } from '@sveltejs/kit';
import lodash from 'lodash';
import checkinQueryApi from '$dataSources/api.that.tech/checkin/queries';

import isInRole from '$lib/isInRole';

const { sortBy } = lodash;

export async function load({ params, fetch, locals }) {
	const session = await locals.getSession();

	if (!isInRole({ userRoles: session.user?.permissions, requiredRoles: ['admin', 'volunteer'] })) {
		throw error(401, 'Required Privileges Not Met');
	}

	const { eventName, year } = params;
	const eventSlug = `${eventName}/${year}`;

	const { queryEventRegistrations } = checkinQueryApi(fetch);

	const registrations = await queryEventRegistrations(eventSlug).then((r) =>
		sortBy(r, 'member.lastName')
	);

	return {
		registrations
	};
}
