<script>
	import HubspotForm from './HubspotForm.svelte';
</script>

<section class="overflow-clip bg-thatBlue-700 py-12 lg:py-36">
	<div
		class="relative isolate mx-auto max-w-screen-xl px-4 sm:px-6 lg:flex lg:items-center lg:px-8">
		<div class="lg:w-0 lg:flex-1">
			<h2
				class="text-4xl font-semibold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none"
				id="newsletter-headline">
				Build Your Network
			</h2>

			<p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
				Get the 5-minute newsletter teaching tens of thousands how to grow their network and create
				the career they love in tech.
			</p>
		</div>
		<div class="mt-8 lg:ml-8 lg:mt-0">
			<HubspotForm formId={'newsletter-wide'} />
		</div>
		<svg
			viewBox="0 0 1024 1024"
			class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
			aria-hidden="true">
			<circle
				cx="512"
				cy="512"
				r="512"
				fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
				fill-opacity="0.7" />
			<defs>
				<radialGradient
					id="759c1415-0410-454c-8f7c-9a820de03641"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(512 512) rotate(90) scale(512)">
					<stop stop-color="#7775D6" />
					<stop offset="1" stop-color="#E935C1" stop-opacity="0" />
				</radialGradient>
			</defs>
		</svg>
	</div>
</section>
