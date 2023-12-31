<script>
	export let event;

	import { LeftArrow } from '$elements/svgs';
</script>

<div class="relative col-span-1 grid h-14 place-self-center bg-that-navy text-white">
	<div class="mx-8 flex items-center justify-between">
		<div class="font-semibold antialiased">
			<a href="/" class="flex items-center space-x-2">
				<LeftArrow />
				<span>THAT</span>
			</a>
		</div>

		<div>
			<a href={`/${event.slug}`}>
				<div class="flex space-x-4 font-semibold uppercase tracking-wide antialiased">
					<div class="uppercase">THAT Conference Online</div>
				</div>
			</a>
		</div>
	</div>
</div>
