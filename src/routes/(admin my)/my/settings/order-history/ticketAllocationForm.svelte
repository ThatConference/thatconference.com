<script>
	export let allocation;
	export let orderId;

	import Icon from 'svelte-awesome';

	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import * as flashModule from 'sveltekit-flash-message/client';
	import { share, refresh } from '$components/svelte-awesome-icons';

	import { Shell as ShellButton } from '$elements/buttons';

	import ticketAllocationSchema from '$lib/formSchemas/ticketAllocation';

	let initialValues = {
		orderId,
		allocationId: allocation.id
	};

	let { event, product } = allocation;

	let allocatedTo = '';
	let isAllocated = allocation.isAllocated;

	if (allocation.isAllocated) {
		allocatedTo = `${allocation.allocatedTo.firstName} ${
			allocation.allocatedTo.lastInitial || allocation.allocatedTo.lastName
		}`;
	}

	const { form, enhance, constraints, errors } = superForm(
		superValidateSync(initialValues, ticketAllocationSchema),
		{
			id: allocation.id,
			dataType: 'json',
			validators: ticketAllocationSchema,
			syncFlashMessage: false,
			flashMessage: {
				module: flashModule
			},
			onResult: ({ result }) => {
				if (result.status === 200) {
					isAllocated = true;
					allocatedTo = `${result.data.allocatedTo.firstName} ${
						result.data.allocatedTo.lastInitial || result.data.allocatedTo.lastName
					}`;
				}
			}
		}
	);
</script>

<form use:enhance method="POST">
	<input name="orderId" bind:value={$form.orderId} type="text" hidden />
	<input name="allocationId" bind:value={$form.allocationId} type="text" hidden />

	<div
		class="flex grid-cols-7 flex-col place-content-center gap-4 space-y-2 px-4 py-6 sm:px-6 md:grid md:space-y-0">
		<div class="col-span-2">
			<p class="truncate text-sm font-medium text-thatBlue-700">
				{product.name}
			</p>

			<p class="mt-2 flex items-center text-sm text-gray-500">
				{#if product.ticketType !== 'MEMBERSHIP'}
					<span class="truncate">{event.name}</span>
				{/if}
			</p>
		</div>

		<div class="col-span-3">
			{#if isAllocated}
				<div class="flex h-12 flex-col justify-center">
					<div>
						<span class="italic text-gray-500"> allocated to: </span>
						<span class="font-semibold">
							{allocatedTo}
						</span>
					</div>
				</div>
			{:else}
				<div>
					<input
						type="email"
						bind:value={$form.emailAddress}
						{...constraints.emailAddress}
						name="emailAddress"
						placeholder="E.g. hello@that.us"
						class="form-input block h-12 w-full hover:border-gray-700 sm:text-sm sm:leading-5" />
				</div>
				{#if $errors.emailAddress}
					<small>{$errors.emailAddress}</small>
				{/if}
			{/if}
		</div>

		<div class="col-span-2">
			{#if isAllocated}
				<ShellButton>
					<button
						on:click={() => (isAllocated = false)}
						class="w-full px-8 py-1 text-center text-sm font-medium leading-5 md:px-10">
						<span>
							<Icon data={refresh} class="-ml-1 mr-2 h-4 w-4" />
						</span>
						Re-Transfer
					</button>
				</ShellButton>
			{:else}
				<button
					type="submit"
					class="h-full w-full rounded-md border-2 border-thatBlue-500 bg-white
          text-center text-base
          font-medium leading-6 text-thatBlue-500 shadow transition
          duration-150 ease-in-out
          hover:bg-thatBlue-500 hover:text-white focus:border-thatBlue-800 focus:bg-thatBlue-500 focus:text-white
          focus:outline-none focus:ring-thatBlue-500 md:text-lg">
					<span>
						<Icon data={share} class="-ml-1 mr-2 h-4 w-4" />
					</span>
					Transfer Ticket
				</button>
			{/if}
		</div>
	</div>
</form>

<style lang="postcss">
	small {
		@apply text-sm font-medium text-red-500;
	}
</style>
