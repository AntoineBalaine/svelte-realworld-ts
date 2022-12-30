import { store } from "$store";
import type { ActionResult, Actions, ServerLoadEvent } from "@sveltejs/kit";
import { getArticle } from "$lib/ApiHelpers";
import * as api from "$lib/ApiHelpers";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import type ApiTypes from "$lib/ApiTypes";

export const load = async ({ params }: ServerLoadEvent) => {
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	return await getArticle(slug, articlesList);
};

export const actions: Actions = {
	toggleFavorite: async ({ locals, params, request }): Promise<ActionResult> => {
		const articles: ApiTypes.operations["CreateArticleFavorite"]["parameters"]["path"]["slug"] =
			params.slug || "";
		const requestForm = await request.formData();

		const response = await api.call<
			| ApiTypes.operations["CreateArticleFavorite"]["responses"]["200"]["content"]["application/json"]
			| ApiTypes.operations["CreateArticleFavorite"]["responses"]["422"]["content"]["application/json"]
			| ApiTypes.operations["CreateArticleFavorite"]["responses"]["401"]["content"]
		>(
			requestForm.get("favorited") ? api.RestMethods.DELETE : api.RestMethods.POST,
			ENDPOINTS.ARTICLES_FAVORITE.replace(/{slug}/, articles || ""),
			"",
			locals.user?.token
		);
		if ("errors" in response) {
			return {
				type: "failure",
				status: 422
			};
		} else if ("Profile" in response) {
			return {
				type: "success",
				status: 200
			};
		} else
			return {
				type: "failure",
				status: 401
			};
	}
};
