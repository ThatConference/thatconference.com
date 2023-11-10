import eventsApi from '$dataSources/api.that.tech/events/queries';

export async function load({ fetch }) {
	const { queryEventsForVenueAndProducts } = eventsApi(fetch);

	const events = await queryEventsForVenueAndProducts();

	return {
		events
	};
}
