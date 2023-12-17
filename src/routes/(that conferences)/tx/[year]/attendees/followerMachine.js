import { createMachine, assign } from 'xstate';

import lodash from 'lodash';

import { log } from '$lib/error';
import createPagingConfig from '$lib/stateMachines/page';

import eventsApi from '$dataSources/api.that.tech/events/queries';

const { uniqBy } = lodash;

function createServices() {
	const { queryEventFollowers } = eventsApi();

	return {
		guards: {
			hasMore: (_, { data }) => data.cursor !== null
		},

		services: {
			loadNext: (context) => queryEventFollowers(context.eventSlug, context.cursor)
		},

		actions: {
			logError: (context, event) =>
				log({
					error: 'followers state machine ended in the error state.',
					extra: { context, event }
				}),

			loadNextSuccess: assign({
				items: (context, { data }) => uniqBy([...context.items, ...data.members], (i) => i.id),
				cursor: (_, { data }) => data.cursor
			}),

			loadedAllSuccess: () => {} // stub action for now.
		}
	};
}

function create({ items = [], cursor = undefined, eventSlug }) {
	const services = createServices();
	return createMachine({ ...createPagingConfig({ items, cursor, eventSlug }) }, { ...services });
}

export default create;
