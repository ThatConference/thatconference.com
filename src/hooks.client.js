import * as Sentry from '@sentry/sveltekit';
import { logging } from '$lib/config.public';

Sentry.init({
	dsn: logging.dsn,
	attachStacktrace: true,
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()],
	environment: logging.environment,
	denyUrls: logging.denyUrls
});

export const handleError = Sentry.handleErrorWithSentry();
