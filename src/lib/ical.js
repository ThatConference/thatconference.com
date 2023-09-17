import ical from 'ical-generator'; // https://github.com/sebbo2002/ical-generator
import dayjs from 'dayjs';

const domain = 'thatconference.com/';

function icalWrapper(title) {
	const cal = ical({ domain, name: title });

	function create(activity) {
		cal.createEvent({
			prodId: '//THAT Conference//thatconference.com//EN',
			uid: `that-${activity.id}`,
			start: dayjs(activity.startTime).toDate(),
			end: dayjs(activity.startTime).add(activity.durationInMinutes, 'minutes').toDate(),
			summary: activity.title,
			description: activity.shortDescription,
			location: 'THAT Conference',
			url: `https://thatconference.com/activities/${activity.id}`
		});

		return cal.toURL();
	}

	return { create };
}

export default icalWrapper;
