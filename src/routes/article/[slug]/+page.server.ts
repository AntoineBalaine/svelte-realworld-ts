import { store } from "$store";
import { redirect, type ActionResult, type Actions, type ServerLoadEvent } from "@sveltejs/kit";
import { getArticle } from "$lib/ApiHelpers";
import * as api from "$lib/ApiHelpers";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import type ApiTypes from "$lib/ApiTypes";

export const load = async ({ params, locals }: ServerLoadEvent) => {
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	return {
		articleData: await getArticle(slug, articlesList),
		comments: await api
			.call<
				| ApiTypes.operations["GetArticleComments"]["responses"]["200"]["content"]["application/json"]
				| ApiTypes.operations["GetArticleComments"]["responses"]["422"]["content"]["application/json"]
				| ApiTypes.operations["GetArticleComments"]["responses"]["401"]["content"]
			>(
				api.RestMethods.GET,
				ENDPOINTS.COMMENTS.replace(/{slug}/, slug || ""),
				"{}",
				locals.user?.token
			)
			.then((response) => {
				if ("comments" in response) {
					return response.comments;
				} else return [];
			})
	};
};

export const actions: Actions = {
	toggleFavorite: async ({ locals, params, url }): Promise<ActionResult> => {
		const articles: ApiTypes.operations["CreateArticleFavorite"]["parameters"]["path"]["slug"] =
			params.slug || "";
		const favorited = url.searchParams.get("favorited") === "true";

		const response = await api.call<
			| ApiTypes.operations["CreateArticleFavorite"]["responses"]["200"]["content"]["application/json"]
			| ApiTypes.operations["CreateArticleFavorite"]["responses"]["422"]["content"]["application/json"]
			| ApiTypes.operations["CreateArticleFavorite"]["responses"]["401"]["content"]
		>(
			favorited ? api.RestMethods.DELETE : api.RestMethods.POST,
			ENDPOINTS.ARTICLES_FAVORITE.replace(/{slug}/, articles || ""),
			"{}",
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
	},
	deleteArticle: async ({ locals, params }): Promise<ActionResult> => {
		const response = await api.call<
			| ApiTypes.operations["DeleteArticle"]["responses"]["200"]["content"]
			| ApiTypes.operations["DeleteArticle"]["responses"]["401"]["content"]
			| ApiTypes.operations["DeleteArticle"]["responses"]["422"]["content"]["application/json"]
		>(api.RestMethods.DELETE, `${ENDPOINTS.ARTICLES}/${params.slug}`, "{}", locals.user?.token);

		if ("errors" in response) {
			return {
				type: "failure",
				status: 422
			};
		} else throw redirect(307, "/");
	},
	addComment: async ({ params }): Promise<ActionResult> => {
		const response = await api.call<
			ApiTypes.operations["CreateArticleComment"]["responses"]["200"]["content"]["application/json"]
		>(api.RestMethods.POST, ENDPOINTS.COMMENTS.replace(/{slug}/, params.slug || ""));
		if ("comment" in response) {
			return {
				type: "success",
				status: 200
			};
		} else {
			return {
				type: "failure",
				status: 422
			};
		}
	}
};
