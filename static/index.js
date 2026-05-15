function setupFadeables(handleDelayed, nextPage, timeOut) {
	const indicatorText = document.getElementById("indicator-text");

	indicatorText.addEventListener("animationend", () => {
		indicatorText.classList.remove("fade-in-text");
		indicatorText.classList.add("squish");

		indicatorText.addEventListener("pointerup", () => {
			indicatorText.classList.add("fade-out");

			const addDelay = document.querySelectorAll(".add-fade-out");

			handleDelayed(document.querySelectorAll(".delayed"));

			addDelay.forEach((delay) => {
				delay.classList.add("delay_025");
				delay.classList.add("fade-out");
			});

			document.getElementById("indicator").classList.add("collapsed");
			document.getElementById("indicator-active").classList.add("fade-out");

			setTimeout(() => {
				window.location.assign(nextPage === "/" ? "/" : `/${nextPage}.html`);
			}, timeOut);
		});
	});
}

function setupIndicator(nextPage, timeOut) {
	const indicatorText = document.getElementById("indicator-text");

	indicatorText.addEventListener("animationend", () => {
		indicatorText.classList.remove("fade-in-text");
		indicatorText.classList.add("squish");

		indicatorText.addEventListener("pointerup", () => {
			indicatorText.classList.add("fade-out");

			document.getElementById("indicator").classList.add("collapsed");
			document.getElementById("indicator-active").classList.add("fade-out");

			setTimeout(() => {
				window.location.assign(nextPage === "/" ? "/" : `/${nextPage}.html`);
			}, timeOut);
		});
	});
}

const removeAndAdd = (originalAnimation, newAnimation) => {
	return (delayed) => {
		delayed.forEach((delay) => {
			delay.classList.remove(originalAnimation);
			delay.classList.add("delay_025");
			delay.classList.add(newAnimation);
		});
	};
};

switch (window.location.pathname) {
	case "/":
		setupFadeables(removeAndAdd("fade", "fade-out"), "albums", 2200);
		break;
	case "/m_index.html":
		const windowWidth = document.documentElement.clientWidth;
		console.log(windowWidth);
		if (windowWidth < 400 || windowWidth == 768) {
			setupIndicator("albums", 860);
		} else {
			setupFadeables(removeAndAdd("fade", "fade-out"), "albums", 2200);
		}
		break;
	case "/albums.html": {
		const popIns = document.querySelectorAll(".pop-in");
		popIns.forEach((popIn) =>
			popIn.addEventListener(
				"animationend",
				() => {
					popIn.classList.remove("pop-in");
				},
				{ once: true },
			),
		);

		setupFadeables(
			(delayed) => {
				delayed.forEach((delay) => {
					delay.classList.add("delay_025");
					delay.classList.add("pop-out");
				});
			},
			"contact",
			1375,
		);
		break;
	}
	case "/contact.html": {
		setupFadeables(
			(delayed) => {
				delayed.forEach((delay) => {
					delay.classList.add("open");
					delay.classList.add("delay_025");
				});
			},
			"/",
			1425,
		);

		const panel = document.getElementById("panel");
		panel.classList.add("open");
		panel.getBoundingClientRect(); // force reflow
		panel.classList.remove("open");
		break;
	}
	default:
		console.error("Unknown page!");
		break;
}
