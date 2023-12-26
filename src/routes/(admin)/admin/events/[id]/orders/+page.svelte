<script>
	export let data;

	import dayjs from 'dayjs';
	const { orders } = data;

	const sortedOrders = orders.orders.sort((a, b) =>
		dayjs(a.orderDate).isAfter(dayjs(b.orderDate)) ? -1 : 1
	);
</script>

<div class="mx-auto my-24 w-full max-w-screen-2xl px-4 sm:px-6">
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="text-base font-semibold leading-6 text-gray-900">Event Orders</h1>
				<p class="mt-2 text-sm text-gray-700">A list of all orders for a given event.</p>
			</div>
			<div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
				<a
					class="block rounded-md bg-thatBlue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-thatBlue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-thatBlue-600"
					href="/admin/events/create">
					Create Order
				</a>
			</div>
		</div>
		<div class="-mx-4 mt-8 sm:-mx-0">
			<table class="min-w-full divide-y divide-gray-300">
				<thead>
					<tr>
						<th
							scope="col"
							class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
							Member Name
						</th>
						<th
							scope="col"
							class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
							Date
						</th>
						<th
							scope="col"
							class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
							Id
						</th>
						<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
							Status
						</th>
						<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
							Order Type
						</th>
						<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
							<span class="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each sortedOrders as order}
						<tr>
							<td
								class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
								{order.member.firstName}
								{order.member.lastName}
							</td>
							<td class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
								{dayjs(order.orderDate).format('dddd, MMMM D, YYYY')}
							</td>
							<td class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
								{order.id}
							</td>
							<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status}</td>
							<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.orderType}</td>
							<td class="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
								<div class="flex space-x-8">
									<a href={`/admin/events/${order.id}`} class="a-decorate">
										Refund<span class="sr-only">, {order.id}</span>
									</a>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
