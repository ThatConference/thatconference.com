import { z } from 'zod';

const profileLink = z.object({
	isPublic: z.boolean(true),
	linkType: z.string(),
	url: z.string().url().trim()
});

export default z.object({
	firstName: z.string({ required_error: 'Please enter your first or given name.' }).trim(),
	lastName: z.string({ required_error: 'Please enter your last or family name.' }).trim(),
	company: z.string().trim().nullable().optional(),
	jobTitle: z.string().trim().nullable().optional(),
	bio: z.string({ required_error: 'We need to know a bit about yourself.' }).trim(),
	canFeature: z.boolean(),
	isDeactivated: z.boolean(),
	profileImage: z.string().url().nullable().optional(),
	profileLinks: z.array(profileLink), // this needs to be a shape of links
	lifeHack: z.string().trim().nullable().optional(),
	interests: z.string().trim().array().optional()
});
