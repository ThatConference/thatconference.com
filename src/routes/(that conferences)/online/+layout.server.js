import { error } from '@sveltejs/kit';
import eventsApi from '$dataSources/api.that.tech/events/queries';
import partnersApi from '$dataSources/api.that.tech/partner/queries';

export const trailingSlash = 'always';
export async function load({ params }) {
	const { year, state } = params;

	let eventName = 'online';
	let eventSlug = `online/${state}/${year}`;

	const { queryEventWithSpeakersBySlug } = eventsApi();
	const { getEventPartners } = partnersApi();

	const event = await queryEventWithSpeakersBySlug(eventSlug);
	const partners = await getEventPartners(eventSlug);

	if (!event) throw error(404, 'Event not found');

	let { sessions } = event.sessions;
	let keynoters = sessions.filter((session) => session.type === 'KEYNOTE');

	return {
		eventName,
		event,
		keynoters,
		partners
	};
}
