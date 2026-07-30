const PHOTO_WALL_COVER_SIZES = ["small", "medium", "tall", "wide", "huge"];
const GRAY_PLACEHOLDER =
	'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect width="1" height="1" fill="%23cccccc"/%3E%3C/svg%3E';
const ANIMATION_DELAY = "delay_015";

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

function setupFadeables(handleAnimatedIn, nextPage, timeOut) {
	const indicatorText = document.getElementById("indicator-text");

	indicatorText.addEventListener(
		"animationend",
		(e) => {
			if (e.animationName !== "fadeInLeft") return;
			indicatorText.classList.remove("fade-in-text");
		},
		{ once: true },
	);

	indicatorText.addEventListener(
		"pointerup",
		() => {
			indicatorText.classList.add("fade-out");

			handleAnimatedIn(document.querySelectorAll(".animated"));

			const addFadeOut = document.querySelectorAll(".add-fade-out");

			for (const delay of addFadeOut) {
				delay.classList.add("fade-out");
			}

			document.getElementById("indicator").classList.add("collapsed");
			document.getElementById("indicator-active").classList.add("fade-out");

			setTimeout(() => {
				window.location.assign(nextPage === "/" ? "/" : `/${nextPage}.html`);
			}, timeOut);
		},
		{ once: true },
	);
}

