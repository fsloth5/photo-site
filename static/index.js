function setupFadeables() {
	const indicatorText = document.getElementById("indicator-text");

	indicatorText.addEventListener("animationend", () => {
		indicatorText.classList.remove("fade-in-text");
		indicatorText.classList.add("squish");

		indicatorText.addEventListener("pointerup", () => {
			const delayed = document.querySelectorAll(".delayed");
			const addDelay = document.querySelectorAll(".add-fade");

			indicatorText.classList.add("fade-out");

			delayed.forEach(delay => {
				delay.classList.remove("fade");
				delay.classList.add("delay_025");
				delay.classList.add("fade-out");
			});

			addDelay.forEach(delay => {
				delay.classList.add("delay_025");
				delay.classList.add("fade-out");
			});


			document.getElementById("indicator").classList.add("collapsed");
			document.getElementById("indicator-active").classList.add("fade-out");

			setTimeout(() => {
				window.location.assign("/series.html");
			}, 2200);

		});
	});
}

function handlePopIns() {
	const popIns = document.querySelectorAll(".pop-in");
	popIns.forEach(pop => {
		pop.addEventListener('animationend', () => {
			pop.classList.remove('pop-in');
		}, { once: true });
	});
}

switch (window.location.pathname) {
	case "/":
		setupFadeables()
		break;
	case "/series.html": handlePopIns();
	default:
		break;
}
