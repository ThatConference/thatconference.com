import { redirect } from '@sveltejs/kit';
// import { events } from '$lib/config.public';

export async function load() {
	//todo: grab from the config
	throw redirect(302, `/online/tx/2024`);
}
