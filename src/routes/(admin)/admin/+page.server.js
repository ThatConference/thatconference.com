/* This empty page is intentional
 * having this +page.server page here forces the hooks.server handler to execute
 * regardless if page.svelte is fully loaded or not
 * https://github.com/sveltejs/kit/issues/6315
 */

import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	const session = await locals.getSession();

	if (!session) {
		redirect(303, `/login-redirect?returnTo=${url.pathname}`);
	}

	if (!session.user?.permissions.includes('admin')) {
		throw error(401, 'requires admin');
	}
}