function onHome() {
	function createHomePageContentMobile() {
		// Root container
		const homePageContent = document.createElement("div");
		homePageContent.id = "home-page-content";
		homePageContent.classList.add(
			"vbox",
			"centered-cross",
			"stretched-height",
			"no-select",
		);

		// Header row (logo + title)
		const headerRow = document.createElement("div");
		headerRow.classList.add(
			"hbox",
			"centered-cross",
			"box-spacing-sm",
			"fade",
			ANIMATION_DELAY,
			"no-wrap",
		);

		const logo = document.createElement("img");
		logo.src = "/resources/logo.svg";
		logo.alt = "The comany's logo";
		logo.width = 32;
		logo.height = 32;

		const title = document.createElement("h1");
		title.classList.add("font-size-m");
		title.textContent = "G.C. Photography";

		headerRow.appendChild(logo);
		headerRow.appendChild(title);

		// Welcome image
		const welcomeImg = document.createElement("img");
		welcomeImg.id = "welcome-img";
		welcomeImg.classList.add(
			"flexbox-res-img",
			ANIMATION_DELAY,
			"fade",
			"add-fade-out",
		);
		welcomeImg.src = "/resources/main.webp";
		welcomeImg.alt = "A portrait of a woman";

		// Caption / welcome-text
		const welcomeText = document.createElement("div");
		welcomeText.id = "welcome-text";
		welcomeText.classList.add("vbox", "center-txt", "margin-m");

		const p1 = document.createElement("p");
		p1.classList.add(ANIMATION_DELAY, "fade", "animated", "add-fade-out");
		p1.textContent = "Those moments that often times get overlooked.";

		const p2 = document.createElement("p");
		p2.classList.add(ANIMATION_DELAY, "fade", "animated", "add-fade-out");
		p2.textContent =
			"I want to capture them...and in order to do that I ask, let me into your world even if just for a brief moment.";

		welcomeText.appendChild(p1);
		welcomeText.appendChild(p2);

		// Indicator
		const indicator = document.createElement("div");
		indicator.id = "indicator";
		indicator.classList.add(
			"hbox",
			"centered-cross",
			"box-spacing-m",
			"align-end",
			"flex-one",
		);

		const indicatorText = document.createElement("h2");
		indicatorText.id = "indicator-text";
		indicatorText.classList.add(
			"fade-in-text",
			"font-size-xl",
			"font-weight-n",
			"squish",
		);
		indicatorText.textContent = "Welcome!";

		const dotsContainer = document.createElement("div");
		dotsContainer.classList.add(
			"vbox",
			"box-spacing-sm",
			ANIMATION_DELAY,
			"fade",
		);

		const svgNS = "http://www.w3.org/2000/svg";

		function createEllipseSvg({ id, collapsible }) {
			const svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute("width", "15");
			svg.setAttribute("height", "15");
			if (id) svg.id = id;
			if (collapsible) {
				svg.classList.add("collapsible");
				svg.setAttribute("fill", "none");
				svg.setAttribute("stroke", "black");
			}

			const ellipse = document.createElementNS(svgNS, "ellipse");
			ellipse.setAttribute("cx", "7.5");
			ellipse.setAttribute("cy", "7.5");
			ellipse.setAttribute("rx", "7.5");
			ellipse.setAttribute("ry", "7.5");

			svg.appendChild(ellipse);
			return svg;
		}

		const activeDot = createEllipseSvg({
			id: "indicator-active",
			collapsible: false,
		});
		const dot2 = createEllipseSvg({ collapsible: true });
		const dot3 = createEllipseSvg({ collapsible: true });

		dotsContainer.appendChild(activeDot);
		dotsContainer.appendChild(dot2);
		dotsContainer.appendChild(dot3);

		indicator.appendChild(indicatorText);
		indicator.appendChild(dotsContainer);

		// Assemble everything
		homePageContent.appendChild(headerRow);
		homePageContent.appendChild(welcomeImg);
		homePageContent.appendChild(welcomeText);
		homePageContent.appendChild(indicator);

		return homePageContent;
	}

	function createHomePageContentDesktop() {
		const svgNS = "http://www.w3.org/2000/svg";

		function createEllipseSvg({ id, collapsible }) {
			const svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute("width", "15");
			svg.setAttribute("height", "15");
			if (id) svg.id = id;
			if (collapsible) {
				svg.classList.add("collapsible");
				svg.setAttribute("fill", "none");
				svg.setAttribute("stroke", "black");
			}

			const ellipse = document.createElementNS(svgNS, "ellipse");
			ellipse.setAttribute("cx", "7.5");
			ellipse.setAttribute("cy", "7.5");
			ellipse.setAttribute("rx", "7.5");
			ellipse.setAttribute("ry", "7.5");

			svg.appendChild(ellipse);
			return svg;
		}

		// Root container
		const homePageContent = document.createElement("div");
		homePageContent.id = "home-page-content";
		homePageContent.classList.add(
			"vbox",
			"centered-cross",
			"stretched-height",
			"no-select",
		);

		// Header row (logo + title)
		const headerRow = document.createElement("div");
		headerRow.classList.add(
			"hbox",
			"centered-cross",
			"align-start",
			"box-spacing-sm",
			"fade",
			ANIMATION_DELAY,
		);

		const logo = document.createElement("img");
		logo.src = "/resources/logo.svg";
		logo.alt = "The comany's logo";
		logo.width = 32;
		logo.height = 32;

		const title = document.createElement("h1");
		title.classList.add("font-size-m");
		title.textContent = "G.C. Photography";

		headerRow.appendChild(logo);
		headerRow.appendChild(title);

		// Content row (welcome-text + welcome-img side by side)
		const contentRow = document.createElement("div");
		contentRow.classList.add("hbox", "centered-main", "stretched-height");

		// Welcome text column
		const welcomeText = document.createElement("div");
		welcomeText.id = "welcome-text";
		welcomeText.classList.add("vbox", "center-txt", "margin-m");

		const p1 = document.createElement("p");
		p1.classList.add(ANIMATION_DELAY, "fade", "animated", "add-fade-out");
		p1.textContent = "Those moments that often times get overlooked.";

		const spacer1 = document.createElement("div");
		spacer1.classList.add("flex-one", "margin-m");

		const p2 = document.createElement("p");
		p2.classList.add(ANIMATION_DELAY, "fade", "animated", "add-fade-out");
		p2.textContent = "I want to capture them";

		const spacer2 = document.createElement("div");
		spacer2.classList.add("flex-one", "margin-m");

		const p3 = document.createElement("p");
		p3.classList.add(ANIMATION_DELAY, "fade", "animated", "add-fade-out");
		p3.textContent =
			"...and in order to do that I ask, let me into your world even if just for a brief moment.";

		const spacer3 = document.createElement("div");
		spacer3.classList.add("flex-one", "margin-m");

		// Indicator
		const indicator = document.createElement("div");
		indicator.id = "indicator";
		indicator.classList.add(
			"hbox",
			"centered-cross",
			"box-spacing-m",
			"align-end",
			"flex-one",
		);

		const indicatorText = document.createElement("h2");
		indicatorText.id = "indicator-text";
		indicatorText.classList.add(
			"fade-in-text",
			"font-size-xl",
			"font-weight-n",
			"squish",
		);
		indicatorText.textContent = "Welcome!";

		const dotsContainer = document.createElement("div");
		dotsContainer.classList.add(
			"vbox",
			"box-spacing-sm",
			ANIMATION_DELAY,
			"fade",
		);

		const activeDot = createEllipseSvg({
			id: "indicator-active",
			collapsible: false,
		});
		const dot2 = createEllipseSvg({ collapsible: true });
		const dot3 = createEllipseSvg({ collapsible: true });

		dotsContainer.appendChild(activeDot);
		dotsContainer.appendChild(dot2);
		dotsContainer.appendChild(dot3);

		indicator.appendChild(indicatorText);
		indicator.appendChild(dotsContainer);

		// Assemble welcome-text
		welcomeText.appendChild(p1);
		welcomeText.appendChild(spacer1);
		welcomeText.appendChild(p2);
		welcomeText.appendChild(spacer2);
		welcomeText.appendChild(p3);
		welcomeText.appendChild(spacer3);
		welcomeText.appendChild(indicator);

		// Welcome image
		const welcomeImg = document.createElement("img");
		welcomeImg.id = "welcome-img";
		welcomeImg.classList.add(
			"flexbox-res-img",
			ANIMATION_DELAY,
			"fade",
			"add-fade-out",
		);
		welcomeImg.src = "/resources/main.webp";
		welcomeImg.alt = "A portrait of a woman";

		// Assemble content row
		contentRow.appendChild(welcomeText);
		contentRow.appendChild(welcomeImg);

		// Assemble everything
		homePageContent.appendChild(headerRow);
		homePageContent.appendChild(contentRow);

		return homePageContent;
	}

	document.body.appendChild(
		window.innerWidth > 1024
			? createHomePageContentDesktop()
			: createHomePageContentMobile(),
	);

	setupFadeables(
		(elements) => {
			for (const animated of elements) {
				animated.classList.remove(ANIMATION_DELAY);
				animated.classList.remove("fade");
			}
		},
		"albums",
		1025,
	);
}

