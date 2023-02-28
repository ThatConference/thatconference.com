<script>
	export let data;

	let { event } = data;

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.name,
		startDate: event.startDate,
		endDate: event.endDate,
		eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		location: [
			{
				'@type': 'VirtualLocation',
				url: `https://thatconference.com/events/${event.slug}`
			}
		],
		image: [event.logo],
		description: event.description,
		organizer: {
			'@type': 'Organization',
			name: 'THAT Conference',
			url: 'https://thatconference.com'
		}
	};
</script>

<slot />

{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}
