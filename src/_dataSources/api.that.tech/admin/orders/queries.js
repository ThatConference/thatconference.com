import gFetch from '$lib/gfetch';
import { log } from '../../utilities/error';

const defaultPageSize = 1000;

export const QUERY_ORDERS_BY_EVENT = `
	query QUERY_ORDERS_BY_EVENT($eventId: ID!, $pageSize: Int, $cursor: String) {
		orders {
			all(pageSize: $pageSize, eventId: $eventId, cursor: $cursor) {
				orders {
					id
					member {
						firstName
						lastName
						email
					}
					lineItems {
						product {
							...on ProductBase {
								name
							}
						}
						isBulkPurchase
						quantity
					}
					orderDate
					createdAt
					status
					orderType
					total
				}
				count
				cursor
			}
		}
	}
`;

export default (fetch) => {
	const client = fetch ? gFetch(fetch) : gFetch();

	function queryOrdersByEvent({ cursor, eventId, pageSize = defaultPageSize }) {
		const variables = {
			pageSize,
			cursor,
			eventId
		};

		return client
			.secureQuery({ query: QUERY_ORDERS_BY_EVENT, variables })
			.then(({ data, errors }) => {
				if (errors) {
					log({ errors, tag: 'QUERY_ORDERS_BY_EVENT' });
					throw new Error('QUERY_ORDERS_BY_EVENT');
				}

				return data.orders.all;
			});
	}

	return {
		queryOrdersByEvent
	};
};