function onAlbums() {
	readjustHeader();

	document
		.getElementById("modal-close-btn")
		.addEventListener("pointerdown", () => {
			modal.classList.add("closing");
		});

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

	let albumsCovers = document.getElementById("album-thumbnails");

	document.getElementById("hq-icon").addEventListener("animationend", (e) => {
		if (e.animationName !== "squish") return;
		const target = e.target;
		const showHq = target.dataset.showHq === "false";
		target.dataset.showHq = showHq;
		target.src = showHq ? "/resources/hq-active.svg" : "/resources/hq.svg";
	});

	const makePhotoCover = () => {
		const cover = document.createElement("div");

		cover.classList.add(
			"scale-on-hover",
			"pop-in",
			"animated",
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
		(elements) => {
			for (const animation of elements) {
				animation.classList.add(ANIMATION_DELAY);
				if (animation.classList.contains("rotate-180")) {
					animation.classList.add("unrotate_180-popout");
				} else {
					animation.classList.add("pop-out");
				}
			}
		},
		"contact",
		1125,
	);

	const arrow =
		document.getElementById("indicator").nextElementSibling.firstElementChild;

	arrow.addEventListener("pointerdown", () => {
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
			document.getElementById("indicator").nextElementSibling.lastElementChild;
		albumName.innerText = "";
		albumName.classList.replace("fade-in-text", "fade-out");
		state.lastSet = null;
	});

	const addFade = (el) => el.classList.add("fade-out");

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
					document.getElementById("indicator").nextElementSibling
						.lastElementChild;
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
		(elements) => {
			for (const animated of elements) {
				animated.classList.add("open");
				animated.classList.add(ANIMATION_DELAY);
			}
		},
		"/",
		905,
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
