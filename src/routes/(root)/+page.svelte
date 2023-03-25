<script>
	export let data;

	import { page } from '$app/stores';
	// import { useMachine } from '@xstate/svelte';

	// import { debug } from '$utils/config.public';
	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import {
		TrustedBy,
		Hero,
		CTA,
		CtaMembership,
		Newsletter,
		ThatActiveEvents
	} from './_root/components';

	// import createMachine from './_root/machines/upNext';

	// let { thatActiveEvents, activitiesUpNext, sponsors } = data;
	let { thatActiveEvents, sponsors } = data;
	const metaTags = ((
		title = 'Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share and learn together. Home of THAT Conference.'
	) => ({
		title,
		tags: seoMetaTags({
			title,
			description:
				'Howdy. We’re a full-stack, tech-obsessed community of fun, code-loving humans who share and learn together. We geek-out in Texas and Wisconsin once a year but we host digital events all the time. Home of THAT Conference.'
		})
	}))();

	// const { state, send } = useMachine(
	// 	createMachine({
	// 		items: activitiesUpNext.sessions.filter((s) => s),
	// 		cursor: activitiesUpNext.cursor
	// 	}),
	// 	{
	// 		debug: debug.xstate
	// 	}
	// );
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div>
	<Hero />
	<ThatActiveEvents events={thatActiveEvents} />
</div>

<div>
	{#if !$page.data.user.isAuthenticated}
		<CTA />
	{:else if !$page.data.user.profile?.isMember}
		<CtaMembership />
	{/if}

	<Newsletter />

	<TrustedBy {sponsors} />
</div>
