import gFetch from '$lib/gfetch';
import { log } from '../../utilities/error';

export const QUERY_EVENT_BY_ID = `
	query QUERY_EVENT_BY_ID ($eventId: ID) {
		events {
			event (findBy: {id: $eventId}) {
				get {
					name
					description
					slogan
					slug
					startDate
					endDate
					year
					venues {
						id
					}
					email
					phoneNumber
					website
					logo
					checkoutSuccess
					checkoutCancel
					emailTemplateTicketPurchased
					voteOpenDate
					voteCloseDate
					callForSpeakersOpenDate
					callForSpeakersCloseDate
					callForOnSpeakersOpenDate
					callForOnSpeakersCloseDate
					ticketsOnSaleFrom
					ticketsOnSaleUntil
					isTicketRequiredToMutate
					isTicketRequiredToJoin
					canMembershipMutate
					canMembershipJoin
					isActive
					isFeatured
					community
					type
				}
			}
		}
	}
	
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function getEventById(eventId) {
		const variables = {
			eventId
		};

		return client.secureQuery({ query: QUERY_EVENT_BY_ID, variables }).then(({ data, errors }) => {
			if (errors) {
				log({ errors, tag: 'QUERY_EVENT_BY_ID' });
				throw new Error('QUERY_EVENT_BY_ID');
			}

			return data.events.event?.get;
		});
	}

	return {
		getEventById
	};
};
