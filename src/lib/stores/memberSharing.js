// Member sharing store
import { writable, get } from 'svelte/store';
import sharingQueryApi from '$dataSources/api.that.tech/memberShareWith/queries';
import sharingMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';

// let { subscribe, set, update } = writable([]);
const store = writable([]);
const { subscribe, set, update } = store;

function createSharingStore() {
	console.log('createSharingStore()');
	const { getSharingData } = sharingQueryApi();

	async function shareMyInfoWith(memberId) {
		const { shareWithByProfile } = sharingMutationApi();
		const result = await shareWithByProfile({ id: memberId });
		if (!result.isSuccess) {
			throw new Error(`Share data with failed: ${result.message}`);
		}

		const data = await getSharingData();
		set(data);
	}

	async function stopSharingWith(memberId) {
		const { removeShareWith } = sharingMutationApi();
		const result = await removeShareWith(memberId);
		if (result !== memberId) {
			throw new Error(`Remove sharing member mismatch error`);
		}

		const data = await getSharingData();
		set(data);
	}

	function isMeSharingWithMember(memberId) {
		let result = -1;
		if (memberId) {
			const data = get(store);
			result = data.findIndex((s) => s?.meSharing?.id === memberId);
		}
		return result >= 0;
	}

	function isMemberSharingWithMe(memberId) {
		let result = -1;
		if (memberId) {
			const data = get(store);
			result = data.findIndex((s) => s?.sharingWithMe?.sharedWithMeProfile?.id === memberId);
		}
		return result >= 0;
	}

	return {
		subscribe,
		set,
		update,
		shareMyInfoWith,
		stopSharingWith,
		isMeSharingWithMember,
		isMemberSharingWithMe
	};
}

export const memberSharingStore = createSharingStore();
