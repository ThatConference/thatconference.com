import * as Sentry from '@sentry/sveltekit';
import config, { logging } from '$lib/config.public';

Sentry.init({
	enabled: config.nodeEnv !== 'development',
	dsn: logging.dsn,
	environment: logging.environment,
	attachStacktrace: true,
	denyUrls: logging.denyUrls,
	enableTracing: false,
	tracesSampleRate: 0
});

export const handleError = Sentry.handleErrorWithSentry();
