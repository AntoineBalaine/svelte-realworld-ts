import type { PageServerLoad } from "./$types";
import { store } from "$store";
import type ApiTypes from "$lib/ApiTypes";
import * as api from "$lib/ApiHelpers";
import { ENDPOINTS } from "$lib/ApiEndpoints";

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	let article = articlesList.find((arti) => arti.slug === slug);
	if (article) {
		return article;
	} else {
		article = await api.call(api.RestMethods.GET, `${ENDPOINTS.ARTICLES}/${slug}`);
		return { article };
	}
};
