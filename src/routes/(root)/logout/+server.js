import auth0 from '$lib/security/client';

export function GET({ request }) {
	return auth0.handleLogout(request);
}
