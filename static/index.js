function setupFadeables(originalAnimation, animationName, nextPage, timeOut) {
	const indicatorText = document.getElementById("indicator-text");

	indicatorText.addEventListener("animationend", () => {
		indicatorText.classList.remove("fade-in-text");
		indicatorText.classList.add("squish");

		indicatorText.addEventListener("pointerup", () => {
			const delayed = document.querySelectorAll(".delayed");
			const addDelay = document.querySelectorAll(".add-fade");

			indicatorText.classList.add("fade-out");

			delayed.forEach((delay) => {
				delay.classList.remove(originalAnimation);
				delay.classList.add("delay_025");
				delay.classList.add(animationName);
			});

			addDelay.forEach((delay) => {
				delay.classList.add("delay_025");
				delay.classList.add("fade-out");
			});

			document.getElementById("indicator").classList.add("collapsed");
			document.getElementById("indicator-active").classList.add("fade-out");

			console.log(nextPage);
			setTimeout(() => {
				window.location.assign(nextPage === "/" ? "/" : `/${nextPage}.html`);
			}, timeOut);
		});
	});
}

switch (window.location.pathname) {
	case "/":
		setupFadeables("fade", "fade-out", "series", 2200);
		break;
	case "/series.html": {
		setupFadeables("pop-in", "pop-out", "contact", 1125);
		break;
	}
	case "/contact.html": {
		setupFadeables("open", "open", "/", 1125);
		document.getElementById("panel").classList.toggle("open");
		break;
	}
	default:
		console.error.log("Unknown page!");
		break;
}
