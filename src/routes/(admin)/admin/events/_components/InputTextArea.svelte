<script>
	export let sForm, field, label, description;

	import { formFieldProxy } from 'sveltekit-superforms/client';

	let { value, errors, constraints } = formFieldProxy(sForm, field);
</script>

<label for={field} class="block text-sm font-medium leading-6 text-gray-900">
	{label}
</label>
{#if description}
	<p class="mt-1 text-sm leading-6 text-gray-600">{description}</p>
{/if}
<div class="mt-2">
	<textarea
		type="text"
		name={field}
		id={field}
		bind:value={$value}
		{...$constraints}
		rows="5"
		class="form-textarea block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-thatBlue-500 sm:text-sm sm:leading-6" />

	{#if $errors}
		<small>{$errors}</small>
	{/if}
</div>

<style lang="postcss">
	small {
		@apply text-sm font-medium text-red-500;
	}
</style>
