import ical from 'ical-generator'; // https://github.com/sebbo2002/ical-generator
import dayjs from 'dayjs';

const domain = 'that.us';

function icalWrapper(title) {
	const cal = ical({ domain, name: title });

	function create(activity) {
		cal.createEvent({
			prodId: '//THAT Conference//THATConference.com//EN',
			uid: `that-${activity.id}`,
			start: dayjs(activity.startTime).toDate(),
			end: dayjs(activity.startTime).add(activity.durationInMinutes, 'minutes').toDate(),
			summary: activity.title,
			description: activity.shortDescription,
			location: 'THAT.us',
			url: `https://thatconference.com/activities/${activity.id}`
		});

		return cal.toURL();
	}

	return { create };
}

export default icalWrapper;
