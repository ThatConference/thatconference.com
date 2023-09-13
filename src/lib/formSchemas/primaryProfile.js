import { z } from 'zod';
// import memberApi from '$dataSources/api.that.tech/members/queries';

function validateSlug(slug) {
	// const { isSlugTaken } = memberApi();

	console.log('in validate slug', slug);

	// message: 'Slug is already taken. Try again.',
	if (!/^[a-zA-Z0-9-_]+$/g.test(slug)) {
		console.log('here');
		return (
			false,
			{
				message: `Invalid format: use only letters, numbers, dash, and underscore`
			}
		);
	}

	return true;

	// return new Promise((res) =>
	// 	isSlugTaken(slug).then((r) => {
	// 		if (isNewProfile) res(!r);
	// 		res(true);
	// 	})
	// );
}

export default z.object({
	firstName: z.string().trim().min(1, { message: 'Please enter your first or given name.' }),
	lastName: z.string().trim().min(1, { message: 'Please enter your last or family name.' }),
	email: z.string().email({ message: 'Please enter your email address.' }).trim(),
	profileSlug: z
		.string({ required_error: 'You must enter a value to represent your member page.' })
		.trim()
		.toLowerCase()
		.refine(validateSlug),
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
	isDeactivated: z.literal(false).default(false)
});
