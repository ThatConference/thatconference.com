<script>
	export let data;

	import { fade } from 'svelte/transition';

	import seoMetaTags from '$lib/seo/metaTags';
	import { ModalWarning } from '$elements';
	import Seo from '$components/Seo.svelte';
	import { ActionHeader } from '$elements';
	import { Highlight as HighlightLink } from '$elements/links';

	import PageLayout from '../_components/PageLayout.svelte';
	import SubmissionList from './_components/submissionList.svelte';

	let { activities } = data;
	const metaTags = ((title = 'My Submissions - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your activities.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/submissions`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<PageLayout>
	<div slot="header">
		<ActionHeader title="My Session Submissions">
			<HighlightLink href="/activities/create/">Add Session</HighlightLink>
		</ActionHeader>
	</div>

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
		<!-- {:catch error}
		<ModalError
			title="KABOOM!"
			text="Well that sure didn't work as we expected."
			action={{ title: 'Return to Activities', href: '/activities' }}
		/> -->
	</div>
</PageLayout>
