<script>
	export let data;

	import { fade } from 'svelte/transition';

	import seoMetaTags from '$utils/seo/metaTags';
	import { ModalWarning } from '$elements';
	import Seo from '$components/Seo.svelte';

	import SubmissionList from './_components/submissionList.svelte';

	let { activities } = data;
	const metaTags = ((title = 'My Submissions - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your activities.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/my/submissions`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	{#if activities.length > 0}
		<div in:fade>
			<SubmissionList {activities} />
		</div>
	{:else}
		<div class="p-12">
			<ModalWarning
				title="You have no activities submitted?"
				text="Why not? Submit something today!" />
		</div>
	{/if}
</div>
