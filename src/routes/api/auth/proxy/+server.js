import auth0 from '$utils/security/server';
import { json, error } from '@sveltejs/kit';
import fetch from 'isomorphic-fetch';
import config from '$utils/config.public';
import * as Sentry from '@sentry/svelte';

export const trailingSlash = 'always';

export async function POST({ request }) {
	console.log('🧨 proxy post call');
	const body = await request.json();
	console.log('🧨 proxy, body sending along', body);

	try {
		const { accessToken } = await auth0.getAccessToken(request);

		if (!accessToken) {
			throw error(401, 'Unauthorized Access');
		}
		console.log('🧨 proxy, have accessToken', accessToken);

		const results = await fetch(config.api.direct, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(body)
		})
			.then(async (r) => {
				if (!r.ok) console.log('🧨 response text body', await r.text());
				return r.json();
			})
			.catch((err) => {
				console.error('PROXY POST ERROR', err);

				Sentry.setContext('query', body);
				Sentry.captureException(new Error(err));

				throw error(500, err);
			});

		return json(results);
	} catch (err) {
		console.error('AUTH0 EXCEPTION', err?.message);

		Sentry.setContext('AUTH0 GetAccessToken Exception body', body);
		Sentry.setContext('AUTH0 Exception-HEADERS', request?.headersList);
		Sentry.setContext('whole r', { r: request });
		//Sentry.captureMessage(err.message);
		Sentry.captureException(err);

		return json({});
	}
}
