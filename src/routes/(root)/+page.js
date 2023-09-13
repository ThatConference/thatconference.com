import membersApi from '$dataSources/api.that.tech/members/queries';
import eventsApi from '$dataSources/api.that.tech/events/queries';
import statsApi from '$dataSources/api.that.tech/stats/queries';
import sessionsApi from '$dataSources/api.that.tech/sessions';
import communityQueryApi from '$dataSources/api.that.tech/community/queries';
import partnersApi from '$dataSources/api.that.tech/partner/queries';

export async function load({ fetch }) {
	const { queryActiveThatEvents } = communityQueryApi(fetch);
	const { queryMembers } = membersApi(fetch);
	const { queryEventsByCommunity } = eventsApi(fetch);
	const { queryCommunityStats } = statsApi(fetch);
	const { querySessionsByDate } = sessionsApi(fetch);
	const { getUpcomingPartners } = partnersApi(fetch);

	// todo - some of these graph calls could be combined.
	// todo - we could pick off the cfp from the event already queried.
	// todo - "up next event" should come from somewhere.

	const [members, events, stats, thatActiveEvents, activitiesUpNext, sponsors] = await Promise.all([
		queryMembers(15),
		queryEventsByCommunity(),
		queryCommunityStats(),
		queryActiveThatEvents(),
		querySessionsByDate({ pageSize: 6 }),
		getUpcomingPartners()
	]);

	const filteredEvents = thatActiveEvents.filter((x) => x.type === 'HYBRID_MULTI_DAY');

	return {
		members: members.members,
		events,
		stats,
		thatActiveEvents: filteredEvents,
		activitiesUpNext,
		sponsors
	};
}
