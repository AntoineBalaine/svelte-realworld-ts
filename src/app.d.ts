// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	import type { components } from "./lib/ApiTypes";
	// interface Error {}
	interface Locals {
		user: components["schemas"]["User"];
	}
	interface PageData {
		articles: components["schemas"]["Article"][];
		tags: string[];
		pages: number;
		isLoggedIn: boolean;
	}
	// interface Platform {}
}
