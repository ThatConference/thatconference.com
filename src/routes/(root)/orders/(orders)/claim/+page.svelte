<script>
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import ClaimCart from '../../_components/_ClaimCart.svelte';

	const metaTags = ((title = 'Claim Ticket - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Claim your ticket.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/orders/claim`
			},
			noindex: true,
			nofollow: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="my-12 lg:flex lg:justify-between">
	<ClaimCart />
</div>
