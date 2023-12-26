import orderQueries from '$dataSources/api.that.tech/admin/orders/queries';

export const load = async ({ fetch, params }) => {
	const { id } = params;

	const { queryOrdersByEvent } = orderQueries(fetch);
	const orders = await queryOrdersByEvent({ eventId: id });

	return {
		orders
	};
};
