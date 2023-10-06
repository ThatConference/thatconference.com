import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+[1-9]\d{6,14}$/;

export default z.object({
	firstName: z.string({ required_error: 'Please enter your first or given name.' }).trim(),
	lastName: z.string({ required_error: 'Please enter your last or family name.' }).trim(),
	email: z.string({ required_error: 'Please enter your email address.' }).email().trim(),

	city: z.string().trim().nullable().optional(),
	state: z.string().trim().nullable().optional(),
	country: z.string().trim().nullable().optional(),

	company: z.string().trim().nullable().optional(),
	jobTitle: z.string().trim().nullable().optional(),

	// THAT api cannot accept '' as phone value. Must be valid phone # or null
	phone: z.string().trim().regex(PHONE_NUMBER_REGEX).or(z.string().nullable()) // todo.. this feels werid.
});
