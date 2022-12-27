import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { configDefaults, type UserConfig as VitestConfig } from "vitest/config";

/**
 * Adapted from David Peng’s testing recipes for svelte:
 * https://github.com/davipon/svelte-component-test-recipes
 */
const config: UserConfig & { test: VitestConfig["test"] } = {
	plugins: [sveltekit()],
	define: {
		// Eliminate in-source test code
		"import.meta.vitest": "undefined"
	},
	test: {
		include: ["tests/unit/**/*.{test,spec}.{js,ts}"],
		globals: true,
		environment: "jsdom",
		setupFiles: ["tests/setupTests.ts"],
		includeSource: ["src/**/*.{js,ts,svelte}"],
		coverage: {
			exclude: ["tests/setupTests.ts"]
		},
		exclude: [...configDefaults.exclude, "tests/browser"]
	}
};

export default config;
