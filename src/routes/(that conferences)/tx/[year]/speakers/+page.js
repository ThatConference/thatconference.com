export async function load({ parent }) {
	let { event } = await parent();

	const { sessions } = event.sessions;

	const speakers = sessions
		.filter((s) => s.status === 'ACCEPTED')
		.reduce((acc, cur) => {
			console.log(cur);
			acc.push(...cur.speakers);

			return acc;
		}, [])
		.filter((s) => s.profileSlug !== 'thatconference');

	return {
		speakers,
		event
	};
}
