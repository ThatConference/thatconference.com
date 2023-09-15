import auth0 from '$lib/security/client';

export const trailingSlash = 'always';

export function GET({ request }) {
	return auth0.handleLogout(request);
}
