import gFetch from '$lib/gfetch';
import { log } from '../../utilities/error';

export const MUTATION_CREATE_EVENT = `
	mutation MUTATION_CREATE_EVENT($event: EventCreateInput!) {
		events {
			create(event: $event) {
				id
			}
		}
	}
`;

export const MUTATION_UPDATE_EVENT = `
	mutation MUTATION_UPDATE_EVENT($eventId: ID! $event: EventUpdateInput!) {
		events {
			event(id: $eventId) {
				update(event: $event) {
					id
				}
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function createEvent(event) {
		const variables = {
			event
		};

		return client
			.secureQuery({ query: MUTATION_CREATE_EVENT, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_CREATE_EVENT' });
					throw new Error('Create Event Failed');
				}

				return data.events.create;
			});
	}

	function updateEvent(eventId, event) {
		const variables = {
			eventId,
			event
		};

		return client
			.secureQuery({ query: MUTATION_UPDATE_EVENT, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'MUTATION_UPDATE_EVENT' });
					throw new Error('Update Event Failed');
				}

				return data.events.event.update;
			});
	}

	return {
		createEvent,
		updateEvent
	};
};
