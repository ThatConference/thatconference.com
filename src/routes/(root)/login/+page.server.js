import { redirect } from '@sveltejs/kit';

export async function load({ fetch, locals, url }) {
	const returnTo = url.searchParams?.get('returnTo') || '/';
	let _url = '';
	try {
		const session = await locals.getSession();
		if (!session?.user) {
			const tokenCall = await fetch('/auth/csrf');
			const csrfTokenResponse = await new Response(tokenCall.body).json();
			const csrfToken = csrfTokenResponse.csrfToken;

			const formData = new URLSearchParams();
			formData.append('redirect', 'false');
			formData.append('csrfToken', csrfToken);
			formData.append('callbackUrl', returnTo);

			const signInRequest = await fetch('/auth/signin/auth0', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Auth-Return-Redirect': '1'
				},
				body: formData.toString()
			});

			const signInResponse = await new Response(signInRequest.body).json();
			if (signInResponse?.url) {
				_url = signInResponse.url;
			}
		}
	} catch (err) {
		console.error(err);
	}

	if (_url) {
		throw redirect(302, _url);
	}
}
