<script>
	export let event;

	import { Drawer } from 'vaul-svelte';
	import { Menu } from 'lucide-svelte';

	const { slug } = event;
</script>

<Drawer.Root shouldScaleBackground>
	<Drawer.Trigger>
		<div class="fixed bottom-0 z-50 w-full">
			<button
				class="my-8 rounded-md bg-thatRed-500 px-5 py-2 text-sm font-bold tracking-wide text-white focus:outline-none">
				<div class="flex items-center space-x-4">
					<span>Quick</span>
					<Menu />
				</div>
			</button>
		</div>
	</Drawer.Trigger>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 bg-black/40" />
		<Drawer.Content
			class="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[96%] flex-col rounded-t-[10px]  bg-zinc-100">
			<div class="bottom-3 flex-1 overflow-auto rounded-t-[10px] bg-zinc-200 p-4">
				<div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-600" />
				<div class="mx-auto max-w-md">
					<h3 class="mb-4 font-extrabold uppercase tracking-wider text-thatRed-500">Quick Links</h3>

					<div class="flex flex-col space-y-4">
						<div class="space-y-2">
							<h2 class="h2Text">My Profiles</h2>
							<div class="flex flex-wrap">
								<a href="/my/profiles/primary" class="anchorButton m-2 grow">
									<div>System</div>
								</a>
								<a href="/my/profiles/public" class="anchorButton m-2 grow">
									<div>Public</div>
								</a>
								<a href="/my/profiles/shared" class="anchorButton m-2 grow">
									<div>Shared</div>
								</a>
							</div>
						</div>

						<div>
							<h2 class="h2Text">Campers</h2>
							<div class="flex flex-wrap">
								<a href={`/${slug}/speakers`} class="anchorButton m-2 grow" rel="external">
									<div>Speakers</div>
								</a>
								<a href={`/${slug}/attendees`} class="anchorButton m-2 grow" rel="external">
									<div>Attendees</div>
								</a>
							</div>
						</div>

						<div>
							<h2 class="h2Text">Schedule</h2>
							<div class="flex flex-wrap">
								<a href={`/${slug}/schedule`} class="anchorButton m-2 grow" rel="external">
									<div>Schedule</div>
								</a>
								<a href="/my/favorites" class="anchorButton m-2 grow">
									<div>My Favorites</div>
								</a>
							</div>
						</div>

						<div>
							<h2 class="h2Text">Sponsors</h2>
							<div class="flex flex-wrap">
								<a href={`/${slug}/sponsors`} class="anchorButton m-2 grow" rel="external">
									<div>Sponsors</div>
								</a>
							</div>
						</div>

						<div>
							<h2 class="h2Text">Networking</h2>
							<div class="flex flex-wrap">
								<a href="/my/network/members" class="anchorButton m-2 grow">
									<div>My Network</div>
								</a>
								<a href={`/my/member-sharing/${event.id}`} class="anchorButton m-2 grow">
									<div>Connect</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>

<style lang="postcss">
	.anchorButton {
		@apply rounded-md bg-thatBlue-500 px-4 py-2 text-center font-medium tracking-wide text-white shadow-md md:text-xl;
	}

	.anchorButton:hover {
		@apply bg-thatBlue-400 transition duration-150 ease-in-out;
	}
	.anchorButton:focus {
		@apply underline underline-offset-4;
	}

	.hText {
		@apply text-2xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}

	.h2Text {
		@apply text-xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}
</style>
