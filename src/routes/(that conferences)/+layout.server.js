import { error } from '@sveltejs/kit';
import eventsApi from '$dataSources/api.that.tech/events/queries';

export const trailingSlash = 'always';
export async function load({ params, url }) {
	const { year } = params;

	let eventSlug;
	let eventName;

	if (url.pathname.startsWith(`/tx`)) {
		eventName = 'tx';
		eventSlug = `tx/${year}`;
	} else if (url.pathname.startsWith(`/wi`)) {
		eventName = 'wi';
		eventSlug = `wi/${year}`;
	}

	const { queryEventWithSpeakersBySlug } = eventsApi();
	const event = await queryEventWithSpeakersBySlug(eventSlug);

	if (!event) throw error(404, 'Event not found');

	return {
		eventName,
		event
	};
}
