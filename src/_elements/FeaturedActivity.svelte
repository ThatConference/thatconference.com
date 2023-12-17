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
		class="h-full w-full transform rounded-lg bg-that-blue px-6 py-10 text-center shadow transition duration-500 ease-in-out hover:scale-105 hover:bg-thatBlue-400 xl:px-10 xl:text-left">
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

			<div class="flex flex-col text-lg font-medium leading-6">
				<h4 class="text-white">{title}</h4>

				<p class="text-sm italic text-thatBlue-200">
					{dayjs(startTime).format('dddd, MMMM D, YYYY - h:mm A z')}
				</p>

				<p class="text-right text-thatBlue-200">
					{`${host.firstName} ${host.lastName}`}
				</p>
			</div>
		</div>
	</div>
</a>
