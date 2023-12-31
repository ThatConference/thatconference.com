<script>
	import FAQS from '$components/faq/_FAQs.svelte';

	const faqs = [
		{
			q: 'Can I watch any of the other sessions at THAT Conference?',
			a: "No. We're only streaming the activities on the main stage."
		},
		{
			q: 'Will this be recorded?',
			a: 'No but everything that is streamed will be available on our YouTube channel after the conference.'
		},
		{
			q: "I don't see my name in the attendee list online?",
			a: "You're missing a public and shared profile. Please update your profiles and make sure you've opted in to share to make your public profile, well public."
		},
		{
			q: 'Do I get a t-shirt?',
			a: 'Nope, but you can check out our merch store, https://store.thatconference.com.'
		},
		{
			q: 'Can I connect with any of the sponsors at THAT Conference?',
			a: 'Yes! When logged in you can visit each one of the sponsor pages and hit the connect button in the top right hand corner. Make sure you have your shared profile up-to-date.'
		},
		{
			q: "I'm interested in becoming a sponsor.",
			a: "That's wonderful to hear. Please contact us at partnerships@thatconference.com."
		}
	];
</script>

<div id="faq">
	<FAQS {faqs} />
</div>
