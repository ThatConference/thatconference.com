/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	let { event, eventName } = await parent();
	let speakers = event.speakers;
	let { sessions } = event.sessions;
	let keynoters = sessions.filter((session) => session.type === 'KEYNOTE');

	return {
		event,
		eventName,
		sessions,
		keynoters,
		speakers
	};
}
