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

const onHomeInMobilePhones = () => {
	const contentContainer = document.getElementById("home-page-content");
	contentContainer.classList.replace("hbox", "vbox");

	contentContainer.firstElementChild.lastElementChild.classList.replace(
		"align-end",
		"center-self",
	);

	const headerContainer = contentContainer.firstElementChild.firstElementChild;

	headerContainer.classList.replace("centered-cross", "centered-main");
	headerContainer.classList.remove("align-start");

	const mainImage = document.getElementById("welcome-img");
	mainImage.src = "/resources/main_mobile.webp";
	mainImage.classList.remove("w900px");
	mainImage.classList.add("w100");

	const quotesContainer = document.getElementById("quotes-container");
	mainImage.remove();
	const textToSplit = quotesContainer.lastElementChild;
	quotesContainer.appendChild(mainImage);
	textToSplit.innerText = '"And to do that, I only ask one thing...';
	const remainingText = document.createElement("p");
	remainingText.innerText =
		'let me into your world even if for just a brief moment."';
	remainingText.classList.add(...textToSplit.classList);
	remainingText.classList.replace("t-align-start", "t-align-center");
	quotesContainer.appendChild(remainingText);

	const spacer = document.createElement("div");
	spacer.classList.add("flex-one", "margin-sm");
	contentContainer.appendChild(spacer);
};

const onHome = () => {
	const windowWidth = document.documentElement.clientWidth;

	if (windowWidth < 400 || windowWidth === 768) {
		setupIndicator("albums", 860);
	} else {
		setupFadeables(removeAndAdd("fade", "fade-out"), "albums", 2200);
	}

	if (windowWidth < 1024) {
		onHomeInMobilePhones();
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
	if (document.documentElement.clientWidth <= 1024) {
		document.getElementById("contact-img").remove();
	}

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
		onHome();
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
