import { initializeCarousel } from "./render/carousel.mjs";
import { addCarouselEventListeners } from "./listeners/carouselbuttons.mjs";
import { checkAndInitializePostsPage } from "./render/posts.mjs";
import { displaySinglePost } from "./render/singlepost.mjs";

function initializePage() {
	const path = window.location.pathname;

	// Define normalizedPath based on the current path
	let normalizedPath = path;
	if (!normalizedPath.endsWith(".html") && normalizedPath !== "/") {
		normalizedPath = `${normalizedPath.replace(/\/$/, "")}.html`;
	}

	console.log("Current normalized path:", normalizedPath);

	if (normalizedPath.endsWith("index.html") || normalizedPath === "/") {
		console.log("Initializing index page");
		initializeCarousel();
		addCarouselEventListeners();
	} else if (
		normalizedPath.endsWith("posts.html") ||
		path.endsWith("/posts") ||
		path === "/posts"
	) {
		console.log("Initializing posts page");
		checkAndInitializePostsPage();
	} else if (
		normalizedPath.endsWith("contact.html") ||
		path.endsWith("/contact") ||
		path === "/contact"
	) {
		console.log("Initializing contact page");
	} else if (
		normalizedPath.endsWith("blog.html") ||
		path.endsWith("/blog") ||
		path === "/blog"
	) {
		console.log("Initializing blog page");
		displaySinglePost();
	} else {
		console.log("No specific initialization for this page.");
	}
}

document.addEventListener("DOMContentLoaded", initializePage);

document.addEventListener("DOMContentLoaded", initializePage);

document.addEventListener("DOMContentLoaded", initializePage);
