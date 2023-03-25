import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export function formatActivityInitialInput(currentData) {
	const {
		event: { id, startDate, endDate },
		durationInMinutes,
		startTime,
		title,
		shortDescription,
		tags,
		targetAudience,
		isMinor,
		canRecord
	} = currentData;

	const initDurationInMinutes = durationInMinutes
		? dayjs.utc(dayjs.duration(durationInMinutes, 'minutes').asMilliseconds()).format('H:mm')
		: undefined;

	const results = {
		...currentData,
		event: {
			id,
			startDate,
			endDate
		},
		title: title || '',
		shortDescription: shortDescription || '',
		tags: tags || [],
		selectedDay: startTime ? dayjs(startTime).format('YYYY-MM-DD') : undefined,
		selectedTime: startTime ? dayjs(startTime).format('HH:mm') : undefined,
		selectedTimezone: dayjs.tz.guess(),
		selectedDuration: initDurationInMinutes,
		targetAudience: targetAudience || [],
		canRecord: canRecord || false,
		isMinor: isMinor || false
	};

	return results;
}
