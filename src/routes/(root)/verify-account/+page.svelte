<script>
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { Standard as StandardLink } from '$elements/links';
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	const metaTags = ((title = 'Your account is unverified.') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your account is currently unverified.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/verify-account`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	onMount(() => {
		invalidateAll();
	});
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<section class="relative overflow-x-hidden">
	<div class="mx-auto my-12 max-w-screen-xl px-4 sm:px-6">
		<main class="sm:flex">
			<div class="hidden md:block">
				<img class="max-h-52" src="/images/characters/Preston@2x.png" alt="Confused Preston" />
			</div>

			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<div class="flex">
						<div>
							<h1 class="text-4xl font-extrabold tracking-tight text-thatBlue-800 sm:text-5xl">
								THAT Account Unverified
							</h1>

							<p class="prose prose-lg mt-4 max-w-3xl text-gray-500">
								You login's email address is current unverified. To continue please check your email
								and finish the email verification process. Don't forget to check your spam folder
								for the email. If you've done so and are still seeing this error <span
									class="font-extrabold">please logout and login again</span
								>. Still having issues, then please ask us in chat, or email us at
								<a
									href="mailto:hello@thatconference.com?subject=Account Verification Problem"
									target="_blank"
									class="text-thatOrange-400 hover:text-thatOrange-500 hover:underline"
									>hello@thatconference.com</a
								>.
							</p>
						</div>
					</div>
				</div>
				<div class="mt-10 flex justify-end">
					<div class="flex sm:border-l sm:border-transparent sm:pl-6">
						<StandardLink class="h-3/4" href="/">Home</StandardLink>
					</div>
					<div class="flex sm:border-l sm:border-transparent sm:pl-6">
						<StandardLink class="h-3/4" href="/logout" rel="external">Logout</StandardLink>
					</div>
				</div>
			</div>
		</main>
	</div>
</section>
