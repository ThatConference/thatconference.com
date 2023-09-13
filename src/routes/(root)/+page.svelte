<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import NewsletterModal from '$components/newsletter/Modal.svelte';

	import {
		TrustedBy,
		Hero,
		Testimonials,
		CTA,
		CtaMembership,
		ThatActiveEvents
	} from './_root/components';

	let { thatActiveEvents, sponsors, user } = data;

	const metaTags = ((
		title = 'Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share and learn together. Home of THAT Conference.'
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description:
				'Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share and learn together. We geek-out in Texas and Wisconsin once a year but we host digital events all the time. Home of THAT Conference.'
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<Hero />
	<ThatActiveEvents events={thatActiveEvents} />
	<NewsletterModal />

	<Testimonials />

	{#if !user.isAuthenticated}
		<CTA />
	{:else if !user.profile?.isMember}
		<CtaMembership />
	{/if}

	<TrustedBy {sponsors} />
</div>
