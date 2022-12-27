import { render } from "@testing-library/svelte";
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
		const articlePreview = render(ArticlePreview, {
			article: articleSample
		});

		expect(articlePreview.getByTestId("author-username").innerHTML).toEqual(
			articleSample.author.username
		);
		expect(articlePreview.getByTestId("article-title").innerHTML).toEqual(articleSample.title);
		expect(articlePreview.getByTestId("article-description").innerHTML).toEqual(
			articleSample.description
		);
		articlePreview
			.getAllByRole("listitem")
			.forEach((element, index) =>
				expect(element.getElementsByTagName("a")[0].innerHTML).toEqual(articleSample.tagList[index])
			);

		/**
		 * At each render, the test-runner will create a new date,
		 * which will be different from the date displayed on the page.
		 * To avoid this, it’s necessary to swap out the page’s date.
		 */
		articlePreview.getByTestId("author-updatedAt").innerHTML = "place-holder date";

		expect(articlePreview.container).toMatchSnapshot();
	});
});
