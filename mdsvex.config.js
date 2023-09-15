import preview, { textFormatter, htmlFormatter } from 'remark-preview';

export default {
	extensions: ['.svx', '.md'],
	layout: {
		support: './src/_elements/layouts/markdown/Support.svelte'
	},
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		// Add a text preview snippet (no formatting) so we can use it in the meta description tag
		preview(textFormatter({ length: 300, maxBlocks: 1 })),

		// Add an HTML preview snippet (formatted) so we can use it when displaying all posts
		preview(
			htmlFormatter({
				length: 300,
				maxBlocks: 1
			}),
			{
				attribute: 'previewHtml'
			}
		)
	]
};
