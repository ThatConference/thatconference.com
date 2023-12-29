import { z } from 'zod';
import dayjs from 'dayjs';

export default z.object({
	// The event friendly name
	name: z
		.string({ required_error: 'Please enter the name of the event.' })
		.trim()
		.min(1, { message: 'Please enter the name of the event.' })
		.default(`THAT Conference`),

	// A short description about this event
	description: z
		.string({ required_error: 'TODO: Please tell us more about the event.' })
		.trim()
		.min(1, { message: 'TODO: missing min error message' }),

	// What is this, in a few words?
	slogan: z.string().trim().min(1, { message: 'TODO' }),

	// Friendly unique id to identify event. Follows path name, e.g. wi/2012
	slug: z
		.string({ required_error: 'Please enter the slug of the event.' })
		.trim()
		.min(1, { message: 'Please enter the slug of the event.' })
		.default(`wi/${dayjs().year()}`),

	// "Starting day of the event."
	startDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// "Ending day of the event."
	endDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// "The year this event takes place in."
	year: z.coerce.number().default(parseInt(dayjs().year())),

	// "The locations where this event will take place."
	// TODO: needs to be added in a future release.
	// venues: z.array(z.string()).default(['OAdI0rVjE9D8ZoheAWMN']),

	// Main contact email address.
	email: z
		.string({ required_error: 'Please enter the organizations main email address.' })
		.email()
		.trim()
		.min(5, { message: 'Please enter the organizations main email address.' })
		.default('hello@thatconference.com'),

	// Main phone number.
	phoneNumber: z
		.string({ required_error: 'Please enter the organizations phone number.' })
		.trim()
		.min(1, { message: 'Please enter the organizations phone number.' })
		.default('+14843028428'),

	// Website URL
	website: z
		.string({ required_error: 'Please enter the url of the event.' })
		.url()
		.trim()
		.min(5, { message: 'Please enter the url of the event.' })
		.default('https://thatconference.com'),

	// Logo for event. SVG Preferred format
	logo: z
		.string({ required_error: 'Please enter the relative path of the logo.' })
		.url()
		.trim()
		.min(5, { message: 'Please enter the relative path of the logo.' })
		.default('https://storage.googleapis.com/that-bucket/eventLogos/that-logo-states-wi.svg'),

	// Stripe checkout success URL for this event
	checkoutSuccess: z
		.string({ required_error: 'Please enter the stripe cancellation url.' })
		.url()
		.trim()
		.min(5, { message: 'Please enter the stripe cancellation url.' })
		.default('https://thatconference.com/orders/success'),

	// Stripe checkout cancelled URL for this event
	checkoutCancel: z
		.string({ required_error: 'Please enter the stripe cancellation url.' })
		.url()
		.trim()
		.min(5, { message: 'Please enter the stripe cancellation url.' })
		.default('https://thatconference.com/orders/canceled'),

	// Email providers reference to template used for transactional email of purchased ticket for event
	emailTemplateTicketPurchased: z.string().default('in-person-ticket-purchase-thankyou-sections'),

	// date/time when session voting opens for event
	voteOpenDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// date/time when session voting closes for event
	voteCloseDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// date/time when call for speakers opens for event
	callForSpeakersOpenDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// date/time when call for speakers closes for event
	callForSpeakersCloseDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// date/time when ON THAT call for speakers opens
	callForOnSpeakersOpenDate: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// date/time when ON THAT call for speakers closes
	callForOnSpeakersCloseDate: z.preprocess(
		(val) => dayjs(val).toISOString(),
		z.string().datetime()
	),

	// date/time ticket sales start
	ticketsOnSaleFrom: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// date/time ticket sales stop
	ticketsOnSaleUntil: z.preprocess((val) => dayjs(val).toISOString(), z.string().datetime()),

	// When true a ticket is required to mutate session in this event
	isTicketRequiredToMutate: z.boolean().default(true),

	// When true a ticket is required to join a session in this event
	isTicketRequiredToJoin: z.boolean().default(true),

	// When true membership holders can mutate a session in this event
	canMembershipMutate: z.boolean().default(true),

	// When true membership holders can join a session in this event
	canMembershipJoin: z.boolean().default(true),

	// This event is Active. It has current activities happening
	isActive: z.boolean(),

	// Will this event show in the list of events for a community. Active or not active
	isFeatured: z.boolean(),

	// The community this Event is part of
	community: z.string().default('that'),

	// Type of event
	type: z.string().default('HYBRID_MULTI_DAY')
});
