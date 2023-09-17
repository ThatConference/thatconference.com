<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import PublicProfileForm from './PublicProfileForm.svelte';

	const metaTags = ((title = 'My Profile - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create or update your THAT profile.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/my/profiles/primary/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<PublicProfileForm sForm={data.form} />
</div>
