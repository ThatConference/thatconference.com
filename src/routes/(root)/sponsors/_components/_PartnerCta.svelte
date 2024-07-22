<script>
	export let url;
	export let action;

	import { Standard as StandardLink } from '$elements/links';
	import { CTA } from '$elements';
</script>

<CTA>
	<h2 class="lineBreaks max-w-4xl text-3xl tracking-normal text-thatOrange-500">
		{action}
	</h2>

	<span slot="actionPrimary">
		<StandardLink href={url} class="h-3/4">Learn More</StandardLink>
	</span>
</CTA>
