import { error } from '@sveltejs/kit';

import isInRole from '$lib/isInRole';

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!isInRole({ userRoles: session.user?.permissions, requiredRoles: ['admin'] })) {
		throw error(401, 'Required Administrative Privileges');
	}

	return {};
};
