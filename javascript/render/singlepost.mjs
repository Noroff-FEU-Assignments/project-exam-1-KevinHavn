import { getContent } from "../fetch/content.mjs";
import { showModal } from "./modal.mjs";

export async function displaySinglePost() {
	try {
		// Extract postId from the URL
		const params = new URLSearchParams(window.location.search);
		const postId = params.get("postId");

		if (!postId) {
			console.error("Post ID is not found in the URL.");
			return;
		}

		const post = await getContent(`posts/${postId}`);

		const postContainer = document.getElementById("post");

		const postCard = document.createElement("div");
		postCard.classList.add("card", "flex", "column", "singlePost");
		postCard.setAttribute("id", postId);
		if (!postCard) {
			console.error("Post container element does not exist");
			return;
		}

		if (post.featured_media) {
			const media = await getContent(`media/${post.featured_media}`);

			if (media) {
				let img = document.createElement("img");
				img.src = media.source_url; // Assuming media object has a source_url field
				img.alt = "Featured Image";
				img.style.cursor = "pointer"; // Make it obvious that the image is clickable
				img.onclick = function () {
					showModal(this.src, post.title.rendered || "Featured Image");
				};
				postCard.append(img);
			}
		}

		let title = document.createElement("h1");
		title.textContent = post.title.rendered;
		postCard.append(title);
		document.title = `Good Food Mood | ${post.title.rendered}`;

		let content = document.createElement("div");
		content.innerHTML = post.content.rendered; // Assuming this content is safe to use directly
		postCard.appendChild(content);

		postContainer.append(postCard);
	} catch (error) {
		console.error("Error displaying the post:", error);
	}
}
