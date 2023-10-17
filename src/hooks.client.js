import * as Sentry from '@sentry/sveltekit';
import { logging } from '$lib/config.public';

Sentry.init({
	dsn: logging.dsn,
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()],
	environment: logging.environment
});

export const handleError = Sentry.handleErrorWithSentry();
