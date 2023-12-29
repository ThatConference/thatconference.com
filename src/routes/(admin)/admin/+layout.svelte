<script>
	import Footer from '$components/footer/Footer.svelte';
	import NavBar from '$components/navigation/admin/NavBar.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />

	<div class="mt-12 flex-grow">
		<slot />
	</div>
	<Footer />
</div>
