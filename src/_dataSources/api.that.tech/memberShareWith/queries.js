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
			profileImage
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

	const getSharingData = async () => {
		const [meSharing, sharingWithMe] = await Promise.all([getMeSharingWith(), getSharingWithMe()]);
		let index = 1;
		const sharing = [];
		sharingWithMe.forEach((swm) => {
			let meShareResult = null;
			const meSharingToo =
				meSharing.find((ms) => ms.sharingWithProfile.id === swm.sharedWithMeProfile.id) ?? null;

			if (meSharingToo) {
				meSharingToo.isTwoWayShare = true;
				meShareResult = {
					notes: meSharingToo?.notes,
					...meSharingToo?.sharingWithProfile
				};
			}

			sharing.push({
				index,
				sharingWithMe: {
					sharedWithMeProfile: swm.sharedWithMeProfile,
					createdAt: swm.createdAt,
					...swm.sharedWithMeSharedProfile
				},
				meSharing: meShareResult
			});

			index += 1;
		});

		meSharing.forEach((ms) => {
			if (!ms.isTwoWayShare) {
				sharing.push({
					index,
					sharingWithMe: null,
					meSharing: {
						notes: ms.notes,
						...ms.sharingWithProfile
					}
				});

				index += 1;
			}
		});

		return sharing;
	};

	return {
		getMeSharingWith,
		getSharingWithMe,
		getSharingData
	};
};

/* sharing data object
{
	"index": 0 // index reference for network members page
	"sharingWithMe": {
		"sharedWithMeProfile": {
			"__typename": "PrivateProfile", (or PublicProfile)
			"id": "memberId",
			"firstName": "First Name",
			"lastInitial": "S"
		},
		"createdAt": "iso data string",
		"__typename": "SharedProfile",
		"firstName": "FirstName",
		"lastName": "LastName",
		"email": "EmailAddress",
		"company": null,
		"phone": null,
		"city": null,
		"state": null,
		
		/*"country": null
	},
	"meSharing": {
		"notes": "Private Notes about who I am sharing with",
		"__typename": "PublicProfile", (or PrivateProfile)
		"id": "MemberId",
		"firstName": "FirstName",
		"lastName": "LastName",
		"profileSlug": "slug",
	}
},
*/
