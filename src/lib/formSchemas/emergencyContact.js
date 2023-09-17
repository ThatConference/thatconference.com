import { z } from 'zod';

const phoneNumberRegEx = /^\+(?:[0-9] ?){6,14}[0-9]$/;

export default z.object({
	fullName: z
		.string({ required_error: 'Please enter the name of your contact.' })
		.trim()
		.min(1, { message: 'Please enter the name of your contact.' }),
	email: z.string({ required_error: 'Please enter their email address.' }).email().trim(),

	relationship: z.enum(['Parent', 'Spouse', 'Kid', 'Other'], {
		required_error: 'What is their relationship to you?'
	}),

	travelingWithYou: z.boolean({
		required_error: 'Please select if they will they be traveling with you?'
	}),
	phoneNumber: z
		.string()
		.regex(phoneNumberRegEx, {
			message: 'Phone number must be in the following format: +13476748428, +493083050, etc.'
		})
		.min(1, { message: 'Please enter a phone number we can reach them at.' })
});
