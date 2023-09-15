import { redirect } from '@sveltejs/kit';
import { events } from '$lib/config.public';

export async function load() {
	throw redirect(302, `/${events.next.wi.slug}/`);
}
