<script>
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { securityConfig } from '$lib/config.public';
	import { page } from '$app/stores';

	const config = securityConfig();

	onMount(async () => {
		const idToken = $page?.data?.session?.idToken;
		if (idToken) {
			window.location.href = `${
				config.issuerBaseURL
			}/oidc/logout?post_logout_redirect_uri=${encodeURIComponent(
				window.location.origin + '/logout'
			)}&id_token_hint=${idToken}`;
		}

		throw redirect(302, '/logout');
	});
</script>
