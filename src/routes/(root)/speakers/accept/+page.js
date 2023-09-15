import { error } from '@sveltejs/kit';
import speakerQueriesApi from '$dataSources/api.that.tech/speakers/queries';
import eventQueriesApi from '$dataSources/api.that.tech/events/queries';
import meQueryApi from '$dataSources/api.that.tech/me/queries';

export async function load({ url, fetch }) {
	const eventSlug = url.searchParams.has('eventSlug') ? url.searchParams.get('eventSlug') : null;

	if (eventSlug == null) throw error(404, 'Invalid Event');

	const { queryMyAcceptedSpeaker } = speakerQueriesApi(fetch);
	const { queryEventForAcceptedSpeaker } = eventQueriesApi(fetch);
	const { queryMeEmergencyContact } = meQueryApi(fetch);

	const [acceptedSpeaker, eventDetails, currentEmergencyContact] = await Promise.all([
		queryMyAcceptedSpeaker(eventSlug),
		queryEventForAcceptedSpeaker(eventSlug),
		queryMeEmergencyContact()
	]);

	if (!acceptedSpeaker) throw error(404, 'Counselor Not Found');

	return {
		acceptedSpeaker,
		eventDetails,
		currentEmergencyContact
	};
}
