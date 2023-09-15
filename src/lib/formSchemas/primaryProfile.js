import { z } from 'zod';

export default z.object({
	firstName: z.string().trim().min(1, { message: 'Please enter your first or given name.' }),
	lastName: z.string().trim().min(1, { message: 'Please enter your last or family name.' }),
	email: z.string().email({ message: 'Please enter your email address.' }).trim(),
	profileSlug: z
		.string({ required_error: 'You must enter a value to represent your member page.' })
		.regex(/^[a-zA-Z0-9-_]+$/, {
			message: 'Invalid slug format: use only letters, numbers, dash, and underscore'
		})
		.trim()
		.toLowerCase(),
	acceptedCodeOfConduct: z
		.literal(true, {
			errorMap: () => ({ message: 'You must accept our Code of Conduct policy.' })
		})
		.default(false),
	acceptedCommitmentToDiversity: z
		.literal(true, {
			errorMap: () => ({ message: 'You must accept our Commitment to Diversity policy.' })
		})
		.default(false),
	acceptedAntiHarassmentPolicy: z
		.literal(true, {
			errorMap: () => ({ message: 'You must accept our Anti-Harassment policy.' })
		})
		.default(false),
	acceptedTermsOfService: z
		.literal(true, {
			errorMap: () => ({ message: 'You must accept our Terms of Services.' })
		})
		.default(false),
	isOver13: z
		.literal(true, {
			errorMap: () => ({ message: 'You Must be 13 years or older.' })
		})
		.default(false),
	isDeactivated: z.literal(false).default(false),
	canFeature: z.boolean().default(false)
});
