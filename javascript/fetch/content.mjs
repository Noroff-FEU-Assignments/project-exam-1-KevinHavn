import { baseUrl } from "../variables/variables.mjs";

export async function getContent(endpoint, params = {}) {
	let url = new URL(baseUrl + endpoint);

	Object.keys(params).forEach((key) =>
		url.searchParams.append(key, params[key])
	);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const content = await response.json();
	console.log(content);
	return content;
}
