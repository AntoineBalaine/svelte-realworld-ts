import { expect, test } from "@playwright/test";
import type * as ApiTypes from "$lib/ApiTypes";
import { ApiBaseURL } from "$lib/ApiHelpers";

test("Home page has navbar contents for non-logged in user", async ({ page }) => {
	await page.goto("/");
	expect(await page.getByTestId("TitleNav").textContent()).toBe("conduit");
	expect(await page.getByTestId("HomeNav").textContent()).toBe("Home");
	expect(await page.getByTestId("SignInNav").textContent()).toBe("Sign in");
	expect(await page.getByTestId("SignUpNav").textContent()).toBe("Sign up");
});
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

test("Articles Preview", async ({ page }) => {
	await page.goto("/");
	// author link
	// date
	// article title
	// number of likes
	// tags list
	// read more link
	await page.route(ApiBaseURL.toString(), async (route) => {
		await route.fulfill({ body: JSON.stringify({ articles: [articleSample], articlesCount: 1 }) });
	});
});
