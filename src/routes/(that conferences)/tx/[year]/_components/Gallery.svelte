<script>
	import ImageGallery from '../../../_components/ImageGallery.svelte';

	const items = [
		{
			src: '/images/gallery/tx/52682420922.jpeg',
			url: 'https://flickr.com/thatconference/52682420922'
		},
		{
			src: '/images/gallery/tx/52221125957.jpeg',
			url: 'https://flickr.com/thatconference/52221125957'
		},
		{
			src: '/images/gallery/tx/52682422662.jpeg',
			url: 'https://flickr.com/thatconference/52682422662'
		},
		{
			src: '/images/gallery/tx/52682929506.jpeg',
			url: 'https://flickr.com/thatconference/52682929506'
		},
		{
			src: '/images/gallery/tx/52682413507.jpeg',
			url: 'https://flickr.com/thatconference/52682413507'
		},
		{
			src: '/images/gallery/tx/52682425742.jpeg',
			url: 'https://flickr.com/thatconference/52682425742'
		},
		{
			src: '/images/gallery/tx/52683217939.jpeg',
			url: 'https://flickr.com/thatconference/52683217939'
		},
		{
			src: '/images/gallery/tx/52683232524.jpeg',
			url: 'https://flickr.com/thatconference/52683232524'
		},
		{
			src: '/images/gallery/tx/52683359850.jpeg',
			url: 'https://flickr.com/thatconference/52683359850'
		},
		{
			src: '/images/gallery/tx/52683376215.jpeg',
			url: 'https://flickr.com/thatconference/52683376215'
		},
		{
			src: '/images/gallery/tx/52682924066.jpeg',
			url: 'https://flickr.com/thatconference/52682924066'
		},
		{
			src: '/images/gallery/tx/52683376855.jpeg',
			url: 'https://flickr.com/thatconference/52683376855'
		},
		{
			src: '/images/gallery/tx/52683380625.jpeg',
			url: 'https://flickr.com/thatconference/52683380625'
		},
		{
			src: '/images/gallery/tx/52683441438.jpeg',
			url: 'https://flickr.com/thatconference/52683441438'
		},
		{
			src: '/images/gallery/tx/52683450183.jpeg',
			url: 'https://flickr.com/thatconference/5268345018'
		},
		{
			src: '/images/gallery/tx/52221053172.jpeg',
			url: 'https://flickr.com/thatconference/52221053172'
		},
		{
			src: '/images/gallery/tx/52221083522.jpeg',
			url: 'https://flickr.com/thatconference/52221083522'
		},
		{
			src: '/images/gallery/tx/52221097442.jpeg',
			url: 'https://flickr.com/thatconference/52221097442'
		},
		{
			src: '/images/gallery/tx/52221100252.jpeg',
			url: 'https://flickr.com/thatconference/52221100252'
		},
		{
			src: '/images/gallery/tx/52221102662.jpeg',
			url: 'https://flickr.com/thatconference/52221102662'
		},
		{
			src: '/images/gallery/tx/52221117502.jpeg',
			url: 'https://flickr.com/thatconference/52221117502'
		},

		{
			src: '/images/gallery/tx/52221126047.jpeg',
			url: 'https://flickr.com/thatconference/52221126047'
		},
		{
			src: '/images/gallery/tx/52222070096.jpeg',
			url: 'https://flickr.com/thatconference/52222070096'
		},
		{
			src: '/images/gallery/tx/52222095321.jpeg',
			url: 'https://flickr.com/thatconference/52222095321'
		},
		{
			src: '/images/gallery/tx/52222114681.jpeg',
			url: 'https://flickr.com/thatconference/52222114681'
		},
		{
			src: '/images/gallery/tx/52222121241.jpeg',
			url: 'https://flickr.com/thatconference/52222121241'
		},
		{
			src: '/images/gallery/tx/52222125498.jpeg',
			url: 'https://flickr.com/thatconference/52222125498'
		},
		{
			src: '/images/gallery/tx/52222127973.jpeg',
			url: 'https://flickr.com/thatconference/52222127973'
		},
		{
			src: '/images/gallery/tx/52222330254.jpeg',
			url: 'https://flickr.com/thatconference/52222330254'
		},
		{
			src: '/images/gallery/tx/52222347694.jpeg',
			url: 'https://flickr.com/thatconference/52222347694'
		},
		{
			src: '/images/gallery/tx/52222376794.jpeg',
			url: 'https://flickr.com/thatconference/52222376794'
		},
		{
			src: '/images/gallery/tx/52222378519.jpeg',
			url: 'https://flickr.com/thatconference/52222378519'
		},
		{
			src: '/images/gallery/tx/52222385664.jpeg',
			url: 'https://flickr.com/thatconference/52222385664'
		},
		{
			src: '/images/gallery/tx/52222388674.jpeg',
			url: 'https://flickr.com/thatconference/52222388674'
		},
		{
			src: '/images/gallery/tx/52222393044.jpeg',
			url: 'https://flickr.com/thatconference/52222393044'
		},
		{
			src: '/images/gallery/tx/52222399904.jpeg',
			url: 'https://flickr.com/thatconference/52222399904'
		},
		{
			src: '/images/gallery/tx/52222401209.jpeg',
			url: 'https://flickr.com/thatconference/52222401209'
		},
		{
			src: '/images/gallery/tx/52222560345.jpeg',
			url: 'https://flickr.com/thatconference/52222560345'
		},
		{
			src: '/images/gallery/tx/52222561765.jpeg',
			url: 'https://flickr.com/thatconference/52222561765'
		},
		{
			src: '/images/gallery/tx/52222564775.jpeg',
			url: 'https://flickr.com/thatconference/52222564775'
		},
		{
			src: '/images/gallery/tx/52222585860.jpeg',
			url: 'https://flickr.com/thatconference/52222585860'
		},
		{
			src: '/images/gallery/tx/52222595270.jpeg',
			url: 'https://flickr.com/thatconference/52222595270'
		},
		{
			src: '/images/gallery/tx/52222602175.jpeg',
			url: 'https://flickr.com/thatconference/52222602175'
		},
		{
			src: '/images/gallery/tx/52222614065.jpeg',
			url: 'https://flickr.com/thatconference/52222614065'
		},
		{
			src: '/images/gallery/tx/52222615895.jpeg',
			url: 'https://flickr.com/thatconference/52222615895'
		},
		{
			src: '/images/gallery/tx/52222617320.jpeg',
			url: 'https://flickr.com/thatconference/52222617320'
		}
	];
</script>

<div class="relative mt-48">
	<header class="pb-24 text-center">
		<h3 class="font-extrabold uppercase tracking-wider text-thatRed-500">Our Portal To The Past</h3>
		<h2
			class="text mb-8 mt-8 text-4xl font-bold leading-8 tracking-tight text-thatBlue-700 sm:text-5xl sm:leading-10">
			let you = new Memories();
		</h2>
	</header>
	<ImageGallery {items} />
</div>
