import membersApi from '$dataSources/api.that.tech/members/queries';
import eventsApi from '$dataSources/api.that.tech/events/queries';
import sessionsApi from '$dataSources/api.that.tech/sessions';
import communityQueryApi from '$dataSources/api.that.tech/community/queries';
import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { queryActiveThatEvents } = communityQueryApi(fetch);
	const { queryMembers } = membersApi(fetch);
	const { queryEventsByCommunity } = eventsApi(fetch);
	const { querySessionsByDate } = sessionsApi(fetch);
	const { getUpcomingPartners } = partnersApi(fetch);

	const [members, events, thatActiveEvents, activitiesUpNext, sponsors] = await Promise.all([
		queryMembers(15),
		queryEventsByCommunity(),
		queryActiveThatEvents(),
		querySessionsByDate({ pageSize: 6 }),
		getUpcomingPartners()
	]);

	const filteredEvents = thatActiveEvents.filter((x) => x.type === 'HYBRID_MULTI_DAY');

	return {
		members: members.members,
		events,
		thatActiveEvents: filteredEvents,
		activitiesUpNext,
		sponsors
	};
}
