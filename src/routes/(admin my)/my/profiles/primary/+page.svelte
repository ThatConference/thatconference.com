<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import ProfileForm from './profileForm.svelte';

	let { form } = data;

	const metaTags = ((title = 'System Profile - THAT Conference') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create or update your system profile.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/profiles/primary/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<ProfileForm sForm={form} />
