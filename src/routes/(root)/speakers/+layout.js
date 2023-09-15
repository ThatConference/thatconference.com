import auth0 from '$lib/security/client';
export const load = auth0.withPageAuthRequired();
