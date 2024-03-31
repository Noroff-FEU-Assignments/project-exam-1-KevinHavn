import { getContent } from "../fetch/content.mjs";

let currentPage = 1;
const postsPerPage = 10;

export async function createAndAppendPosts(posts) {
    try {
        const postsContainer = document.getElementById("posts");
        if (!postsContainer) {
            console.error('The "posts" element does not exist');
            return;
        }

        const mediaItems = await Promise.all(
            posts.map((post) => post.featured_media ? getContent(`media/${post.featured_media}`) : Promise.resolve(null))
        );

        posts.forEach((post, index) => {
            const mediaItem = mediaItems[index];
            const imageURL = mediaItem ? mediaItem.source_url : "path/to/default/image.jpg";

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
            date.innerHTML = `Published on: ${new Date(post.date).toLocaleDateString()}`;
            postCard.appendChild(date);

            let excerpt = document.createElement("div");
            excerpt.className = "post-excerpt";
            excerpt.innerHTML = post.excerpt.rendered;
            postCard.appendChild(excerpt);

            let readMoreBtn = document.createElement("button");
            readMoreBtn.classList.add("readMoreButton")
            readMoreBtn.textContent = "Read More";
            readMoreBtn.onclick = () => {
                window.location.href = `blog.html?postId=${post.id}`; 
            };
            postCard.appendChild(readMoreBtn);

            postsContainer.appendChild(postCard);
        });

		let loadMoreCard = document.getElementById("loadMoreCard");
		if (posts.length < postsPerPage) {
			loadMoreCard?.remove();
		} else {
			if (!loadMoreCard) {
				const loadMoreArea = document.getElementById("moreArea");

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
	try {
		const posts = await getContent("posts", {
			per_page: postsPerPage,
			page: currentPage,
		});
		createAndAppendPosts(posts);
	} catch (error) {
		console.error("Failed to initialize posts loading:", error);
	}
}

export function checkAndInitializePostsPage() {
	const path = window.location.pathname;
	if (path.endsWith("posts.html")) {
		initializePostsLoading();
	}
}
