<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ThatActiveEvents from '$components/events/thatconference/Upcoming.svelte';
	import { Standard as StandardLink } from '$elements/links';

	let { thatActiveEvents } = data;

	const metaTags = ((title = 'Newsletter subscription') => ({
		title,
		tags: seoMetaTags({
			title,
			description: '.',
			openGraph: {
				url: `https://thatconference.com/newsletter/what-now`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="relative py-32 sm:py-40">
	<div class="mx-auto max-w-screen-xl px-4 sm:px-6">
		<div class="flex flex-col space-y-24 lg:grid lg:grid-cols-7">
			<div class="col-span-4 space-y-6">
				<h1
					class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
					You're on THAT trail to something amazing.
				</h1>

				<div class="mt-6 max-w-xl lg:mt-0">
					<p class="text-lg leading-8 text-gray-600">
						You're in and welcome to THAT family. It's our passion to see people of all ages grow
						while helping them reach their full potential.
					</p>

					<div class="col-span-4 mt-6 flex flex-col items-start space-y-6 text-lg text-gray-500">
						<p class="prose prose-lg">
							Guess what, we have a Slack channel too and even a few conferences. We'd love to
							invite you to it as well. Requesting access is easy, create an account and then head
							over to your profile and hit a button.
						</p>
						<StandardLink href="/signup"
							><img class="w-24" src="/images/SlackLogo.svg" alt="slack logo" /></StandardLink>
					</div>
				</div>
			</div>
			<div class="col-span-3 flex max-w-xl flex-col items-center justify-center">
				<img
					src="/images/characters/what_to_expect_professional_networking.png"
					alt=""
					class="w-full object-contain sm:mt-16 lg:mt-0 lg:max-w-none" />
			</div>
		</div>
	</div>

	<div class="mt-36">
		<ThatActiveEvents events={thatActiveEvents} />
	</div>
</div>
