import gFetch from '$lib/gfetch';
import { log } from '../utilities/error';

export const MUTATION_UPDATE_SHARED_PROFILE = `
	mutation MUTATION_UPDATE_SHARED_PROFILE ($sharedProfile: SharedProfileUpdateInput!) {
		members {
			member {
				profiles {
					shared {
						update (profile: $sharedProfile) {
							id
							firstName
							lastName
							email
							phone
							city
							state
							company
							country
						}
					}
				}
			}
		}
	}
`;
export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function updateSharedProfile(sharedProfile) {
		const variables = { sharedProfile };
		return client
			.mutation({ mutation: MUTATION_UPDATE_SHARED_PROFILE, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_CHECK_IN_USER' });
					throw new Error('An error occurred while updating your shared profile.');
				}

				let results;

				if (data) {
					const { update } = data.members.member.profiles.shared;
					results = update;
				}

				return results;
			});
	}

	return { updateSharedProfile };
};
