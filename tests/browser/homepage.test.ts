import { expect, test } from "@playwright/test";
import { ApiBaseURL } from "$lib/ApiHelpers";
import { articleSample } from "tests/DataSamples";

test("Home page has navbar contents for non-logged in user", async ({ page }) => {
	await page.goto("/");
	expect(await page.getByTestId("TitleNav").textContent()).toBe("conduit");
	expect(await page.getByTestId("HomeNav").textContent()).toBe("Home");
	expect(await page.getByTestId("SignInNav").textContent()).toBe("Sign in");
	expect(await page.getByTestId("SignUpNav").textContent()).toBe("Sign up");
});

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
