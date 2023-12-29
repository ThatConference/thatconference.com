import { error } from '@sveltejs/kit';
import orderQueries from '$dataSources/api.that.tech/admin/orders/queries';

import isInRole from '$lib/isInRole';

export const load = async ({ fetch, params, locals }) => {
	const session = await locals.getSession();

	if (!isInRole({ userRoles: session.user?.permissions, requiredRoles: ['admin'] })) {
		throw error(401, 'Required Administrative Privileges');
	}

	const { id } = params;

	const { queryOrdersByEvent } = orderQueries(fetch);
	const orders = await queryOrdersByEvent({ eventId: id });

	return {
		orders
	};
};
