import { redirect, error } from '@sveltejs/kit';

import isInRole from '$lib/isInRole';

export async function load({ locals, url }) {
	const session = await locals.getSession();

	if (!isInRole({ userRoles: session.user?.permissions, requiredRoles: ['admin', 'volunteer'] })) {
		throw error(401, 'Required Privileges Not Met');
	}

	if (!session) {
		redirect(303, `/login-redirect?returnTo=${url.pathname}`);
	}
}
