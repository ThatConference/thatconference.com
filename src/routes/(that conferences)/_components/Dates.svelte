<script>
	export let milestones;

	import lodash from 'lodash';
	import dayjs from 'dayjs';

	const milestoneMonths = lodash(milestones)
		.groupBy(({ dueDate }) => dayjs(dueDate).format('M/YYYY'))
		.sortBy(({ dueDate }) => dayjs(dueDate).format('YYYY'))
		.value();

	function hasPasted(milestone) {
		return dayjs().isAfter(milestone, 'day');
	}
</script>

<div id="dates">
	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:grid lg:grid-cols-1 lg:items-start lg:gap-32">
			<!-- left side -->
			<div class="mt-8 flex flex-col space-y-12">
				<div class="flex items-center space-x-12">
					<header class="pb-24">
						<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">
							A Good Scout is Always Prepared
						</h3>
						<h2
							class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
							Mark Your Calendar <span class="text-that-red">!important </span>
						</h2>
						<p class="mt-6 text-2xl text-gray-500">
							THAT Conference will be here before you know it. All of our planning milestone date
							are listed below and like any good software project, change from time to time.
						</p>
					</header>

					<div class="hidden sm:block">
						<img
							src="/images/characters/what_to_expect_4_days.png"
							class="lazyload h-24"
							alt="a calendar" />
					</div>
				</div>

				<div>
					<div class="divide-y divide-gray-200">
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 xl:grid-cols-3">
							{#each milestoneMonths as month}
								<div class="rounded-xl bg-white p-4 shadow-lg">
									<div class="pb-4">
										<h2 class="text-center text-2xl font-extrabold text-gray-500">
											{dayjs(month[0].dueDate).format('MMMM YYYY')}
										</h2>
									</div>

									{#each month as milestone}
										<div class="flex flex-col space-y-4">
											<div
												class="prose-lg flex space-x-4 text-gray-500"
												class:line-through={hasPasted(milestone.dueDate)}>
												<div>
													{dayjs(milestone.dueDate).format('MM/DD/YY')}
												</div>
												<div>
													{milestone.title}
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
