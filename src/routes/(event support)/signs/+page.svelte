<script>
	export let data;

	const { levels } = data;

	const pioneer = levels['PIONEER'] ?? [];
	const explorer = levels['EXPLORER'] ?? [];
	let pioneerCounter = 0;
	let explorerCounter = 0;
	let counter = 0;
	let currentImage;
	let interval = 6000;

	// initially displayed
	currentImage = '/images/THAT-Full-Wide.svg';
	pioneerCounter += 1;
	counter += 1;

	(function loop() {
		setTimeout(() => {
			if (counter % 2 === 0) {
				const pioneerImage = pioneer[pioneerCounter]?.companyLogo;
				if (pioneerImage) {
					currentImage = pioneerImage;
					pioneerCounter += 1;
					if (pioneerCounter === pioneer.length) {
						pioneerCounter = 0;
					}
					interval = 6000;
				}
			} else {
				const explorerImage = explorer[explorerCounter]?.companyLogo;
				if (explorerImage) {
					currentImage = explorerImage;
					explorerCounter += 1;
					if (explorerCounter === explorer.length) {
						explorerCounter = 0;
					}
					interval = 3000;
				}
			}
			counter += 1;
			loop();
		}, interval);
	})();
</script>

<div class="bg-[url('/images/tv-background.png')] bg-cover bg-center">
	<div class="flex min-h-screen min-w-min flex-col items-center justify-center">
		<img class="-mt-32 h-3/4 w-3/4" src={currentImage} alt="logo" />
	</div>
</div>
