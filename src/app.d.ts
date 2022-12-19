import type * as ApiTypes from "./ApiTypes";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	interface PageData {
		articles: ApiTypes.components["schemas"]["Article"][];
	}
	// interface Platform {}
}
