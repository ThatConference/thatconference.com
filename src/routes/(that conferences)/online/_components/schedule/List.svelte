<script>
	export let sessions;
</script>

<ol class="space-y-14 bg-white/60 py-14 shadow-xl shadow-blue-900/5 backdrop-blur">
	{#each sessions as session}
		<li class="px-4">
			<p class="font-mono text-col flex items-center justify-center pb-8 text-center text-lg">
				<span class="flex-grow border-t border-gray-300"></span>
				<span class="px-3 text-gray-400">{session.start}</span>
				<span class="flex-grow border-t border-gray-300"></span>
			</p>

			<h4 class="text-lg font-semibold tracking-tight text-thatBlue-700">
				{session.name}
			</h4>

			<p class="mt-4 tracking-tight text-thatBlue-700">
				{session.description}
			</p>
		</li>
	{/each}
</ol>
