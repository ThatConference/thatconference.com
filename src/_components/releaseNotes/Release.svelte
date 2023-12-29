<script>
	export let releaseNotes;

	import archieml from 'archieml';
	import Icon from 'svelte-awesome';
	import { externalLink } from '$components/svelte-awesome-icons';

	import { StandardLink } from '$elements';

	const getRelease = fetch(releaseNotes)
		.then((response) => response.text())
		.then((r) => archieml.load(r));
</script>

{#await getRelease then release}
	<div class="relative px-4 sm:px-6 lg:px-8">
		<div class="mx-auto mb-6 max-w-prose text-lg">
			<p
				class="text-center text-base font-semibold uppercase leading-6
          tracking-wide text-indigo-600">
				{release.versionNumber}
			</p>
			<h1
				class="mb-8 mt-2 text-center text-3xl font-extrabold leading-8
          tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
				{release.date}
			</h1>
			<p class="text-xl leading-8 text-gray-500">{release.notes}</p>
		</div>
		<div class="mx-auto max-w-prose">
			<h1
				class="mb-8 mt-2 text-3xl font-extrabold leading-8 tracking-tight
          text-gray-900 sm:text-lg">
				Major items included:
			</h1>
			<div class="mx-auto">
				<ul>
					{#each release.features as f, i (i)}
						<li>
							<div
								class="flex cursor-pointer items-center space-x-3
                  pb-2 hover:text-that-blue">
								<div>
									<Icon data={externalLink} class="h-4 w-4" />
								</div>
								<div>
									<StandardLink href={f.url}>{f.feature}</StandardLink>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/await}
