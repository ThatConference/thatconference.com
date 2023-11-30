<script>
	import { page } from '$app/stores';
	import { Share2 } from 'lucide-svelte';

	import seoMetaTags from '$lib/seo/metaTags';

	import { ActionHeader } from '$elements';
	import { User } from '$elements/svgs';
	import { Highlight as HighlightLink } from '$elements/links';

	import Seo from '$components/Seo.svelte';
	import PageLayout from '../_components/PageLayout.svelte';

	const metaTags = ((title = 'My Network - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Your Network.',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/my/network`
			},
			nofollow: true,
			noindex: true
		})
	}))();

	const asideSelected = {
		item: 'bg-thatBlue-100 bg-opacity-25 hover:bg-opacity-25 hover:bg-thatBlue-100 border-thatBlue-500 text-thatBlue-700 hover:text-thatBlue-700 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-thatBlue-500 group-hover:text-thatBlue-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};

	const asideDefault = {
		item: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
		image: 'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6'
	};
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<PageLayout>
	<div slot="header">
		<h2 class="font-extrabold uppercase tracking-wider text-thatRed-500">my network</h2>
		<ActionHeader title="Sponsor and Member Connections">
			<HighlightLink href="/my/member-sharing">
				<div class="flex items-center space-x-4">
					<span><Share2 /></span>
					<span>New Connection Request</span>
				</div>
			</HighlightLink>
		</ActionHeader>
	</div>

	<div>
		<main class="relative -mx-6">
			<div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
				<aside class="py-3 lg:col-span-3">
					<div class="sticky top-4">
						<nav>
							<a
								href="/my/network/sponsors"
								class={$page.url.pathname.startsWith('/my/network/sponsors')
									? asideSelected.item
									: asideDefault.item}>
								<User
									classes={$page.url.pathname.startsWith('/my/network/sponsors')
										? asideSelected.image
										: asideDefault.image} />
								<span> Sponsor Network </span>
							</a>
							<a
								href="/my/network/members"
								class={$page.url.pathname.startsWith('/my/network/members')
									? asideSelected.item
									: asideDefault.item}>
								<User
									classes={$page.url.pathname.startsWith('/my/network/members')
										? asideSelected.image
										: asideDefault.image} />
								<span> Member Network </span>
							</a>
						</nav>
					</div>
				</aside>

				<div class="divide-y divide-gray-200 px-4 py-4 lg:col-span-9">
					<slot />
				</div>
			</div>
		</main>
	</div>
</PageLayout>
