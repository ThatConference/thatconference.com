import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	console.log('⚡ checking auth at /my layout.server.js');
	const session = await locals.getSession();
	const returnTo = url.searchParams?.get('returnTo') ?? '/';
	if (!session) {
		redirect(303, `/login-redirect?returnTo=${returnTo}`);
	}
}
