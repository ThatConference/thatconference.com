<script>
	export let data;
	import { useMachine } from '@xstate/svelte';
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';

	import seoMetaTags from '$lib/seo/metaTags';
	import { Waiting } from '$elements';
	import Seo from '$components/Seo.svelte';
	import { debug } from '$lib/config.public';

	import MemberCard from '$components/members/MemberCard.svelte';
	import StandardLink from '$elements/links/Standard.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';
	import Hero from '../../../../_components/attendees/Hero.svelte';

	import followerMachine from './followerMachine';

	let { followers, eventSlug, event } = data;
	let scrollThreshold = 1200;

	const metaTags = ((title = 'These are the geeks you will find at THAT Conference.') => ({
		title,
		tags: seoMetaTags({
			title,
			description:
				'Our community is made of up geeks and geeklings across the world. Here are just a few attending THAT Conference.',
			ogImages: {
				twitter: 'members-Twitter.jpg',
				facebook: 'members-Facebook.jpg',
				linkedIn: 'members-LinkedIn.jpg'
			},
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/${event.slug}/attendees`
			}
		})
	}))();

	const { state, send } = useMachine(
		followerMachine({ items: followers.members, cursor: followers.cursor, eventSlug }),
		{
			devTools: debug.xstate
		}
	);

	function handleLoadMore() {
		send('NEXT');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<ScrollThreshold bind:scrollThreshold />

<main>
	<header>
		<Hero {event} isOnline={true} />
	</header>

	<div class="relative mx-auto my-24 max-w-2xl px-4 lg:max-w-7xl">
		<header class="pb-24">
			<h2
				class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
				THAT Network
			</h2>
			<div class="flex flex-col space-y-12 text-2xl text-gray-500">
				<p>
					Have you heard the phrase, "you're only as good as your network"? At THAT Conference one
					of our core principles is connecting you with others in the community. We do this through
					our online activities, our events, and the platform we built to serve you.
				</p>
				<p>
					You can build your network either here online, or by exchanging you badges pin number.
				</p>
				<div
					class="mt-12 flex flex-col justify-end space-y-4 text-center lg:flex-row lg:space-x-4 lg:space-y-0">
					<StandardLink href="/my/profiles/public">Update your Public Profile</StandardLink>
					<StandardLink href="/my/profiles/shared">Update your Shared Profile</StandardLink>
				</div>
			</div>
		</header>

		<div>
			<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">
				Connect with others at THAT Conference
			</h3>
			<h2
				class="text mb-24 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
				Your_Tribe++;
			</h2>

			<ul class="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each $state.context.items as m, _i (m.id)}
					<li class="col-span-1">
						<MemberCard {...m} />
					</li>
				{/each}

				<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleLoadMore} />
			</ul>
			{#if ['loadingNext', 'loadedAll'].some($state.matches)}
				<div class="flex flex-grow justify-center py-12">
					<Waiting />
				</div>
			{/if}
		</div>
	</div>
</main>
