import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

Sentry.init({
	dsn: 'https://857800ed593d481bb0da2843516d7845@o235190.ingest.sentry.io/4504617287417856',
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()],
	environment: env.PUBLIC_VERCEL_ENV
});

export const handleError = Sentry.handleErrorWithSentry();
