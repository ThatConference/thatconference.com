<script>
	export let id;
	export let title;
	export let speakers;
	export let startTime;

	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat.js';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import config from '$lib/config.public';

	import buildImageSrc from '$lib/image';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(advancedFormat);

	const host = speakers[0];
	const profileImage = host.profileImage ? host.profileImage : config.defaultProfileImage;

	const userProfileImage = profileImage || config.defaultProfileImage;
	const srcset = buildImageSrc(userProfileImage, ['160', '224']);
</script>

<a data-sveltekit-prefetch href="/activities/{id}">
	<div
		class="h-full w-full transform rounded-lg bg-white/5 px-3 py-6 text-center text-white shadow ring-1 ring-white/10 transition duration-500 ease-in-out hover:scale-105 hover:bg-gray-50 hover:text-gray-500 xl:px-10 xl:text-left">
		<div class="space-y-6 xl:space-y-10">
			<div
				class="mx-auto h-40 w-40 rounded-full bg-gradient-to-t from-thatRed-500 to-thatOrange-500 xl:h-56 xl:w-56">
				<img
					class="lazyload h-40 w-40 rounded-full p-1 xl:h-56 xl:w-56"
					data-sizes="auto"
					data-src={srcset.src}
					data-srcset={srcset.srcset}
					alt={`${host.firstName} ${host.lastName}`} />
			</div>

			<div class="flex flex-col text-center text-lg font-bold">
				<h4>{title}</h4>

				<p class="mt-2 text-sm font-light">
					{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}
				</p>

				<p class="mt-2 text-right text-lg font-bold leading-9">
					{`${host.firstName} ${host.lastName}`}
				</p>
			</div>
		</div>
	</div>
</a>
