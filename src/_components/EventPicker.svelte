<script>
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '$elements/actions';

	const dispatch = createEventDispatcher();
</script>

<div
	class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
	<div class="fixed inset-0 transition-opacity">
		<div class="fixed inset-0 bg-gray-500 opacity-75" />
	</div>

	<div
		use:clickOutside
		on:click_outside
		class="relative rounded-lg bg-white p-10 shadow-xl sm:w-full sm:max-w-3xl">
		<div class="flex items-center justify-center space-x-8">
			<div class="text-4xl font-extrabold tracking-tight text-thatBlue-800">Select an Event</div>
			<button on:click={() => dispatch('eventSelected', { event: 'TX' })}>
				<div
					class="flex h-32 w-32 transform cursor-pointer items-center rounded-md p-2 shadow-lg transition duration-500 ease-in-out hover:scale-110 hover:bg-slate-200">
					<img class="w-32" src="/images/characters/TestLongHorn.svg" alt="THAT Logo" />
				</div>
			</button>
			<button on:click={() => dispatch('eventSelected', { event: 'WI' })}>
				<div
					class="flex h-32 w-32 transform cursor-pointer items-center rounded-md p-2 shadow-lg transition duration-500 ease-in-out hover:scale-110 hover:bg-slate-200">
					<img class="w-32" src="/images/characters/TestMoose.svg" alt="THAT Logo" />
				</div>
			</button>
		</div>
	</div>
</div>
