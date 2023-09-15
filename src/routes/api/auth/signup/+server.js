import auth0 from '$lib/security/server';

export const trailingSlash = 'always';

export function GET({ request }) {
	return auth0.handleLogin(request, {
		authorizationParams: {
			screen_hint: 'signup',
			prompt: 'login'
		}
	});
}
