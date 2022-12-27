import type * as stores from "$app/stores";
import type * as environment from "$app/environment";
import type * as navigation from "$app/navigation";
import matchers from "@testing-library/jest-dom/matchers";
import type { Navigation, Page } from "@sveltejs/kit";
import { readable } from "svelte/store";
import { vi } from "vitest";
import { articleSample } from "./DataSamples";
// Add custom jest matchers
expect.extend(matchers);

// Mock SvelteKit runtime module $app/environment
vi.mock("$app/environment", (): typeof environment => ({
	browser: false,
	dev: true,
	building: false,
	version: "any"
}));

// Mock SvelteKit runtime module $app/navigation
vi.mock("$app/navigation", (): typeof navigation => ({
	afterNavigate: () => {
		return;
	},
	beforeNavigate: () => {
		return;
	},
	disableScrollHandling: () => {
		return;
	},
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () => Promise.resolve(),
	preloadCode: () => Promise.resolve()
}));
// setupTest.js for Vitest
vi.mock("$app/stores", (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL("http://localhost"),

			params: {},
			route: {
				id: null
			},
			status: 200,
			error: null,
			data: {
				articles: [articleSample],
				tags: [],
				pages: 1,
				isLoggedIn: false
			},
			form: undefined
		});
		const updated = { subscribe: readable(false).subscribe, check: () => false };

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: () => false
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});
