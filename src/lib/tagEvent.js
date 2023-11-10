import va from '@vercel/analytics';
import { browser } from '$app/environment';

export function tagEvent(event, category) {
	if (browser) {
		va.track(`${category}:${event}`);
	}
}
