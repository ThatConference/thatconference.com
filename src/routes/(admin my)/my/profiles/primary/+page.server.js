import lodash from 'lodash';
import { fail } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';

import primaryProfileSchema from '$lib/formSchemas/primaryProfile';

import meApi from '$dataSources/api.that.tech/me';
import memberApi from '$dataSources/api.that.tech/members/mutations';
import memberApiQueries from '$dataSources/api.that.tech/members/queries';

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
	const { isNewProfile, me } = await getProfile(request);

	if (isNewProfile) {
		currentProfile = undefined;
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
		const { isSlugTaken } = memberApiQueries(event.fetch);

		const form = await superValidate(event, primaryProfileSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let isNewProfile = false;
		const me = await queryMe();

		if (!isNil(me) && !isEmpty(me)) {
			isNewProfile = false;
		} else {
			// this is a new profile
			isNewProfile = true;

			// we need to validate the slug hasn't already been taken.
			const isTaken = await isSlugTaken(form.data.profileSlug);

			if (isTaken) {
				setError(form, 'profileSlug', 'This member slug is already taken.');
				return fail(400, {
					form
				});
			}
		}

		try {
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
		} catch (error) {
			const errorMessage = {
				type: 'error',
				message: `Whoops!!! ${error.message}`
			};

			throw redirect(errorMessage, event);
		}
	}
};
