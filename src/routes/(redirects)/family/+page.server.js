import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, `/wi/2024/schedule/?family=true`);
}
