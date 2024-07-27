<script>
	import StaticList from './schedule/StaticList.svelte';
	import TabbedList from './schedule/TabbedList.svelte';

	const days = [
		{
			date: '2024-07-30T08:30:00.000Z',
			summary: `Day one of THAT Conference Online.`,
			sessions: [
				{
					name: 'Kent C. Dodds',
					description: 'Keynote',
					start: '8:30 AM'
				},
				{
					name: 'Break',
					description: '',
					start: '10:00 AM'
				},
				{
					name: 'Keynote Reflections',
					description: '',
					start: '10:30 AM'
				},
				{
					name: 'TBD',
					description: '',
					start: '11:30 AM'
				},
				{
					name: 'Break / Live Q&A',
					description: '',
					start: '12:30 PM'
				},
				{
					name: 'TBD',
					description: '',
					start: '1:00 PM'
				},
				{
					name: 'Developers of the World',
					description: 'Sharing your story with the world.',
					start: '2:00 PM'
				},

				{
					name: 'TBD',
					description: '',
					start: '2:30 PM'
				},
				{
					name: 'Break / Live Q&A',
					description: '',
					start: '3:30 PM'
				},
				{
					name: 'TBD',
					description: '',
					start: '4:00 AM'
				}
			]
		},
		{
			date: '2024-07-31T08:30:00.000Z',
			summary: 'Day two of THAT Conference Online.',
			sessions: [
				{
					name: 'Mark Techson',
					description: 'Keynote',
					start: '8:30 AM'
				},
				{
					name: 'Break',
					description: '',
					start: '10:00 AM'
				},
				{
					name: 'Keynote Reflections',
					description: '',
					start: '10:30 AM'
				},
				{
					name: 'Developer Hedbanz',
					description:
						'Get ready for Developer Headbandz with Andrew! Participants will hold cards with tech terms on their foreheads while the audience provides clues to help them guess. It’s a timed, high-energy game that promises excitement and lots of laughs!',
					start: '11:30 AM'
				},
				{
					name: 'Break / Live Q&A',
					description: '',
					start: '12:30 PM'
				},
				{
					name: 'Camper Conversations',
					description:
						"Join Shashi for Camper Conversations at THAT Conference, where campers share their experiences and insights from the conference so far. Hear first hand stories, highlights, and memorable moments that make THAT Conference truly special. Don't miss this chance to connect and reflect with fellow campers!",
					start: '1:00 PM'
				},
				{
					name: 'Developers of the World',
					description: 'Sharing your story with the world.',
					start: '2:00 PM'
				},

				{
					name: 'Tech Commute Live',
					description:
						'A sit down Q&A tech commute style with questions from the live stream. About life in and around tech. It’s the Tech Commute at THAT. On Thursday we will do a retrospective of the event. ',
					start: '2:30 PM'
				},
				{
					name: 'Break / Live Q&A',
					description: '',
					start: '3:30 PM'
				},
				{
					name: 'Ready Set Battlesnake!',
					description:
						'Dive into the thrilling world of AI programming with Andrew in Ready Set Battlesnake! Watch as live coding brings AI snakes to life, navigating and outsmarting opponents in a dynamic, competitive arena. It’s coding like you’ve never seen before!',
					start: '4:00 PM'
				}
			]
		},
		{
			date: '2024-08-01T08:30:00.000Z',
			summary: 'The last day of THAT Conference Online',
			sessions: [
				{
					name: 'June Syndesi Kramer',
					description: 'Keynote',
					start: '8:30 AM'
				},
				{
					name: 'Break',
					description: '',
					start: '10:00 AM'
				},
				{
					name: 'Keynote Reflections',
					description: '',
					start: '10:30 AM'
				},
				{
					name: 'Tech Trivia Challenge',
					description:
						"Test your tech knowledge in the Tech Trivia Challenge, hosted by Pj! Join in for a fun and interactive quiz session where campers compete to answer tech-related questions. It's a fast-paced, exciting game that promises great fun and plenty of learning moments.",
					start: '11:30 AM'
				},
				{
					name: 'Break / Live Q&A',
					description: '',
					start: '12:30 PM'
				},
				{
					name: 'Tech Commute Live',
					description:
						'A sit down Q&A tech commute style with questions from the live stream. About life in and around tech. It’s the Tech Commute at THAT. On Thursday we will do a retrospective of the event.',
					start: '1:00 PM'
				},
				{
					name: 'Developers of the World',
					description: 'Sharing your story with the world.',
					start: '2:00 PM'
				},

				{
					name: 'Code Confessions',
					description:
						'Prepare for some hearty laughs with Code Confessions. Step into our “confession booth” and hear anonymously submitted, hilarious coding blunders from fellow developers. It’s a session that proves we’re all human!',
					start: '2:30 PM'
				},
				{
					name: 'Break / Live Q&A',
					description: '',
					start: '3:30 PM'
				},
				{
					name: 'Closing',
					description: '',
					start: '4:00 PM'
				}
			]
		}
	];
</script>

<div class="relative mx-auto max-w-2xl px-4 lg:max-w-7xl">
	<header class="pb-24">
		<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">Overview</h3>
		<h2 class="hText mb-8 mt-8">Daily Schedule</h2>
		<p class="mt-6 text-2xl text-gray-500">
			Meet the geeks who will be on the main stage throughout our time together. The conversations
			are unscripted and you can participate by joining in the live stream.
		</p>
		<p class="mt-6 text-xl leading-7">
			<a class="a-decorate" href="schedule">View the detailed schedule.</a>
		</p>
	</header>

	<TabbedList {days} />
	<StaticList {days} />
</div>

<style lang="postcss">
	.hText {
		@apply text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}
</style>
