<script>
	import FAQS from '$components/faq/_FAQs.svelte';

	const faqs = [
		{
			q: 'Can I buy on behalf of someone else?',
			a: 'Yes. Once the ticket is purchased you can visit your order history and assign it to any member of THAT. https://thatconference.com/my/settings/order-history'
		},
		{
			q: 'Can I transfer my ticket?',
			a: 'Yes, visit your order history and assign it to any member of THAT. https://thatconference.com/my/settings/order-history'
		},
		{
			q: 'Can I buy bulk tickets?',
			a: 'Yes, although if you would like a bulk discount please email us @ hello@thatconference.com.'
		},
		{
			q: 'Where do I find my annual membership discount code?',
			a: 'https://thatconference.com/my/settings/membership'
		},
		{
			q: 'Do you have a discounted rate on room and board?',
			a: 'Yes, more information can be found here: https://thatconference.com/support/travel'
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
