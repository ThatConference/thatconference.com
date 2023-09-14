import lodash from 'lodash';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import meApi from '$dataSources/api.that.tech/me';

import publicProfileSchema from '$lib/formSchemas/publicProfile';

const { isNil, isEmpty } = lodash;

export const load = async ({ parent, fetch }) => {
	console.log('in load');
	const { queryMe } = meApi(fetch);
	const me = await queryMe(fetch);

	let isNewProfile, currentProfile;
	let { user } = await parent();

	if (user || me) {
		if (!isNil(me) && !isEmpty(me)) {
			currentProfile = me;
			isNewProfile = false;
		} else {
			currentProfile = {
				firstName: user.baseUser?.given_name ? user.baseUser.given_name : '',
				lastName: user.baseUser?.family_name ? user.baseUser.family_name : '',
				profileSlug: user.baseUser?.nickname ? user.baseUser.nickname : '',
				email: user.baseUser?.email ? user.baseUser.email : ''
			};
			isNewProfile = true;
		}
	}

	const form = await superValidate(currentProfile, publicProfileSchema);

	return {
		form,
		isNewProfile,
		currentProfile
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, publicProfileSchema);
		console.log('POST', JSON.stringify(form.data));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		return { form };
	}
};
