import { getContent } from "../fetch/content.mjs";

export async function initializeCarousel() {
	try {
		const posts = await getContent("posts", { per_page: 5 });

		const mediaIds = posts.map((post) => post.featured_media);
		const mediaItems = await Promise.all(
			mediaIds.map((id) => getContent(`media/${id}`))
		);

		const postsWithMedia = posts.map((post) => {
			const mediaItem = mediaItems.find(
				(media) => media.id === post.featured_media
			);
			return {
				...post,
				imageURL: mediaItem
					? mediaItem.source_url
					: "path/to/default/image.jpg",
			};
		});
		console.log(postsWithMedia);
		populateCarousel(postsWithMedia);
	} catch (error) {
		console.error("Error initializing carousel:", error);
	}
}

function populateCarousel(posts) {
	const carouselTrack = document.querySelector("#carouselTrack");
	carouselTrack.innerHTML = "";

	posts.forEach((post) => {
		const card = document.createElement("div");
		card.className = "flex column carouselCard card";
		card.id = post.id;
		card.innerHTML = `
          <img src="${post.imageURL || "../../images/salad.jpg"}" alt="${
			post.title.rendered
		}" />
          <h1>${post.title.rendered}</h1>
          <p>${post.excerpt.rendered}</p>
        `;

        let readMoreBtn = document.createElement("button");
        readMoreBtn.classList.add("readMoreButton")
        readMoreBtn.textContent = "Read More";
        readMoreBtn.onclick = () => {
            window.location.href = `blog.html?postId=${post.id}`; 
        };
        card.appendChild(readMoreBtn);


		carouselTrack.appendChild(card);
	});
}
