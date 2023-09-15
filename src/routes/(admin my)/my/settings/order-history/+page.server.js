import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import ticketAllocationSchema from '$lib/formSchemas/ticketAllocation';

import orderMutationApi from '$dataSources/api.that.tech/orders/mutations';
import ordersApi from '$dataSources/api.that.tech/orders/queries';

export async function load({ fetch }) {
	const { queryMyBulkAllocations } = ordersApi(fetch);

	const orders = await queryMyBulkAllocations();

	return {
		orders
	};
}

export const actions = {
	default: async (event) => {
		let { allocateTicket } = orderMutationApi(event.fetch);
		const form = await superValidate(event, ticketAllocationSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { orderId, allocationId, emailAddress } = form.data;
		const r = await allocateTicket(orderId, allocationId, emailAddress);

		if (!r.result) {
			const errorMessage = {
				type: 'error',
				message: `Whoops!!! ${r.message}`
			};

			throw redirect(errorMessage, event);
		}

		const allocatedMessage = {
			type: 'success',
			message: `This ticket has been allocated to ${r.allocatedTo.firstName} ${r.allocatedTo.lastName}`
		};

		let allocatedTo = r.allocatedTo;
		setFlash(allocatedMessage, event);
		return { form, allocatedTo };
	}
};
