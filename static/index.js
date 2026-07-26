const PHOTO_WALL_COVER_SIZES = ["small", "medium", "tall", "wide", "huge"];
const GRAY_PLACEHOLDER =
	'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect width="1" height="1" fill="%23cccccc"/%3E%3C/svg%3E';

const state = { lastSet: null };

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

function setupFadeables(handleDelayed, nextPage, timeOut) {
	const indicatorText = document.getElementById("indicator-text");

	indicatorText.addEventListener("animationend", () => {
		indicatorText.classList.remove("fade-in-text");

		indicatorText.addEventListener("pointerup", () => {
			indicatorText.classList.add("fade-out");

			const addDelay = document.querySelectorAll(".add-fade-out");

			handleDelayed(document.querySelectorAll(".delayed"));

			for (const delay of addDelay) {
				delay.classList.add("delay_025");
				delay.classList.add("fade-out");
			}

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

function removeAndAdd(originalAnimation, newAnimation) {
	return (delayed) => {
		for (const delay of delayed) {
			delay.classList.remove(originalAnimation);
			delay.classList.add("delay_025");
			delay.classList.add(newAnimation);
		}
	};
}

function onHome() {
	setupIndicator("albums", 860);
	setupFadeables(removeAndAdd("fade", "fade-out"), "albums", 2200);
}

function onHomeInMobilePhones() {
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
	textToSplit.classList.replace("t-align-start", "t-align-end");

	const remainingText = document.createElement("p");
	remainingText.innerText =
		'let me into your world even if for just a brief moment."';
	remainingText.classList.add(...textToSplit.classList);
	remainingText.classList.replace("t-align-end", "t-align-center");

	quotesContainer.appendChild(remainingText);

	const spacer = document.createElement("div");
	spacer.classList.add("flex-one", "margin-sm");
	contentContainer.appendChild(spacer);
}

function onAlbums() {
	readjustHeader();

	let albumsCovers = document.getElementById("album-thumbnails");

	const makePhotoCover = () => {
		const cover = document.createElement("div");

		cover.classList.add(
			"scale-on-hover",
			"pop-in",
			"delayed",
			"photo",
			PHOTO_WALL_COVER_SIZES[
				Math.floor(Math.random() * PHOTO_WALL_COVER_SIZES.length)
			],
		);

		return cover;
	};

	for (let i = 0; i < 10; ++i) {
		const cover = makePhotoCover();
		cover.classList.add("initial");
		albumsCovers.appendChild(cover);
	}

	const resetPopIns = () => {
		const popIns = document.querySelectorAll(".pop-in");

		for (const popIn of popIns) {
			popIn.addEventListener(
				"animationend",
				() => {
					popIn.classList.remove("pop-in");
				},
				{ once: true },
			);
		}
	};

	resetPopIns();

	setupFadeables(
		(delayed) => {
			for (const delay of delayed) {
				delay.classList.add("delay_015");
				if (delay.classList.contains("rotate-180")) {
					delay.classList.add("unrotate_180-popout");
				} else {
					delay.classList.add("pop-out");
				}
			}
		},
		"contact",
		1375,
	);

	const arrow =
		document.getElementById("indicator").firstElementChild.lastElementChild
			.firstElementChild;

	arrow.addEventListener("pointerup", () => {
		if (!state.lastSet) return;

		while (albumsCovers.firstElementChild) {
			const lastElement = albumsCovers.lastElementChild;
			albumsCovers.removeChild(lastElement);
		}

		for (const cover of state.lastSet) {
			cover.classList.replace("fade-out", "fade-in");
			cover.classList.add("pop-in");
			albumsCovers.appendChild(cover);
		}

		resetPopIns();

		arrow.classList.replace("display-block", "display-none");

		const albumName =
			document.getElementById("indicator").firstElementChild.lastElementChild
				.lastElementChild;
		albumName.innerText = "";
		albumName.classList.replace("fade-in-text", "fade-out");
		state.lastSet = null;
	});

	const addFade = (el) => el.classList.add("fade-out");

	const modal = document.getElementById("photo-modal");
	modal.addEventListener("pointerdown", (e) => {
		if (e.target === modal) {
			modal.classList.add("closing");
		}
	});

	modal.addEventListener("animationend", (e) => {
		if (e.animationName === "slideDown") {
			modal.classList.remove("closing");
			modal.close();
		}
	});

	const onPointerDown = (e) => {
		if (state.lastSet) {
			modal.showModal();
			return;
		}

		const selectedAlbumCover = e.target;
		if (!selectedAlbumCover.classList.contains("photo")) return;

		const others = [...albumsCovers.children].filter(
			(child) => child !== selectedAlbumCover,
		);

		let remaining = others.length;

		const onFadeEnd = (e) => {
			if (e.animationName !== "fadeOut") return;

			--remaining;

			e.target.removeEventListener("animationend", onFadeEnd);

			if (remaining !== 0) return;

			addFade(selectedAlbumCover);

			albumsCovers = document.getElementById("album-thumbnails");

			const onSelectedFadeEnd = (e) => {
				if (e.animationName !== "fadeOut") return;

				arrow.classList.replace("display-none", "display-block");

				const albumName =
					document.getElementById("indicator").firstElementChild
						.lastElementChild.lastElementChild;
				albumName.innerText = "Album Name";

				albumName.classList.remove("fade-out");
				albumName.classList.add("fade-in-text");

				state.lastSet = [];

				while (albumsCovers.firstElementChild) {
					state.lastSet.unshift(
						albumsCovers.removeChild(albumsCovers.lastElementChild),
					);
				}

				for (let i = 0; i < 5; ++i) {
					albumsCovers.appendChild(makePhotoCover());
				}

				resetPopIns();

				selectedAlbumCover.removeEventListener(
					"animationend",
					onSelectedFadeEnd,
				);
			};

			selectedAlbumCover.addEventListener("animationend", onSelectedFadeEnd);
		};

		for (const child of others) {
			addFade(child);
			child.addEventListener("animationend", onFadeEnd);
		}
	};

	albumsCovers.addEventListener("pointerdown", onPointerDown);
}

function onContacts() {
	const panel = document.getElementById("panel");
	panel.classList.add("open");
	panel.getBoundingClientRect(); // force reflow
	panel.classList.remove("open");

	readjustHeader();

	setupFadeables(
		(delayed) => {
			for (const delay of delayed) {
				delay.classList.add("open");
				delay.classList.add("delay_025");
			}
		},
		"/",
		1425,
	);
}

function readjustHeader() {
	if (document.documentElement.clientWidth > 1024) {
		return;
	}

	const headerText = document.getElementById("header-text");
	headerText.classList.replace("centered-cross", "centered-main");

	const indicatorContainer = document.getElementById("indicator");
	const indicators = indicatorContainer.lastElementChild;
	indicators.classList.replace("vbox", "hbox");
	indicators.classList.replace("centered-main", "centered-cross");
	indicators.classList.add("center-self");
}
