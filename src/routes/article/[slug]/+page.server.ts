import { store } from "$store";
import type ApiTypes from "$lib/ApiTypes";
import type { ServerLoadEvent } from "@sveltejs/kit";
import { getArticle } from "$lib/ApiHelpers";

export const load = async ({ params }: ServerLoadEvent) => {
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	return await getArticle(slug, articlesList);
};
