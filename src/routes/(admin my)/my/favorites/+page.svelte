<script>
	export let data;

	import dayjs from 'dayjs';
	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { ModalWarning, ActionHeader } from '$elements';
	import { Highlight as HighlightLink } from '$elements/links';
	import { Highlight as HighlightButton } from '$elements/buttons';
	import { csvGenerator } from '$lib/csv';

	import ActivityList from '$components/activities/List.svelte';
	import PageLayout from '../_components/PageLayout.svelte';

	let { activities } = data;

	const metaTags = ((title = 'My Favorites - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "You're list of favorited activities.",
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/my/favorites`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	const isDate = (checkDate) => dayjs(checkDate).isValid;

	const csvDownloadHandler = () => {
		const csvdata = activities.map((a) => ({
			id: a.id,
			startTime: isDate(a.startTime) ? dayjs(a.startTime).toISOString() : '',
			day: isDate(a.startTime) ? dayjs(a.startTime).format('dddd') : '',
			slot: isDate(a.startTime) ? dayjs(a.startTime).format('HH:mm') : '',
			room: a.location?.destination ? a.location?.destination : '',
			title: a.title ? a.title : '',
			speakers: a.speakers.map((s) => `${s.firstName} ${s.lastName}`).join(';'),
			priCategory: a.priCategory ? a.priCategory : '',
			sessionLink: `https://thatconference.com/activites/${a.id}/`,
			sessionType: a.type
		}));

		const tableHeader = [
			'Id',
			'Start Time',
			'Day',
			'Slot',
			'Room',
			'Title',
			'Speakers',
			'Category',
			'Link',
			'Type'
		];

		const tableKeys = Object.keys(csvdata[0]);
		csvGenerator(csvdata, tableKeys, tableHeader, 'THAT-My-Favorites.csv');
	};
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<PageLayout>
	<div slot="header">
		<ActionHeader title="My Favorites">
			<HighlightLink href="/support/my-favorites-icalendar/">Subscribe</HighlightLink>
			<HighlightButton on:click={csvDownloadHandler}>Download</HighlightButton>
		</ActionHeader>
	</div>

	<div>
		{#if activities.length > 0}
			<ActivityList reverse={false} {activities} />
		{:else}
			<div class="p-12">
				<ModalWarning
					title="No Favorites!"
					text="Hold on a minute! You haven't favorited any activities yet. Get
            on it!" />
			</div>
		{/if}
	</div>
</PageLayout>
