import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, `/call-for-speakers/wi/2024`);
}
