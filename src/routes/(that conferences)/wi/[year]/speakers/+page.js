export async function load({ parent }) {
	let { event } = await parent();

	return {
		speakers: event.speakers,
		event
	};
}
