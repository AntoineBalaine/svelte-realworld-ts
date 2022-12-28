import { test } from "@playwright/test";

test("sign in, modify bio, sign out", async ({ page }) => {
	await page.goto("/");
	// await page.goto("http://127.0.0.1:5173/");
	await page.getByRole("link", { name: "Sign in to see your Feed" }).click();
	await page.getByTestId("SignInNav").click();
	await page.getByTestId("signUp-email").click();
	await page.getByTestId("signUp-email").fill("svelte-playwright@mail.com");
	await page.getByTestId("signUp-email").press("Tab");
	await page.getByTestId("signUp-password").fill("svelte-playwright");
	await page.getByRole("button", { name: "Sign in" }).click();
	await page.goto("/");
	await page.reload();
	// await page.goto("http://127.0.0.1:5173/");
	await page.getByTestId("SettingsNav").click();
	await page.getByPlaceholder("Your Name").click();
	await page.getByPlaceholder("Short bio about you").click();
	await page.getByPlaceholder("Short bio about you").fill("this is a bio");
	await page.getByRole("button", { name: "Update Settings" }).click();
	await page.getByTestId("SignOutNav").click();
	await page.reload();
});
