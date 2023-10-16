<script>
	import { onMount } from 'svelte';

	onMount(() => {
		// session-storage ensures that we reload only once!
		const isAppReloaded = sessionStorage.getItem('reloadApp') || 'false';
		if (isAppReloaded === 'false') {
			sessionStorage.setItem('reloadApp', 'true');
			window.location.reload();
		}
	});
</script>
