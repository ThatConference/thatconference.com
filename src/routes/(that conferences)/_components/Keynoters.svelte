<script>
	export let keynoters = [];
</script>

<div class="relative">
	<div class="mx-auto max-w-2xl px-4 lg:max-w-7xl">
		<header class="pb-24">
			<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">
				This Year's Keynoters
			</h3>
			<h2 class="hText mb-8 mt-8">Your_Inner_Geek = Inspired;</h2>
			<p class="mt-6 text-2xl text-gray-500">
				Ship dates, bugs, that project manager who just won't stop looking over your shoulder. We
				get it. As fellow practitioners, we know what it's like to be in the trenches and sometimes
				it's easy to forget why the semicolons matter. That's why we start everyday with a keynote,
				to help us recenter and find our inner geek.
			</p>
		</header>

		<div class="keynoteGrid mt-16">
			{#each keynoters as keynoter}
				<div>
					<div class="flex flex-col items-center pb-8">
						<span class="hText">{keynoter.speakers[0].firstName}</span>

						<span class="text-5xl font-thin">{keynoter.speakers[0].lastName}</span>
					</div>
					<div class="kgItem grid">
						<div class="overflow-hidden">
							<div class="kgItemHover">
								<a href={`/members/${keynoter.speakers[0].profileSlug}`}>
									<img
										class="object-fit w-full object-scale-down"
										src={keynoter.speakers[0].profileImage}
										alt={keynoter.speakers[0].firstName + ' ' + keynoter.speakers[0].lastName} />
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div>
			<p class="mt-16 text-center text-lg">
				Watch <a class="a-decorate" href="schedule">in-person</a> or live on
				<a class="a-decorate" href="https://youtube.com/c/thatconference">YouTube</a>.
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.hText {
		@apply text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10;
	}

	.kgItem {
		@apply h-96 place-self-stretch bg-gradient-to-t from-thatRed-500 to-thatOrange-500 p-4 shadow-xl;
	}

	.kgItemHover {
		@apply transform transition duration-500 ease-in-out hover:scale-105;
	}

	.keynoteGrid {
		@apply flex flex-col items-center gap-4 lg:grid lg:grid-cols-3;
	}
</style>
