<script>
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import { events } from '$lib/config.public';

	const metaTags = ((title = `Member Sharing - THAT Conference`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Helping you grow your network while at THAT Conference.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/my/member-sharing`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="relative overflow-x-hidden">
	<div class="mx-auto mb-24 mt-12 max-w-screen-xl px-4 sm:px-6">
		<header>
			<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500">My Network</h2>
			<h1
				class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
				Growing Your Network
			</h1>

			<p class="mt-6 text-2xl text-gray-500">
				What good is going to a conference is you don't connect new people? THAT Conference is all
				about community and helping one another grow. We've made it easy to connect with other
				campers and sponsors.
			</p>
		</header>

		<div class="relative py-12">
			<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300"></div>
			</div>
		</div>

		<main class="flex flex-col lg:grid lg:grid-cols-7">
			<div class="col-span-4 space-y-4">
				<h2 class="text-xl font-bold leading-6 text-gray-900">Select An Event</h2>
				<p class="prose mt-4">
					Getting connected is as easy as using a campers pin number. Select the event you're
					currently at, then enter the pin number of the person you want to connect with. Upon doing
					so, your <a href="/my/profiles/shared">shared profile</a> will be sent to them where they have
					the option to share back.
				</p>

				<div class="prose">
					<a href="/my/network/members">View My Existing Connections</a>
				</div>

				<div class="flex flex-wrap pt-12">
					<a href="/my/member-sharing/{events.next.wi.id}" class="anchorButton m-2 grow">
						<div class="uppercase">THAT Conference Wisconsin</div>
					</a>
					<a href="/my/member-sharing/{events.next.tx.id}" class="anchorButton m-2 grow">
						<div class="uppercase">THAT Conference Texas</div>
					</a>
				</div>
			</div>
		</main>
	</div>
</div>

<style lang="postcss">
	.anchorButton {
		@apply rounded-md bg-thatBlue-500 px-4 py-4 text-center font-medium tracking-wide text-white shadow-md md:text-xl;
	}

	.anchorButton:hover {
		@apply bg-thatBlue-400 transition duration-150 ease-in-out;
	}
	.anchorButton:focus {
		@apply underline underline-offset-4;
	}
</style>
