import { getContent } from "./fetch/content.mjs";
import { initializeCarousel } from "./render/carousel.mjs";
import { addCarouselEventListeners } from "./listeners/carouselbuttons.mjs";
import { checkAndInitializePostsPage } from "./render/posts.mjs";
import { displaySinglePost } from "./render/singlepost.mjs";

function initializePage() {
	const path = window.location.pathname;

	if (path.endsWith("index.html") || path === "/") {
		initializeCarousel();
		addCarouselEventListeners();
	} else if (
		path.endsWith("posts.html") ||
		path.endsWith("/posts") ||
		path === "/posts"
	) {
		checkAndInitializePostsPage();
	} else if (
		path.endsWith("contact.html") ||
		path.endsWith("/contact") ||
		path === "/contact"
	) {
	} else if (
		path.endsWith("blog.html") ||
		path.endsWith("/blog") ||
		path === "/blog"
	) {
		displaySinglePost();
	} else {
		console.log("No specific initialization for this page.");
	}
}

document.addEventListener("DOMContentLoaded", initializePage);
