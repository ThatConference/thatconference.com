import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://15d4b436dc0a4366a0ac388c65772926@o235190.ingest.sentry.io/5357492',
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()]
});

export const handleError = Sentry.handleErrorWithSentry();
