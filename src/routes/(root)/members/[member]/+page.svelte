<script>
	export let data;

	import { fade } from 'svelte/transition';

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import memberMutationApi from '$dataSources/api.that.tech/members/mutations';

	import UpNext from '../_components/upNext.svelte';
	import Followers from '../_components/followers.svelte';
	import CTA from '../_components/cta.svelte';
	import LifeHack from '../_components/lifeHack.svelte';
	import MeritBadges from '../_components/meritBadges.svelte';
	import Hero from '../_components/hero.svelte';

	let { memberSlug, profile, followers, isFollowing } = data;
	let delayCounter = 200;

	const { toggleFollow } = memberMutationApi();

	const metaTags = ((title = `${profile.firstName} ${profile.lastName} - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `${profile.bio}`,
			openGraph: {
				url: `https://thatconference.com/members/${memberSlug}`
			}
		})
	}))();

	function getDelay() {
		let current = delayCounter;
		delayCounter = delayCounter + 200;

		return current;
	}

	async function followProfile(slug) {
		const r = await toggleFollow(slug);
		isFollowing = r;
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="flex flex-col">
	<div in:fade={{ delay: getDelay() }}>
		<Hero {isFollowing} member={profile} on:TOGGLE_FOLLOW={() => followProfile(memberSlug)} />
	</div>

	{#if profile.lifeHack}
		<div in:fade={{ delay: getDelay() }}>
			<LifeHack quote={profile.lifeHack} name={`${profile.firstName} ${profile.lastName}`} />
		</div>
	{/if}

	<div in:fade={{ delay: getDelay() }}>
		<UpNext profileSlug={memberSlug} />
	</div>

	<div in:fade={{ delay: getDelay() }}>
		<Followers followers={followers.followers.profiles} />

		{#if profile.earnedMeritBadges.length > 0}
			<MeritBadges meritBadges={profile.earnedMeritBadges} />
		{/if}

		<CTA {isFollowing} {profile} on:TOGGLE_FOLLOW={() => followProfile(memberSlug)} />
	</div>
</div>
