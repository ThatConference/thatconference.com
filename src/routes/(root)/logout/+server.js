import { redirect, error } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

export async function GET({ fetch, locals, url }) {
	let _url = '/';
	try {
		const session = await locals.getSession();

		if (session && !!session.accessToken) {
			const tokenCall = await fetch('/auth/csrf');
			const csrfTokenResponse = await new Response(tokenCall.body).json();
			const csrfToken = csrfTokenResponse.csrfToken;

			const formData = new URLSearchParams();
			formData.append('redirect', 'false');
			formData.append('callbackUrl', `${url.origin}`);
			formData.append('csrfToken', csrfToken);

			const signOutRequest = await fetch('/auth/signout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Auth-Return-Redirect': '1'
				},
				body: formData.toString()
			});
			const signOutResponse = await new Response(signOutRequest.body).json();

			if (signOutResponse?.url) {
				_url = signOutResponse.url;
			}
		}
	} catch (err) {
		Sentry.setContext('error', { err });
		throw error(500, 'Authentication Logout Error');
	}

	if (_url) {
		throw redirect(302, _url);
	}
}
