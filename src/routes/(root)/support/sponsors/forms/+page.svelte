<script>
	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { events } from '$lib/config.public';

	import Header from '../../_components/_Header.svelte';

	const metaTags = ((title = 'Sponsorship Forms and Information - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/support/sponsors/forms`
			}
		})
	}))();

	const txEventId = events.next.tx.id;
	const wiEventId = events.next.wi.id;
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<Header pretext="Sponsorship Support">Kalahari Forms and Information</Header>

<section class="flex flex-col space-y-16 text-gray-500">
	<div
		class="prose-lg
              relative mx-auto mb-8 max-w-prose
              text-lg leading-7
              text-gray-500 lg:mx-0 lg:max-w-7xl lg:pr-72" />

	<div class="space-y-8 sm:flex sm:space-x-8 sm:space-y-0">
		<!-- TEXAS -->
		<div class="rounded-md bg-gray-100 px-12 pb-12 shadow-md">
			<div class="prose-md prose text-gray-500">
				<div class="flex-col space-y-16 pb-12">
					<div>
						<h2>Kalahari - Round Rock, TX</h2>
						<div>
							<h3>Resort Address</h3>
							<div>
								<blockquote>
									Kalahari Resorts and Convention Center<br />
									3001 Kalahari Blvd<br />
									Round Rock, TX 78665<br />

									<a href="https://www.kalahariresorts.com/texas/"
										>https://www.kalahariresorts.com/texas/</a>
								</blockquote>
							</div>
						</div>
					</div>

					<div>
						<h3>Important Forms and Documents</h3>
						<div class="flex-col space-y-4">
							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/tx/TX-Sponsor-Handbook.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>Sponsorship Handbook</h4>
										<p class="prose-md prose text-gray-500">
											Contains all of the information about THAT Conference during the conference.
										</p>
									</div>
								</a>
							</div>

							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/tx/TX-AV-Exhibitor-Order-Form.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>AV Order Form</h4>
										<p class="prose-md prose text-gray-500">
											Information on ordering additional AV-related items and services through the
											Kalahari.
										</p>
									</div>
								</a>
							</div>

							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/tx/TX-Exhibitor-Pre-Order-Menu-Form.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>Pre-Order Menu Form</h4>
										<p class="prose-md prose text-gray-500">
											Information on ordering food and beverages to your booth.
										</p>
									</div>
								</a>
							</div>

							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/tx/TX-Kalahari-FedEx-Parcel-Form.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>Shipping Information</h4>
										<p class="prose-md prose text-gray-500">
											Information on how to ship and store items.
										</p>
									</div>
								</a>
							</div>
						</div>
					</div>

					<div class="prose prose-lg mt-4 text-gray-500">
						<h3>Important Event Links</h3>
						<ul>
							<li>
								<a href={`/sponsor-admin/leads/${txEventId}`} target="_blank" rel="noreferrer">
									Lead Generation
								</a>
							</li>
							<li>
								<a href="/sponsor-admin/my-network" target="_blank">Lead Generation Results</a>
							</li>
							<li>
								<a href="/my/network/sponsors" target="_blank">Your Network</a>
							</li>
							<li>
								<a href="/support/sponsors/expo-hall" target="_blank">Expo Hall Only Tickets</a>
							</li>
						</ul>
					</div>

					<div>
						<h3>Booking Your Reservation</h3>
						<p>
							A dedicated website is available for you to book your hotel room online or call
							1-877-525-2427.
						</p>

						<div class="mt-8 flex flex-col items-center">
							<StandardLink href="/support/travel/tx"
								>Travel Information and Resort Information</StandardLink>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- WISCONSIN -->
		<div class="rounded-md bg-gray-100 px-12 pb-12 shadow-md">
			<div class="prose-md prose text-gray-500">
				<div class="flex-col space-y-16">
					<div>
						<h2>Kalahari - Wisconsin Dells, WI</h2>
						<div>
							<h3>Resort Address</h3>
							<div>
								<blockquote>
									Kalahari Resorts and Convention Center<br />
									1305 Kalahari Drive<br />
									Wisconsin Dells, WI 53965<br />

									<a href="https://www.kalahariresorts.com/wisconsin/"
										>https://www.kalahariresorts.com/wisconsin/</a>
								</blockquote>
							</div>
						</div>
					</div>

					<div>
						<h3>Important Forms and Documents</h3>
						<div class="flex-col space-y-4">
							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/wi/WI-Sponsor-Handbook.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>Sponsorship Handbook</h4>
										<p class="prose-md prose text-gray-500">
											Contains all of the information about THAT Conference during the conference.
										</p>
									</div>
								</a>
							</div>

							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/wi/WI-Service-Order-Form.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>Service Order Form</h4>
										<p class="prose-md prose text-gray-500">
											Information on ordering additional items and services through the Kalahari.
										</p>
									</div>
								</a>
							</div>

							<div class="transform transition duration-500 ease-in-out hover:scale-105">
								<a href="/sponsors/wi/WI-Shipping-Info.pdf" target="_blank">
									<div class="prose prose-lg w-full rounded-md border bg-white p-4 shadow-md">
										<h4>Shipping Information</h4>
										<p class="prose-md prose text-gray-500">
											Information on how to ship and store items.
										</p>
									</div>
								</a>
							</div>
						</div>
					</div>

					<div class="prose prose-lg mt-4 text-gray-500">
						<h3>Important Event Links</h3>
						<ul>
							<li>
								<a href={`/sponsor-admin/leads/${wiEventId}`} target="_blank">Lead Generation</a>
							</li>
							<li>
								<a href="/sponsor-admin/my-network" target="_blank">Lead Generation Results</a>
							</li>
							<li>
								<a href="/my/network/sponsors" target="_blank">Your Network</a>
							</li>
							<li>
								<a href="/support/sponsors/expo-hall" target="_blank">Expo Hall Only Tickets</a>
							</li>
						</ul>
					</div>

					<div>
						<h3>Booking Your Reservation</h3>
						<p>
							A dedicated website is available for you to book your hotel room online or call
							1-877-525-2427.
						</p>

						<div class="mt-8 flex flex-col items-center">
							<StandardLink href="/support/travel/wi"
								>Travel Information and Resort Information</StandardLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="prose prose-lg mt-4 text-gray-500">
		<h3>Don't forget to:</h3>
		<ul>
			<li>Book your stay.</li>
			<li>Complete your ticket enrollment.</li>
			<li>Update your THAT Conference profile.</li>
			<li>Read the Sponsorship Handbook.</li>
			<li>Review your company's spotlight page.</li>
		</ul>
	</div>
</section>

<style lang="postcss">
	a:hover {
		@apply hover:text-thatOrange-400;
	}
</style>
