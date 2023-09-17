import { z } from 'zod';

const profileLink = z.object({
	isPublic: z.boolean(true),
	linkType: z.string(),
	url: z.string().url().trim()
});

export default z.object({
	firstName: z.string().trim().min(1, { message: 'Please enter your first or given name.' }),
	lastName: z.string().trim().min(1, { message: 'Please enter your last or family name.' }),
	company: z.string().trim().min(1, { message: 'Please enter your company.' }),
	jobTitle: z.string().trim().min(1, { message: 'Please enter your job title.' }),
	bio: z.string({ required_error: 'We need to know a bit about yourself.' }).trim(),

	canFeature: z
		.literal(true, {
			errorMap: () => ({ message: 'In order to submit a session we must be able to feature you.' })
		})
		.default(true),

	profileImage: z.string().url(),
	profileLinks: z.array(profileLink).optional(), // this needs to be a shape of links
	lifeHack: z.string().trim().nullable().optional(),
	interests: z.string().array().optional()
});
