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
		}
	}
`;

export const QUERY_ME_SHARING_WITH = `
	${secureProfileFields}
	query meSharingWith {
		members {
			network {
				sharedByMe {
					notes
					sharingWithProfile {
						...secureProfileFields
					}
				}
			}
		}
	}
`;

export const QUERY_SHARING_WITH_ME = `
	${secureProfileFields}
	query sharingWithMe {
		members {
			network {
				sharedWithMe {
					sharedWithMeProfile {
						...secureProfileFields
					}
				
					sharedWithMeSharedProfile {
						__typename
						firstName
						lastName
						email
						company
						phone
						city
						state
						country
					}
					createdAt
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	const getMeSharingWith = () => {
		return client
			.secureQuery({ query: QUERY_ME_SHARING_WITH, variables: {} })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_SHARING_WITH_ME' });

				return data.members.network.sharedByMe;
			});
	};

	const getSharingWithMe = () => {
		return client
			.secureQuery({ query: QUERY_SHARING_WITH_ME, variables: {} })
			.then(({ data, errors }) => {
				if (errors) log({ errors, tag: 'QUERY_SHARING_WITH_ME' });

				return data.members.network.sharedWithMe;
			});
	};

	return {
		getMeSharingWith,
		getSharingWithMe
	};
};
