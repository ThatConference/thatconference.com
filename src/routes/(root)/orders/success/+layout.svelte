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
	<!-- svelte-ignore a11y-missing-content -->
	<a name="newsletter"></a>
	<NewsletterSignup />
</div>
