<script>
	import { fade } from 'svelte/transition';

	import { Trees } from '$elements/svgs';

	import NavBar from '$components/navigation/default/NavBar.svelte';
	import Footer from '$components/footer/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />
	<div class="flex-grow">
		<div class="inset-y-0 hidden h-full w-full lg:block">
			<div class="invisible lg:visible" in:fade={{ delay: 200, duration: 2000 }}>
				<Trees
					classes="opacity-25 fixed w-4/6 h-5/6 -right-48 -top-52 bottom-4/12 left-5/12 text-thatBlue-100" />
			</div>
		</div>

		<main class="pb-12">
			<slot />
		</main>
	</div>
	<Footer />
</div>
