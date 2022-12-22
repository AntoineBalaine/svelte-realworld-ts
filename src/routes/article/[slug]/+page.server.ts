import { store } from "$store";
import type ApiTypes from "$lib/ApiTypes";
import * as api from "$lib/ApiHelpers";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import type { ServerLoadEvent } from "@sveltejs/kit";

export const load = async ({ params }: ServerLoadEvent) => {
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	let article = articlesList.find((arti) => arti.slug === slug);
	if (article) {
		return article;
	} else {
		article = await api.call<ApiTypes.components["schemas"]["Article"]>(
			api.RestMethods.GET,
			`${ENDPOINTS.ARTICLES}/${slug}`
		);
		return { article };
	}
};
