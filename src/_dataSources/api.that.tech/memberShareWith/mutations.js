import gFetch from '$lib/gfetch';
import { log } from '../utilities/error';

const secureProfileFields = `
	fragment secureProfileFields on SecureProfile {
		... on PrivateProfile {
			__typename
			id
			firstName
			lastInitial
		}
		... on PublicProfile {
			__typename
			id
			firstName
			lastName
			profileSlug
		}
	}
`;
export const MUTATION_ADD_SHARE_WITH_BY_PIN = `
	${secureProfileFields}
	mutation addShareWithPin($shareWith: ShareWithByPinInput!) {
		members {
			network {
				add {
					pin(shareWith: $shareWith) {
						__typename
						isSuccess
						message
						sharedWith {
							__typename
							createdAt
							lastUpdatedAt
							notes
							sharingWithProfile {
								...secureProfileFields
							}
						}
					}
				}
			}
		}
	}
`;
export const MUTATION_ADD_SHARE_WITH_PROFILE = `
	${secureProfileFields}
	mutation addShareWithProfile($shareWith: ShareWithByProfileInput!) {
		members {
			network {
				add {
					profile(shareWith: $shareWith) {
						__typename
						isSuccess
						message
						sharedWith {
							__typename
							createdAt
							lastUpdatedAt
							notes
							sharingWithProfile {
								...secureProfileFields
							}
						}
					}
				}
			}
		}
	}
`;
export const MUTATION_UPDATE_SHARE_WITH = `
	${secureProfileFields}	
	mutation updateShareWith($memberId: ID!, $shareWithData: ShareWithUpdateInput!) {
		members {
			network {
				sharingWith (sharedWithId: $memberId) {
					update(shareWith: $shareWithData) {
						notes
						sharingWithProfile {
							...secureProfileFields
						}
						createdAt
						lastUpdatedAt
					}
				 } 
			}
		}
	}
`;
export const MUTATION_REMOVE_SHARE = `
	mutation removeShareWith($memberId: ID!) {
		members {
			network {
				sharingWith (sharedWithId: $memberId) {
					remove
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function shareWithByPin(shareWith) {
		const variables = { shareWith };
		return client
			.mutation({ mutation: MUTATION_ADD_SHARE_WITH_BY_PIN, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_ADD_SHARE_WITH' });
					throw new Error('An error occurred while sharing your information');
				}

				return data.members.network.add.pin;
			});
	}

	function shareWithByProfile(shareWith) {
		const { id, profileSlug, notes } = shareWith;
		const variables = {
			shareWith: {
				shareWithMember: {
					id: id ?? null,
					slug: profileSlug ?? null
				},
				notes: notes ?? ''
			}
		};

		return client
			.mutation({ mutation: MUTATION_ADD_SHARE_WITH_PROFILE, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_ADD_SHARE_WITH_PROFILE' });
					throw new Error('An error occurred while sharing your information');
				}

				return data.members.network.add.profile;
			});
	}

	function updateShareWith(memberId, notes = '') {
		const variables = {
			memberId,
			shareWithData: {
				notes
			}
		};

		return client
			.mutation({ mutation: MUTATION_UPDATE_SHARE_WITH, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_UPDATE_SHARE_WITH' });
					throw new Error('An error occurred while updating share information');
				}

				return data.members.network.sharingWith.update;
			});
	}

	function removeShareWith(memberId) {
		const variables = { memberId };
		return client
			.mutation({ mutation: MUTATION_REMOVE_SHARE, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_REMOVE_SHARE' });
					throw new Error('An error occurred removing the share');
				}

				return data.members.network.sharingWith.remove;
			});
	}

	return {
		shareWithByPin,
		shareWithByProfile,
		updateShareWith,
		removeShareWith
	};
};
