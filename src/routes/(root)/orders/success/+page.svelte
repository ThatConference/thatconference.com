<script>
	import { page } from '$app/stores';

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Standard as StandardLink } from '$elements/links';

	const metaTags = ((title = 'Payment Received - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your payment was successfully received.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/orders/success`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	/*
		event location - EL=wi,tx,thatus
		has membership - M=0
		is bulk purchase - B=1
		target location - [TL=on&TL=at]
	*/

	const isBulkPurchase = $page.url.searchParams.has('B')
		? Boolean(parseInt($page.url.searchParams.get('B')))
		: false;
	const isMembership = $page.url.searchParams.has('M')
		? Boolean(parseInt($page.url.searchParams.get('M')))
		: false;
	const eventLocation = $page.url.searchParams.has('EL')
		? $page.url.searchParams.get('EL')
		: undefined;
	let targetLocations = [];
	if ($page.url.searchParams.has('TL')) {
		targetLocations = $page.url.searchParams.getAll('TL');
		targetLocations = targetLocations.map((tl) => tl.toUpperCase());
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="space-y-12">
	<div class="mx-auto max-w-prose text-base lg:max-w-none">
		<h2 class="text-base font-semibold uppercase tracking-wide text-thatOrange-400">
			Payment Received
		</h2>
		<p
			class="mt-6 text-4xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
			Thank You
		</p>
	</div>

	<div class="relative">
		<div class="prose mx-auto text-lg text-gray-500 lg:max-w-none">
			<p>
				Our passion is people, communities, and helping one another become a better geeks than they
				were yesterday. We couldn't do this without you and your support. <span class="font-bold"
					>Thank You!</span>
			</p>

			<h3>Order confirmation and receipt</h3>
			<p>
				If you've landed here, that means all of the crazy squirrels in the clouds did their jobs.
				You should see two confirmation emails in your inbox, a receipt from the credit card
				processor and a welcome message from THAT. <span class="font-bold"
					>If you do not see those, please check your junk/spam folders, as sometimes we manage to
					land there accidentally.</span>
				At any time you can view your
				<a class="hover" href="/my/settings/order-history">order history</a> and reprint your receipt.
			</p>

			<div class="my-8 flex justify-center md:justify-end">
				<StandardLink href="/my/settings/order-history" target="_blank"
					>View Your Order History</StandardLink>
			</div>

			{#if eventLocation}
				<h3>Next steps</h3>
				<p>Based on your purchase we have follow-up things for you.</p>

				{#if targetLocations.length > 0}
					<h4>You have event tickets!</h4>

					{#if targetLocations.includes('AT')}
						<p>
							Time to get your travel and hotel rooms sorted. Head over to our travel page for hotel
							room blocks, addresses, and other details.
						</p>

						<div class="my-8 flex justify-center md:justify-end">
							{#if eventLocation.toUpperCase() === 'WI'}
								<StandardLink href="/support/travel/wi" target="_blank"
									>Book Your Travel To Wisconsin</StandardLink>
							{/if}
							{#if eventLocation.toUpperCase() === 'TX'}
								<StandardLink href="/support/travel/tx" target="_blank"
									>Book Your Travel To Texas</StandardLink>
							{/if}
						</div>

						<!-- <p>
							Soon we will also send you an email asking for your dietary restrictions, shirt sizes,
							and a few other items.
						</p> -->
					{/if}

					{#if targetLocations.includes('ON')}
						<p>
							No further action is required for your <span class="font-extrabold">ON THAT</span> tickets.
							Ok, small lie there. You now have access to that event and are free to start adding to
							the schedule. That's correct; you can add sessions as well, and make sure to select the
							right event.
						</p>

						<div class="my-8 flex justify-center md:justify-end">
							<StandardLink href="https://that.us/activities/create" target="_blank"
								>Create an Activity</StandardLink>
						</div>
					{/if}
				{/if}
			{/if}

			{#if isBulkPurchase}
				<h4>Action Required – You have unallocated tickets</h4>
				<p>
					You've purchased multiple tickets, and those tickets need to be allocated (assigned) to
					someone. The process is easy, all you need to transfer a ticket is the
					<strong>profile email address</strong> of the person you are transferring the ticket to.
					We've put together the steps
					<a class="hover" href="/support/transfer-a-ticket" target="_blank">in this handy guide</a>
					for your reference.
				</p>
				<p>
					Remember to allocate a ticket to <em>yourself</em> if you're attending!
				</p>
				{#if targetLocations.includes('AT')}
					<p>
						If any of those tickets are for a spouse or child, they don't need to be allocated, but
						you will need to answer the follow-up questions on their behalf.
					</p>
				{/if}

				<div class="my-8 flex justify-center md:justify-end">
					<StandardLink href="/my/settings/order-history" target="_blank"
						>Allocate Tickets Now</StandardLink>
				</div>
			{/if}

			{#if isMembership}
				<h3>Thank you purchasing an annual membership</h3>
				<p>
					We're grateful to have you as an annual member. Your membership helps us run the daily
					operations while also having direct input into how things evolve. You will soon see
					another email with a signup link to our private discord server.
				</p>
				<p>Once again, Thank You!</p>
			{/if}

			<h3>Anything else?</h3>
			<p>
				We're so glad you asked. There is always something going on at THAT, and we don't want you
				to miss anything.
			</p>
			<ul>
				<li>
					Join us in <a class="hover" href="/my/profiles/slack" target="_blank">THAT Slack</a> and
					<a class="hover" href="https://that.community" target="_blank"> THAT Discord</a>
				</li>
				<li>
					Get involved on THAT.us! Better yet, create an activity.
					<a class="hover" href="https://that.us/support/" target="_blank"
						>Learn how to get started.</a>
				</li>
				<li>
					<a class="hover" href="/support/staying-up-to-date" target="_blank">Stay up to date</a>.
				</li>
				<li>
					❤️ your favorite sessions to receive emails on session updates, see them in your
					<a class="hover" href="/my/favorites" target="_blank">favorites feed</a>
					and add them to
					<a class="hover" href="/support/my-favorites-icalendar" target="_blank"
						>your own calendar</a
					>.
				</li>
				<li>Signup for our <a class="hover" href="#newsletter">newsletter</a>!</li>
			</ul>
			{#if targetLocations.length > 0}
				<p>
					Say hello to <strong>Meet THAT Camper</strong> – your weekly chance to connect with a
					fellow geek before THAT Conference. Every Monday at 9 AM central, we'll introduce you to
					another attendee headed to the event. Getting started is easy, go to your
					<a class="hover" href="/my/notification-preferences" target="_blank"
						>notification preferences</a> and enable the Meet THAT Camper notification. It's that simple,
					and you can shut it off at any time. There are more details about Meet THAT Camper on the notification
					preferences page.
				</p>
			{/if}

			<h3>Lastly, we're here to help</h3>
			<p>
				We're here to support you and the community. Anything we can do to improve, or if you wish
				there was a particular feature, please tell us. Our entire platform is open source, and
				everyone is invited to our sprint meeting; they're just activities.
			</p>
			<p>
				Do you run a user group, meetup, or conference? Is there a way we can support you? Let us
				know.
			</p>
			<p>
				At any time feel free to drop us a line <a
					href="mailto:hello@that.us"
					target="_blank"
					class="hover">hello@that.us</a>
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.hover:hover {
		@apply text-thatOrange-400;
		@apply underline;
		@apply text-thatOrange-500;
	}
</style>
