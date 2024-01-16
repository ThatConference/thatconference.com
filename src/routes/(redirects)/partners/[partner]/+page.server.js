import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	let { partner } = params;

	throw redirect(302, `/sponsors/${partner}/`);
}
