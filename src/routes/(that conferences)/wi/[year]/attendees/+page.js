export async function load({ parent, params }) {
	let { event } = await parent();
	let { year } = params;

	return {
		event,
		followers: event.followers,
		eventSlug: `wi/${year}`
	};
}
