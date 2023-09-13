import lodash from 'lodash';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';

import primaryProfileSchema from '$lib/formSchemas/primaryProfile';

import meApi from '$dataSources/api.that.tech/me';
import memberApi from '$dataSources/api.that.tech/members/mutations';

const { isNil, isEmpty } = lodash;

async function getProfile({ parent, fetch }) {
	const { queryMe } = meApi(fetch);
	const [me, authUser] = await Promise.all([queryMe(fetch), parent()]);

	let isNewProfile = false;

	if (authUser || me) {
		if (!isNil(me) && !isEmpty(me)) {
			isNewProfile = false;
		} else {
			isNewProfile = true;
		}
	}

	return { isNewProfile, me, authUser };
}

export const load = async (request) => {
	let currentProfile = {};
	const { isNewProfile, me, authUser } = await getProfile(request);

	if (isNewProfile) {
		currentProfile = {
			firstName: authUser.baseUser?.given_name ? authUser.baseUser.given_name : '',
			lastName: authUser.baseUser?.family_name ? authUser.baseUser.family_name : '',
			profileSlug: authUser.baseUser?.nickname ? authUser.baseUser.nickname : '',
			email: authUser.baseUser?.email ? authUser.baseUser.email : ''
		};
	} else {
		currentProfile = me;
	}

	const form = await superValidate(currentProfile, primaryProfileSchema);

	return {
		form,
		isNewProfile
	};
};

export const actions = {
	default: async (event) => {
		const { queryMe } = meApi(event.fetch);
		const { createProfile, updateProfile } = memberApi(event.fetch);

		const form = await superValidate(event, primaryProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let isNewProfile = false;
		const me = await queryMe(fetch);

		if (me) {
			if (!isNil(me) && !isEmpty(me)) {
				isNewProfile = false;
			} else {
				isNewProfile = true;
			}
		}

		if (isNewProfile) {
			await createProfile(form.data);
		} else {
			// these fields cannot be updated.
			delete form.data.profileSlug;
			delete form.data.isOver13;
			delete form.data.acceptedCodeOfConduct;
			delete form.data.acceptedTermsOfService;

			await updateProfile(form.data);
		}

		const message = { type: 'success', message: 'Your system profile has been saved!' };
		throw redirect(303, '/', message, event);
	}
};
