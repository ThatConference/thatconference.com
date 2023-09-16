import auth0 from '$lib/security/server';

export function GET({ request }) {
	return auth0.handleCallback(request);
}
