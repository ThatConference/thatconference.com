import { writable } from 'svelte/store';
import memberMutationApi from '$dataSources/api.that.tech/members/mutations';

const store = writable([]);
// const { update } = store;

function createFollowingStore() {
	const { toggleFollowById } = memberMutationApi();

	async function toggleFollow(memberId) {
		const result = await toggleFollowById(memberId);
		if (result) {
			store.update((m) => [memberId, ...m]);
		} else {
			store.update((m) => m.filter((n) => n !== memberId));
		}
		return result;
	}

	return {
		...store,
		toggleFollow
	};
}

export const meFollowingStore = createFollowingStore();
