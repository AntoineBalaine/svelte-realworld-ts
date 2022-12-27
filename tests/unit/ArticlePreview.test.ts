import { render, screen } from "@testing-library/svelte";
import { describe, test, expect } from "vitest";
import ArticlePreview from "src/components/ArticlePreview.svelte";

import type * as ApiTypes from "$lib/ApiTypes";

const articleSample: ApiTypes.components["schemas"]["Article"] = {
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

describe("VerticalTabs Component", () => {
	test("should render the component", () => {
		render(ArticlePreview, {
			article: articleSample
		});
		expect(screen.getByTestId("AuthorUsernamePreview")).toBeTruthy();
	});
});
