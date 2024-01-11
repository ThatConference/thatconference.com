export async function load({ parent }) {
	let { event } = await parent();

	const { sessions } = event.sessions;

	const speakers = sessions
		.filter((s) => s.status === 'ACCEPTED')
		.reduce((acc, cur) => {
			acc.push(...cur.speakers);

			return acc;
		}, [])
		.filter((s) => s.profileSlug !== 'thatconference')
		.reduce((acc, cur) => {
			if (!acc.find((speaker) => speaker.id === cur.id)) {
				acc.push(cur);
			}

			return acc;
		}, []);

	return {
		speakers,
		event
	};
}
