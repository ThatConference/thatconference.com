<script>
	import { onMount, getContext } from 'svelte';

	import NewsletterSignup from '$components/newsletter/Wide.svelte';

	const { send } = getContext('cart');

	onMount(() => {
		send('CLEAR_CART');
	});
</script>

<slot />
<div class="mt-24">
	<NewsletterSignup />
</div>
