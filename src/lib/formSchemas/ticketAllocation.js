import { z } from 'zod';

export default z.object({
	emailAddress: z
		.string({ required_error: 'Please enter the email address you wish to transfer to.' })
		.email()
		.trim(),
	orderId: z.string({ required_error: 'OrderId is missing.' }).trim(),
	allocationId: z.string({ required_error: 'Allocation ID is missing' }).trim()
});
