import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(302, `/wi/2023/schedule/?family=true`);
}
