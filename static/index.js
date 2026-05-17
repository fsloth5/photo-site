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

const onMobile = () => {
	if (localStorage.getItem("isOnMobile") === null) {
		localStorage.setItem("isOnMobile", true);
	}

	const windowWidth = document.documentElement.clientWidth;
	console.log(windowWidth);
	if (windowWidth < 400 || windowWidth == 768) {
		setupIndicator("albums", 860);
	} else {
		setupFadeables(removeAndAdd("fade", "fade-out"), "albums", 2200);
	}
};

const onAlbums = () => {
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
};

const onContacts = () => {
	setupFadeables(
		(delayed) => {
			delayed.forEach((delay) => {
				delay.classList.add("open");
				delay.classList.add("delay_025");
			});
		},
		localStorage.getItem("isOnMobile") ? "mobile" : "/",
		1425,
	);

	const panel = document.getElementById("panel");
	panel.classList.add("open");
	panel.getBoundingClientRect(); // force reflow
	panel.classList.remove("open");
};

switch (window.location.pathname) {
	case "/":
		setupFadeables(removeAndAdd("fade", "fade-out"), "albums", 2200);
		break;
	case "/mobile.html":
		onMobile();
		break;
	case "/albums.html": {
		onAlbums();
		break;
	}
	case "/contact.html": {
		onContacts();
		break;
	}
	default:
		console.error("Unknown page!");
		break;
}
