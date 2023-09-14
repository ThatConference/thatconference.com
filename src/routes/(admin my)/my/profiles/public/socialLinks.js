import {
	linkedin,
	facebook,
	twitter,
	instagram,
	github,
	youtubePlay,
	twitch
} from '$components/svelte-awesome-icons';

export default [
	{
		linkType: 'GITHUB',
		name: 'github',
		icon: github,
		slug: 'https://github.com/'
	},
	{
		linkType: 'TWITTER',
		name: 'twitter',
		icon: twitter,
		slug: 'https://twitter.com/'
	},
	{
		linkType: 'LINKEDIN',
		name: 'linkedin',
		icon: linkedin,
		slug: 'https://linkedin.com/in/'
	},
	{
		linkType: 'INSTAGRAM',
		name: 'instagram',
		icon: instagram,
		slug: 'https://instagram.com/'
	},
	{
		linkType: 'FACEBOOK',
		name: 'facebook',
		icon: facebook,
		slug: 'https://facebook.com/'
	},
	{
		linkType: 'YOUTUBE',
		name: 'youtube',
		icon: youtubePlay,
		slug: ['https://youtube.com/channel/', 'https://youtube.com/c/']
	},
	{
		linkType: 'TWITCH',
		name: 'twitch',
		icon: twitch,
		slug: 'https://twitch.com/'
	}
];
