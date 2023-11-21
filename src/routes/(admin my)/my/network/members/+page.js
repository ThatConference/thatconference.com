import sharingQueryApi from '$dataSources/api.that.tech/memberShareWith/queries';

export async function load({ fetch }) {
	const { getMeSharingWith, getSharingWithMe } = sharingQueryApi(fetch);

	let meSharing;
	let sharingWithMe;
	try {
		[meSharing, sharingWithMe] = await Promise.all([getMeSharingWith(), getSharingWithMe()]);
	} catch (err) {
		console.log(err);
	}

	// console.log('sharingWithMe', sharingWithMe);
	// console.log('meSharing', meSharing);

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

	return {
		meSharing,
		sharingWithMe,
		sharing
	};
}
