import eventQueries from '$dataSources/api.that.tech/events/queries';

export const load = async ({ fetch }) => {
	const { queryEventsByCommunity } = eventQueries(fetch);

	const events = await queryEventsByCommunity();
	return {
		events
	};
};
