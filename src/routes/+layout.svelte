<script>
	export let data;

	import '../app.css';

	import { onMount, setContext } from 'svelte';
	import { navigating, page, updated } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import { browser, dev } from '$app/environment';
	import posthog from 'posthog-js';

	import lodash from 'lodash';
	import * as Sentry from '@sentry/svelte';
	import { getFlash } from 'sveltekit-flash-message/client';

	import loading from '$lib/stores/loading';
	import cart from '$lib/cart';
	import claimTicket from '$lib/claimTicket';

	import SuccessFlashBanner from '$components/banners/Success.svelte';
	import ErrorFlashBanner from '$components/banners/Error.svelte';
	import Preloading from '$components/preloading.svelte';
	import { recaptcha } from '$lib/config.public';
	import { memberSharingStore } from '$lib/stores/memberSharing';
	import { meFollowingStore } from '$lib/stores/meFollowing';

	// setup the context on the cart for later usage
	setContext('claimTicket', claimTicket);
	setContext('cart', cart);
	setContext('correlationId', data.correlationId);
	setContext('DROP_DOWN_KEY_VALUE_PAIRS', data.dropDownKeyValuePairs);

	const { memberSharing, meFollowing = [] } = data;
	memberSharingStore.set(memberSharing);
	setContext('memberSharing', memberSharingStore);
	meFollowingStore.set(meFollowing);
	setContext('meFollowing', meFollowingStore);

	const { isEmpty } = lodash;
	const flash = getFlash(page);
	let currentPath = '';

	beforeNavigate(({ willUnload, to, from }) => {
		// https://kit.svelte.dev/docs/configuration#version
		if ($updated && !willUnload && to?.url) {
			location.href = to.url.href;
		}

		if ($flash && from?.url.toString() !== to?.url.toString()) {
			$flash = undefined;
		}
	});

	if (!dev && browser) {
		navigating.subscribe((event) => {
			if (event) {
				let { to } = event;
				let _hsq = (window._hsq = window._hsq || []);
				_hsq.push(['setPath', to.url.pathname]);
				_hsq.push(['trackPageView']);
			}
		});

		posthog.init('phc_g3DmFJkVOQwUMd3LIpvB6NEXfcoH64NLzM6se5Lra4', {
			api_host: 'https://thatconference.com/ingest',
			capture_pageview: false,
			capture_pageleave: false,
			loaded(ph) {
				if (ph.isFeatureEnabled('enable-session-recording')) {
					ph.config.disable_session_recording = false;
				}
			}
		});
	}

	onMount(() => {
		if (window.grecaptcha) {
			/* eslint-disable no-undef */
			window.grecaptcha.enterprise.ready(async () => {
				/* eslint-disable no-undef */
				await window.grecaptcha.enterprise.execute(recaptcha.siteKey, { action: 'site_load' });
			});
		}

		if (window.FrontChat) {
			window.FrontChat('init', {
				chatId: '7b05ee77044ae53947facbe0aae7d894',
				useDefaultLauncher: true
			});
		}
		if (typeof window !== 'undefined') {
			const unsubscribePage = page.subscribe(($page) => {
				if (currentPath && currentPath !== $page.url.pathname) {
					posthog.capture('$pageleave');
				}

				currentPath = $page.url.pathname;
				posthog.capture('$pageview');
			});

			const handleBeforeUnload = () => {
				posthog.capture('$pageleave');
			};
			window.addEventListener('beforeunload', handleBeforeUnload);

			return () => {
				unsubscribePage();
				window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		}
	});

	$: if (!isEmpty(data.user.profile)) {
		if (!dev && browser) {
			let { id, email, firstName, lastName } = data.user.profile;

			Sentry.setUser({
				email,
				id
			});

			posthog.identify(id, {
				email,
				firstName,
				lastName
			});

			let _hsq = (window._hsq = window._hsq || []);
			_hsq.push([
				'identify',
				{
					email,
					id,
					firstName,
					lastName
				}
			]);
		}
	}
</script>

<div>
	{#if browser}
		{#if $navigating || $loading}
			<Preloading />
		{/if}
	{/if}
	<div>
		{#if $flash}
			<div class="relative z-10">
				{#if $flash.type == 'success'}
					<SuccessFlashBanner on:dismiss={() => ($flash = null)}>
						<p class="py-2 text-lg font-medium">
							{$flash.message}
						</p>
					</SuccessFlashBanner>
				{:else if $flash.type == 'error'}
					<ErrorFlashBanner on:dismiss={() => ($flash = null)}>
						<p class="py-2 text-lg font-medium">
							{$flash.message}
						</p>
					</ErrorFlashBanner>
				{/if}
			</div>
		{/if}
	</div>
	<div class="overflow-clip">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(.strike) {
		text-decoration: line-through;
	}

	:global(.prose a) {
		color: #26529a;
		text-decoration: underline;
		text-decoration-style: line;
		text-decoration-color: #26529a;
		text-decoration-thickness: 0.01em;
		text-underline-offset: 6px;
	}

	:global(.prose a:hover) {
		color: #26529a;
		text-decoration: underline;
		text-decoration-style: line;
		text-decoration-color: #26529a;
		text-decoration-thickness: 0.1em;
		text-underline-offset: 3px;
	}

	:global(.a-decorate) {
		color: #26529a;
		text-decoration: underline;
		text-decoration-style: line;
		text-decoration-color: #26529a;
		text-decoration-thickness: 0.01em;
		text-underline-offset: 6px;
	}
	:global(.a-decorate:hover) {
		color: #26529a;
		text-decoration: underline;
		text-decoration-style: line;
		text-decoration-color: #26529a;
		text-decoration-thickness: 0.1em;
		text-underline-offset: 3px;
	}

	:global(.anchorButton) {
		@apply rounded-md bg-thatBlue-500 px-4 py-4 text-center font-medium tracking-wide text-white shadow-md md:text-xl;
	}

	:global(.anchorButton:hover) {
		@apply bg-thatBlue-400 transition duration-150 ease-in-out;
	}

	:global(.anchorButton:focus) {
		@apply underline underline-offset-4;
	}

	:global(.lineBreaks) {
		white-space: pre-line;
	}

	:global(.tag-form-input .svelte-tags-input-tag) {
		background: #252f3f;
	}

	:global(.sveltejs-forms .field.error input, .sveltejs-forms .field.error textarea) {
		--text-opacity: 1;
		border: 1px solid rgba(224, 36, 36, var(--text-opacity));
	}
	:global(.sveltejs-forms .field.error .message) {
		margin-top: 0.2rem;
		font-style: italic;
		--text-opacity: 1;
		color: rgba(224, 36, 36, var(--text-opacity));
	}

	:global(select) {
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
	}

	:global(.centerIcon) {
		--size: 100px;
		position: fixed;
		top: 0;
		left: 0;
		inset: calc(50% - calc(var(--size) / 2));
		border-radius: var(--size);
		height: var(--size);
		width: var(--size);
	}

	:global(.grecaptcha-badge) {
		visibility: hidden;
	}
</style>
