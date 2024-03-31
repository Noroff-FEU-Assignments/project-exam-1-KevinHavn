import { getContent } from "./fetch/content.mjs";
import { initializeCarousel } from "./render/carousel.mjs";
import { addCarouselEventListeners } from "./listeners/carouselbuttons.mjs";
import { checkAndInitializePostsPage } from "./render/posts.mjs";
import { displaySinglePost } from "./render/singlepost.mjs";

getContent("posts");

function initializePage() {
	const path = window.location.pathname;

	// Check the pathname and call the corresponding function
	if (path.endsWith("index.html")) {
		initializeCarousel();
		addCarouselEventListeners();
	} else if (path.endsWith("posts.html")) {
		checkAndInitializePostsPage();
	} else if (path.endsWith("contact.html")) {
	} else if (path.endsWith("blog.html")) {
		displaySinglePost();
	} else {
		console.log("No specific initialization for this page.");
	}
}

document.addEventListener("DOMContentLoaded", initializePage);
