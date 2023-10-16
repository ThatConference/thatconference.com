import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.getSession();

	if (!session?.idToken) {
		throw redirect(302, '/logout');
	}

	return {
		session
	};
}
