import { getContent } from "../fetch/content.mjs";

let currentPage = 1;
const postsPerPage = 10;

export async function createAndAppendPosts(posts) {
	console.log("createAndAppendPosts called with posts:", posts);

	try {
		const postsContainer = document.getElementById("posts");
		if (!postsContainer) {
			console.error('The "posts" element does not exist');
			return;
		}

		console.log("Fetching media items for posts...");
		const mediaItems = await Promise.all(
			posts.map((post) =>
				post.featured_media
					? getContent(`media/${post.featured_media}`)
					: Promise.resolve(null)
			)
		);

		console.log("Media items fetched:", mediaItems);

		posts.forEach((post, index) => {
			console.log(`Processing post ${index + 1}:`, post);
			const mediaItem = mediaItems[index];
			const imageURL = mediaItem
				? mediaItem.source_url
				: "path/to/default/image.jpg";

			let postCard = document.createElement("div");
			postCard.className = "card flex column justify-center";

			let img = document.createElement("img");
			img.src = imageURL;
			img.alt = post.title.rendered;
			postCard.appendChild(img);

			let title = document.createElement("h2");
			title.innerHTML = post.title.rendered;
			postCard.appendChild(title);

			let date = document.createElement("p");
			date.className = "post-date";
			date.innerHTML = `Published on: ${new Date(
				post.date
			).toLocaleDateString()}`;
			postCard.appendChild(date);

			let excerpt = document.createElement("div");
			excerpt.className = "post-excerpt";
			excerpt.innerHTML = post.excerpt.rendered;
			postCard.appendChild(excerpt);

			let readMoreBtn = document.createElement("button");
			readMoreBtn.classList.add("readMoreButton");
			readMoreBtn.textContent = "Read More";
			readMoreBtn.onclick = () => {
				window.location.href = `blog.html?postId=${post.id}`;
			};
			postCard.appendChild(readMoreBtn);

			postsContainer.appendChild(postCard);
		});

		console.log("Posts have been appended to the container.");

		let loadMoreCard = document.getElementById("loadMoreCard");
		if (posts.length < postsPerPage) {
			console.log(
				"Less posts than posts per page. Removing 'Load More' button if exists."
			);
			loadMoreCard?.remove();
		} else {
			console.log(
				"Equal or more posts than posts per page. Ensuring 'Load More' button exists."
			);
			if (!loadMoreCard) {
				const loadMoreArea = document.getElementById("moreArea");

				if (!loadMoreArea) {
					console.error('The "moreArea" element does not exist');
					return;
				}

				loadMoreCard = document.createElement("div");
				loadMoreCard.setAttribute("id", "loadMoreCard");
				loadMoreCard.classList.add("card", "flex", "column");

				let loadMoreTitle = document.createElement("h2");
				loadMoreTitle.innerText = "Want to see more of our posts?";
				loadMoreCard.appendChild(loadMoreTitle);

				let loadMoreBtn = document.createElement("button");
				loadMoreBtn.id = "loadMoreBtn";
				loadMoreBtn.textContent = "Load More";
				loadMoreCard.appendChild(loadMoreBtn);

				loadMoreArea.appendChild(loadMoreCard);

				loadMoreBtn.onclick = async () => {
					console.log("Load More button clicked.");
					currentPage++;
					const newPosts = await getContent("posts", {
						per_page: postsPerPage,
						page: currentPage,
					});
					createAndAppendPosts(newPosts);
				};
			}
		}
	} catch (error) {
		console.error("Error creating and appending posts:", error);
	}
}

export async function initializePostsLoading() {
	console.log("initializePostsLoading called");
	try {
		const posts = await getContent("posts", {
			per_page: postsPerPage,
			page: currentPage,
		});
		console.log("Posts fetched: ", posts);
		createAndAppendPosts(posts);
	} catch (error) {
		console.error("Failed to initialize posts loading:", error);
	}
}

export function checkAndInitializePostsPage() {
	const path = window.location.pathname;
	console.log("checkAndInitializePostsPage called, path: ", path);
	if (
		path.endsWith("posts.html") ||
		path.endsWith("/posts") ||
		path === "/posts"
	) {
		console.log("Initializing posts loading.");
		initializePostsLoading();
	} else {
		console.log(
			"checkAndInitializePostsPage: Path does not match posts.html or /posts."
		);
	}
}
