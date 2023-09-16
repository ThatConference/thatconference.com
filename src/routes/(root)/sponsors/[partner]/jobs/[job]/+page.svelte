<script>
	export let data;

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import JobHero from '../../../_components/_JobHero.svelte';
	import JobDetails from '../../../_components/_JobDetails.svelte';

	let { partner, job } = data;

	const metaTags = ((title = `${partner.jobListing.title} at ${partner.companyName}.`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${partner.jobListing.description}`,
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/partners/${partner.companyName.toLowerCase()}/${job}`
			}
		})
	}))();

	const schema = {
		'@context': 'https://schema.org/',
		'@type': 'JobPosting',
		title: partner.jobListing.title,
		description: partner.jobListing.description,
		directApply:
			partner.jobListing.applyNowLink ||
			`https://thatconference.com/partners/${partner.companyName.toLowerCase()}/${job}`,

		datePosted: partner.jobListing.datePosted || '',
		jobLocationType: 'TELECOMMUTE',
		jobLocation: {
			'@type': 'Place',
			address: {
				'@type': 'PostalAddress',
				addressLocality: partner.city,
				addressRegion: partner.state,
				addressCountry: 'US'
			}
		},

		identifier: {
			'@type': 'PropertyValue',
			name: partner.companyName,
			value: `${partner.jobListing.title} on THAT`
		},

		hiringOrganization: {
			'@type': 'Organization',
			name: partner.companyName,
			sameAs: partner.website,
			logo: partner.companyLogo
		}
	};
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<section>
	<JobHero {partner} />
</section>

<section>
	<JobDetails jobListing={partner.jobListing} />
</section>

<!-- eslint-disable-next-line  svelte/no-at-html-tags -->
{@html `<script type="application/ld+json">${JSON.stringify(schema) + '<'}/script>`}
