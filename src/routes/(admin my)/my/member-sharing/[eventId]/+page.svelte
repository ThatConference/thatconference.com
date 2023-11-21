<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Circle3 } from 'svelte-loading-spinners';
	import SuccessBanner from '$components/banners/SuccessRounded.svelte';

	import seoMetaTags from '$lib/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import NumPad from '$components/numberPad/Panel.svelte';
	import { Shell } from '$elements/buttons';
	import sharingMutationApi from '$dataSources/api.that.tech/memberShareWith/mutations';

	let showBanner = false;

	const metaTags = ((title = 'Share With Others - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Share your information with other members',
			openGraph: {
				type: 'website',
				url: `https://thatconference.com/network/members/share`
			},
			noindex: true,
			nofollow: true
		})
	}))();

	const { eventId } = $page.params;
	const { shareWithByPin } = sharingMutationApi();

	let pinNumber = '';
	let privateNotes;
	let messageToShareWith;
	let waiting = false;

	let contactExchangeError = false;
	let contactExchangeErrorMessage;

	async function handleContactShare() {
		if (!pinNumber) {
			return;
		}
		waiting = true;
		const { isSuccess, message } = await shareWithByPin({
			eventId,
			pin: pinNumber,
			notes: privateNotes,
			messageToShareWith
		});

		waiting = false;

		if (isSuccess) {
			showBanner = true;
			setTimeout(() => {
				showBanner = false;
			}, 2000);

			pinNumber = '';
			privateNotes = undefined;
			messageToShareWith = undefined;
		} else {
			contactExchangeError = true;
			contactExchangeErrorMessage = message;
		}
	}

	function tryAgain() {
		contactExchangeError = false;
		contactExchangeErrorMessage = undefined;
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<div class="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
	<h1 class="mt-2 text-xl font-bold leading-6 text-thatBlue-800">THAT Contact Exchange</h1>
	<div
		class:opacity-100={showBanner}
		class="mx-auto max-w-sm opacity-0 transition-opacity duration-700 ease-out">
		<SuccessBanner>Contact Saved!</SuccessBanner>
	</div>

	<div class="absolute right-0 top-0 block pr-4 pt-4">
		<button
			type="button"
			class="rounded-full border-2 border-gray-200 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-thatBlue-500 focus:ring-offset-2"
			on:click={() => goto('/my/network/members')}>
			<span class="sr-only">Close</span>
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
	<div class="mx-auto mt-0 max-w-sm">
		{#if waiting}
			<div class="relative my-6 flex flex-col items-center space-y-6">
				<Circle3
					size={'60'}
					unit={'px'}
					ballTopLeft="#f74646"
					ballTopRight="#ff834d"
					ballBottomLeft="#26529A"
					ballBottomRight="#555555" />

				<div class="mt-2">
					<p class="text-md leading-5 text-gray-500">Invoking api and adding contact.</p>
				</div>
			</div>
		{:else if contactExchangeError}
			<div class="relative my-6 flex flex-col space-y-6">
				<div class="mt-2">
					<p class="text-md leading-5 text-gray-500">
						{contactExchangeErrorMessage}
					</p>
				</div>

				<div class="flex">
					<Shell>
						<button
							type="button"
							class="w-full py-4 text-sm font-medium leading-5"
							on:click={() => tryAgain()}>
							<span class="text-lg">Retry</span>
						</button>
					</Shell>
				</div>
			</div>
		{:else}
			<div class="flex w-full flex-col space-y-4">
				<div class="rounded-xl border bg-gray-50 bg-opacity-50 p-8 shadow-md">
					<NumPad
						on:digit={(event) => {
							pinNumber = pinNumber.concat(event.detail);
						}}
						on:backspace={() => {
							pinNumber = pinNumber.slice(0, -1);
						}} />
				</div>

				<div
					class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-thatBlue-800 focus-within:ring-1 focus-within:ring-thatBlue-800">
					<!-- svelte-ignore a11y-autofocus -->
					<input
						autofocus
						type="text"
						name="pinNumber"
						bind:value={pinNumber}
						class="block w-full border-0 p-0 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
						placeholder="E.g. 1234" />
				</div>

				<div>
					<textarea
						name="messageToShareWith"
						type="textarea"
						rows="4"
						multiline={true}
						bind:value={messageToShareWith}
						class="form-input w-full rounded-md border border-gray-300 hover:border-gray-700 sm:text-sm sm:leading-5"
						placeholder="Add a custom message along with the share notification. &#13;E.g. It was great meeting you at THAT, let's discus more about Sveltekit." />
				</div>

				<div class="flex">
					<Shell>
						<button
							disabled={pinNumber.length < 1}
							type="button"
							class="w-full py-4 text-sm font-medium leading-5"
							on:click={() => handleContactShare()}>
							<span class="text-lg">Connect</span>
						</button>
					</Shell>
				</div>

				<div>
					<textarea
						name="notes"
						type="textarea"
						rows="6"
						multiline={true}
						bind:value={privateNotes}
						class="form-input w-full rounded-md border border-gray-300 hover:border-gray-700 sm:text-sm sm:leading-5"
						placeholder="Add any private notes here. &#13;E.g. Great Sveltekit discussion with Jane." />
				</div>
			</div>
		{/if}
	</div>
</div>
