<script>
	export let data;

	import { page } from '$app/stores';
	import lodash from 'lodash';

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Warning } from '$elements/svgs';

	import SharedProfileForm from './sharedProfileForm.svelte';

	const { isEmpty } = lodash;

	const metaTags = ((title = 'My Shared Profile - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create or update your shared THAT profile.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/my/profiles/shared/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if !isEmpty($page.data.user.profile)}
	<SharedProfileForm sForm={data.form} />
{:else}
	<div class="mt-8">
		<div class="flex items-center">
			<div class="mr-4">
				<Warning classes="h-12 w-12 text-red-500" />
			</div>

			<h2 class="prose-xl text-gray-500">
				Please complete your main profile before trying to create a shared one.
			</h2>
		</div>
	</div>
{/if}
