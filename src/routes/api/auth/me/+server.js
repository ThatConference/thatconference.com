import auth0 from '$lib/security/server';

export const trailingSlash = 'always';

export function GET({ request }) {
	return auth0.handleProfile(request, { refetch: true });
}
