// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		user: import("$lib/ApiTypes").components["schemas"]["User"] | null;
	}
	interface PageData {
		articles: import("$lib/ApiTypes").components["schemas"]["Article"][];
		tags: string[];
		pages: number;
		isLoggedIn: boolean;
	}
	// interface Platform {}
}
