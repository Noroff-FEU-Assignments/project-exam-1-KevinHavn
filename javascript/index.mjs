import { getContent } from "./fetch/content.mjs";
import { initializeCarousel } from "./render/carousel.mjs";
import { addCarouselEventListeners } from "./listeners/carouselbuttons.mjs";
import { checkAndInitializePostsPage } from "./render/posts.mjs";
import { displaySinglePost } from "./render/singlepost.mjs";


function initializePage() {
    const path = window.location.pathname;

    // Check the pathname and call the corresponding function
    if (path.endsWith("index.html") || path === '/' || path.endsWith('/')) {
        // Initialize carousel and event listeners on the home page
        initializeCarousel();
        addCarouselEventListeners();
    } else if (path.endsWith("posts.html")) {
        // Initialize any scripts specific to the posts page
        checkAndInitializePostsPage();
    } else if (path.endsWith("contact.html")) {
        // You can add specific functions for the contact page if needed
    } else if (path.endsWith("blog.html")) {
        // Initialize and display single post details on the blog page
        displaySinglePost();
    } else {
        console.log("No specific initialization for this page.");
    }
}

// You might want to call initializePage() when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);

document.addEventListener("DOMContentLoaded", initializePage);
