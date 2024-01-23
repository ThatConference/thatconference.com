<script>
	export let sessions;
</script>

<ol class="space-y-6 bg-white/60 py-14 text-center shadow-xl shadow-blue-900/5 backdrop-blur">
	{#each sessions as session, i}
		<!-- make each of these a button -->
		<li>
			{#if i > 0}
				<div class="mx-auto mb-6 h-px w-48 bg-indigo-500/10" />
			{/if}

			<h4 class="text-lg font-semibold tracking-tight text-thatBlue-700">
				{session.name}
			</h4>

			<p class="mt-1 tracking-tight text-thatBlue-700">
				{session.description}
			</p>

			<p class="font-mono mt-1 text-sm text-slate-500">
				{session.start}
				<!-- <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}> {timeSlot.start}</time>
					{' '}-{' '}
					<time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
						{timeSlot.end}
					</time>
					{' '} PST -->
			</p>
		</li>
	{/each}
</ol>
