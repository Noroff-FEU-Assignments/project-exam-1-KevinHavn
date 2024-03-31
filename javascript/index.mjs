import { getContent } from "./fetch/content.mjs";
import { initializeCarousel } from "./render/carousel.mjs";
import { addCarouselEventListeners } from "./listeners/carouselbuttons.mjs";
import { checkAndInitializePostsPage } from "./render/posts.mjs";
import { displaySinglePost } from "./render/singlepost.mjs";

function initializePage() {
	const path = window.location.pathname;

	let normalizedPath = path;
	if (!normalizedPath.endsWith(".html") && normalizedPath !== "/") {
		normalizedPath = `${normalizedPath.replace(/\/$/, "")}.html`;
	}

	if (normalizedPath.endsWith("index.html") || normalizedPath === "/") {
		initializeCarousel();
		addCarouselEventListeners();
	} else if (normalizedPath.endsWith("posts.html")) {
		checkAndInitializePostsPage();
	} else if (normalizedPath.endsWith("contact.html")) {
	} else if (normalizedPath.endsWith("blog.html")) {
		displaySinglePost();
	} else {
		console.log("No specific initialization for this page.");
	}
}

document.addEventListener("DOMContentLoaded", initializePage);
