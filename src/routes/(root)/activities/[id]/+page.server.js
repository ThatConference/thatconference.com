import { error } from '@sveltejs/kit';
import sessionsApi from '$dataSources/api.that.tech/sessions';

export async function load({ params, fetch }) {
	const { getById } = sessionsApi(fetch);

	let id = params.id;

	//todo need to figure out how to handle no sessions.. do we return an error, or just pop a message box
	let activity = await getById(id);

	if (!activity || activity?.length < 1) {
		throw error(404, 'Activity not found');
	}

	return {
		activity
	};
}
