import gFetch from '$lib/gfetch';
import { QUERY_ME } from '$dataSources/api.that.tech/me';
import sharingQueryApi from '$dataSources/api.that.tech/memberShareWith/queries';
import meQueryApi from '$dataSources/api.that.tech/me/queries';
import { loadFlashMessage } from 'sveltekit-flash-message/server';

async function queryMe(_fetch) {
	// @HERE

	const body = {
		query: `
		${QUERY_ME}
		`,
		variables: {}
	};
	const client = _fetch ? gFetch(_fetch) : gFetch();
	return await client.secureQuery(body).then((results) => results.data.members?.me);
}

export const load = loadFlashMessage(async (event) => {
	let { locals, fetch } = event;
	const auth0Session = await locals.getSession();
	const { getSharingData } = sharingQueryApi(fetch);
	const { queryMeFollowingMembers } = meQueryApi(fetch);

	let user = {
		isAuthenticated: !!auth0Session?.user,
		baseUser: auth0Session?.user || {},
		profile: auth0Session?.thatProfile || {},
		accessToken: auth0Session?.accessToken || {}
	};
	let memberSharing = [];
	let meFollowing = [];

	if (user.isAuthenticated) {
		[user.profile, memberSharing, meFollowing] = await Promise.all([
			queryMe(fetch),
			getSharingData(),
			queryMeFollowingMembers()
		]);
	}

	locals.user = user;

	return {
		user,
		memberSharing,
		meFollowing
	};
});
