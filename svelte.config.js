import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			"$store": path.resolve("src/Store.ts"),
			"$ApiTypes": path.resolve("src/ApiTypes.d.ts"),
			"$Components": path.resolve("src/components")
		}
	}
};

export default config;
