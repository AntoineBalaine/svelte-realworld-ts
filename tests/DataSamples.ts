import type * as ApiTypes from "$lib/ApiTypes";

export const articleSample: ApiTypes.components["schemas"]["Article"] = {
	slug: "thething",
	title: "The thing",
	description: "this article is about a thing",
	body: "This is the article’s content. Fascinating, isn’t it?",
	tagList: ["fascinating", "article", "thing", "things"],
	/** Format: date-time */
	createdAt: new Date().toString(),
	/** Format: date-time */
	updatedAt: new Date().toString(),
	favorited: false,
	favoritesCount: 55,
	author: {
		username: "el svelte autor",
		bio: "the mysterious svelte component creator",
		image: "",
		following: false
	}
};
