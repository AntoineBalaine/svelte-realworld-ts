import type { PageServerLoad } from "./$types";
import { store } from "$store";
import type ApiTypes from "$ApiTypes";
import * as api from "$lib/ApiHelpers";
type Paths = keyof ApiTypes.paths;

export const load: PageServerLoad = async ({ params }) => {
	console.log("called");
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	let article = articlesList.find((arti) => arti.slug === slug);
	if (article) {
		return article;
	} else {
		const endPoint: Paths = "/articles";
		article = await api.call(api.RestMethods.GET, `${endPoint}/${slug}`);
		return { article };
	}
};
