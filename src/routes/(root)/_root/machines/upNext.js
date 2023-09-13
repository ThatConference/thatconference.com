import { assign, createMachine } from 'xstate';

import { log } from '$lib/error';
import createConfig from '$lib/stateMachines/page';
import sessionsApi from '$dataSources/api.that.tech/sessions';

function createServices() {
	const { queryNextSessionsByDate } = sessionsApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) =>
				queryNextSessionsByDate({
					cursor: context.cursor,
					pageSize: 6
				})
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'home upnext state machine ended in the error state.',
					extra: { context, event }
				}),

			loadNextSuccess: assign({
				items: (_, { data }) => data.sessions.filter((s) => s),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: assign({
				items: () => [],
				cursor: () => undefined
			})
		}
	};
}

function create({ items = [], cursor = undefined }) {
	const services = createServices();
	return createMachine({ ...createConfig({ items, cursor }) }, { ...services });
}

export default create;
