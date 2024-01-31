<script>
	import StandardLink from '$elements/links/Standard.svelte';
</script>

<div class="relative mx-auto max-w-screen-xl px-8">
	<header class="pb-24">
		<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">Streaming Now</h3>
		<h2
			class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
			Watch THAT Conference Live
		</h2>
		<p class="mt-6 text-2xl text-gray-500">
			THAT Conference is here and we're not streaming from the main stage. Watch the keynotes live,
			panel sessions and a few live podcasts.
		</p>
		<div class="flex justify-end font-extrabold text-red-500">
			<StandardLink href="https://www.youtube.com/@ThatConference/streams"
				>Watch on YouTube</StandardLink>
		</div>
	</header>

	<div>
		<div class="pt-8">
			<div style="width:100%;height:0px;position:relative;padding-bottom:56.25%;">
				<iframe
					title="THAT Conference Live Stream"
					src="https://streamyard.com/watch/SuNsBhW8jH7J?embed=true"
					width="100%"
					height="100%"
					frameborder="0"
					allow="autoplay; fullscreen"
					style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"
				></iframe>
			</div>
		</div>
	</div>
</div>
