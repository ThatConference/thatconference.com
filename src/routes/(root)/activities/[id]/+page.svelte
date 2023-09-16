<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ActionHeader } from '$elements';
	import ActivityDetails from '$components/activities/ActivityDetails.svelte';
	import PageLayout from '$elements/layouts/PageCard.svelte';

	let { activity } = data;

	const metaTags = ((imageId = activity.id, title = `${activity.title}.`) => ({
		title,
		tags: seoMetaTags({
			title,
			imageId,
			description: `${activity.shortDescription}`,
			openGraph: {
				url: `https://thatconference.com/activities/${activity.id}`
			}
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<PageLayout>
	<div slot="header">
		<ActionHeader title="Session Spotlight" />
	</div>

	<div>
		<ActivityDetails {activity} sessionLocation={activity.location} />
	</div>
</PageLayout>
