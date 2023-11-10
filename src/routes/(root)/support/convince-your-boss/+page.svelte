<script>
	export let data;

	import dayjs from 'dayjs';
	import advFormat from 'dayjs/plugin/advancedFormat';

	import seoMetaTags from '$lib/seo/metaTags';
	import Standard from '$elements/buttons/Standard.svelte';
	import Seo from '$components/Seo.svelte';

	import Header from '../_components/_Header.svelte';
	import EventLink from './_components/EventLink.svelte';

	dayjs.extend(advFormat);

	const { events } = data;
	const defaultText = 'Copy This Email To Your Clipboard';
	let buttonText = defaultText;
	let eventSelected;

	const metaTags = ((title = 'Convince Your Boss') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'User our email template to convince your boss to attend THAT Conference.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/support/convince-your-boss`
			}
		})
	}))();

	const activeEvents = events
		.filter((e) => e.isActive && ['MULTI_DAY', 'HYBRID_MULTI_DAY', 'SINGLE_DAY'].includes(e.type))
		.sort((a, b) => {
			const astart = new Date(a.startDate).getTime() || 0;
			const bstart = new Date(b.startDate).getTime() || 0;
			return astart - bstart;
		});

	let nextEvent = activeEvents[0];

	eventSelected = nextEvent.slug.slice(0, 2);

	function handleCopyClick() {
		var copyText = document.getElementById('emailTemplate');
		navigator.clipboard.writeText(copyText.innerText);

		buttonText = 'Copied To Clipboard';
		setTimeout(() => (buttonText = defaultText), 5000);
	}

	function handleEventSelected({ detail }) {
		eventSelected = detail.event.toLowerCase();
		let [selectedEvent] = activeEvents.filter((e) => e.slug.startsWith(eventSelected));
		nextEvent = selectedEvent;
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Header center={true} pretext={"Let's help you get to THAT Conference"}
	>How to Convince Your Boss</Header>
<div class="prose prose-lg mx-auto text-gray-500">
	<p>
		You're eager to attend THAT Conference and a well-written email to your manager can make all the
		difference in getting approved. In this guide, we'll provide you with a step-by-step approach to
		crafting a persuasive request letter that covers all the essential details. Let's get started!
	</p>

	<h2>Step 1: Understand Your Audience</h2>
	<p>
		Before you begin writing, take a moment to understand your manager's perspective. Consider their
		priorities, the benefits of attending THAT Conference for your role, and how it aligns with the
		company's goals. This understanding will help you tailor your letter effectively. Depending on
		where you work there may be other requirements needed for the request. Make sure you investigate
		those before approaching your manager. Being well-prepared is the best approach!
	</p>

	<h2>Step 2: Gather Information</h2>
	<p>
		Compile all the necessary information, including the conference dates, location, agenda, and any
		specific sessions or workshops you plan to attend. Research the conference costs, such as
		registration fees, travel, accommodation, and meals. Gather who will be there, who you wish to
		network with, including speakers and other attendees.
	</p>

	<div class="grid place-items-center">
		<EventLink on:eventSelected={handleEventSelected}>
			<span>Select an Upcoming Conference</span>
		</EventLink>
	</div>

	<h2>Step 3: Highlight Benefits</h2>
	<p>
		In your letter, emphasize how attending THAT Conference will benefit both you and the company.
		Mention the valuable knowledge and skills you'll acquire, potential networking opportunities,
		and how this knowledge can be applied to your current role.
	</p>

	<h2>Step 4: Create a Detailed Budget</h2>
	<p>
		Provide a clear breakdown of the costs associated with attending the conference. Include
		registration fees, travel expenses, accommodation, and meals. Make it easy for your manager to
		see the financial aspects.
	</p>

	<p>
		The vast majorities of companies have a yearly educational budget alloted for your professional
		growth. A conference such as THAT Conference would squarely fit into that budget. If you are
		unsure, ask your manager or HR department.
	</p>

	<h2>Step 5: Address Time Off</h2>
	<p>
		If you'll need time off work to attend the conference, address this in your letter. Suggest a
		plan for handling your responsibilities during your absence, ensuring a smooth workflow for your
		team.
	</p>

	<p>Chances are, you don't even need to take your vacation time to attend THAT Conference.</p>

	<h2>Step 6: Be Professional and Concise</h2>
	<p>
		Keep your letter professional and concise. Be respectful of your manager's time by getting to
		the point quickly. Use a formal tone and proofread for any errors before submitting. Tools like
		Grammarly are your friend. If you’re meeting in person, set a time with your manager that is
		slower in their day. You want them to focus on the value of THAT Conference, not be preoccupied
		with their next meeting.
	</p>

	<div class="mb-8 mt-14 flex justify-between">
		<h2 class="m-0">Example Letter</h2>

		<EventLink on:eventSelected={handleEventSelected}>
			<span>Select an Upcoming Conference</span>
		</EventLink>
	</div>

	<div id="emailTemplate" class="mt-8 bg-gray-50 p-4">
		<p>[Manager's Name],</p>
		<p>
			I hope this message finds you well. I am writing to request approval to attend THAT
			Conference, which is scheduled from {dayjs(nextEvent.startDate).format('MMMM Do')} through {dayjs(
				nextEvent.endDate
			).format('MMMM Do')},
			{dayjs(nextEvent.endDate).format('YYYY')} at the
			{nextEvent.venues[0].name} in
			{nextEvent.venues[0].city}, {nextEvent.venues[0].state}. As both a software developer and a
			key contributor to our company's operations, I believe attending this conference will
			significantly benefit my professional growth and our organization.
		</p>
		<p>Here are some key points to consider:</p>
		<ol>
			<li>
				<p>
					<strong>Conference Benefits:</strong> THAT Conference is renowned for its high-quality sessions
					and workshops on the latest trends and technologies in the software industry. Their strong
					commitment to Open Spaces, a platform where I can contribute sessions to discuss particular
					topics or participate in others' discussions, offers the chance for deeper conversations and
					collaborative problem-solving, which I am really looking forward to. The knowledge and skills
					gained from attending will directly enhance my performance in my career and current role. You
					will find this year's speakers and schedule here:
				</p>

				<ul>
					<li>
						Speakers: https://thatconference.com/{nextEvent.slug}/speakers
					</li>
					<li>
						Full Schedule: https://thatconference.com/{nextEvent.slug}/schedule
					</li>
				</ul>
			</li>

			<li>
				<p>
					<strong>Networking Opportunities:</strong> I’ll have the chance to connect with many industry
					experts and peers, fostering valuable relationships that can benefit me and our company in
					the long term. In addition, THAT Conference is the only tech conference that's also a community,
					where many of the people I meet will be available all year round for further discussions and
					engagements.
				</p>
			</li>
			<li>
				<strong>Cost Breakdown:</strong>
				<ul>
					<li>
						Registration Fees: <span class="italic"
							>Ticket information and costs: <a
								href="https://thatconference.com/{nextEvent.slug}/tickets#professionals"
								>https://thatconference.com/{nextEvent.slug}/tickets#professionals</a
							></span>
					</li>
					<li>Travel Expenses: $[Your Costs Here]</li>
					<li>
						Accommodations: <span class="italic"
							>Room costs and discounts: <a
								href="https://thatconference.com/support/travel/{nextEvent.slug}"
								>https://thatconference.com/support/travel/{eventSelected}</a
							></span>
					</li>
					<li>Meals: Mostly included depending on ticket and travel.</li>
				</ul>
				Total Cost: $[Total Cost]
			</li>
			<li>
				<p>
					<strong>Time Off:</strong> I have devised a plan to ensure the seamless continuation of my
					responsibilities during my absence, minimizing any disruption to our team's workflow.
				</p>
			</li>
		</ol>
		<p>
			I kindly request your approval for the necessary financial support and time off to attend THAT
			Conference. I am confident that the knowledge and insights gained will contribute
			significantly to our team's and company's success.
		</p>
		<p>
			Thank you for considering my request. I am more than willing to discuss this further if
			needed.
		</p>
		<p>
			Sincerely,<br />
			[Your Name]
		</p>
	</div>

	<div class="mt-8 grid place-content-center">
		<Standard on:click={handleCopyClick}>
			<span>{buttonText}</span>
		</Standard>
	</div>

	<h2>When You Get A No</h2>
	<p>
		If you found your proposal being denied, while this might suck, don’t take it the wrong way. The
		last thing you want to do is become bitter and act hasty about it. Thank the decision-maker just
		the same for taking the time to review your proposal. Follow the conference through available
		channels, such as Keynotes streamed on YouTube and THAT’s social media accounts, Slack and
		Discord. Leverage your network and get updates, snippets and new learning from contacts who were
		able to attend. Find and share cases proving that participation in THAT Conference generated
		substantial benefits to other developers and rival or competing organizations. Write these down
		and utilize them in future proposals.
	</p>

	<h2>When You Get A Yes</h2>
	<p>
		When you get an approval remember to thank the decision-maker for approving your request. But
		don’t just mention it in passing as you meet them in the hallway. A better way is to communicate
		gratitude with an expressed promise to deliver the results you’ve cited in your proposal.
	</p>

	<h2>Conclusion</h2>
	<p>
		By following these steps and using the example letter as a template, you can effectively request
		approval to attend THAT Conference while addressing all the essential details, costs and
		benefits. Tailor your letter to your specific circumstances and company culture for the best
		chance of approval. If you’re stuck, ask for some assistance on our Slack or Discord. There are
		always some people there who are willing to help. Good luck. We look forward to seeing you at
		the next THAT Conference!
	</p>
</div>
