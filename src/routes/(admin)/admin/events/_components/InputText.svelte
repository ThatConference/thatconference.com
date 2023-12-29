<script>
	export let sForm, field, label;
	export let type = 'text';

	import { formFieldProxy } from 'sveltekit-superforms/client';

	let { value, errors, constraints } = formFieldProxy(sForm, field);

	function typeAction(node) {
		node.type = type;
	}
</script>

<label for={field} class="block text-sm font-medium leading-6 text-gray-900">
	{label}
</label>
<div class="mt-2">
	<div
		class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-thatBlue-500 sm:max-w-md">
		<input
			use:typeAction
			name={field}
			id={field}
			bind:value={$value}
			{...$constraints}
			class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-thatBlue-500 sm:text-sm sm:leading-6" />
	</div>

	{#if $errors}
		<small>{$errors}</small>
	{/if}
</div>

<style lang="postcss">
	small {
		@apply text-sm font-medium text-red-500;
	}
</style>
