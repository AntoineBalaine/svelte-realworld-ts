import { store } from "$store";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import * as api from "$lib/ApiHelpers";
import type * as ApiTypes from "$lib/ApiTypes";
import { redirect, type Actions, type ServerLoadEvent } from "@sveltejs/kit";
import { getArticle } from "$lib/ApiHelpers";

export const load = async ({ params }: ServerLoadEvent) => {
	const slug = params.slug;
	let articlesList = Array<ApiTypes.components["schemas"]["Article"]>();
	store.subscribe((data) => (articlesList = data.articles));
	return { article: await getArticle(slug, articlesList) };
};

export const actions: Actions = {
	updatearticle: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const requestJson: ApiTypes.operations["CreateArticle"]["requestBody"]["content"]["application/json"] =
			{
				article: {
					title: formData.get("title")?.toString() || "",
					description: formData.get("description")?.toString() || "",
					body: formData.get("body")?.toString() || "",
					tagList: formData.get("tagList")?.toString().split(" ") || [""]
				}
			};

		const response = await api.call<
			| ApiTypes.operations["CreateArticle"]["responses"]["201"]["content"]["application/json"]
			| ApiTypes.operations["CreateArticle"]["responses"]["401"]["content"]
			| ApiTypes.operations["CreateArticle"]["responses"]["422"]["content"]["application/json"]
		>(
			api.RestMethods.PUT,
			`${ENDPOINTS.ARTICLES}/${params.slug}`,
			JSON.stringify(requestJson),
			locals.user?.token
		);

		if ("errors" in response) {
			return response;
		} else if ("article" in response) {
			throw redirect(303, `/article/${response.article.slug}`);
		} else return { errors: response };
	}
};
