import { ENDPOINTS } from "$lib/ApiEndpoints";
import * as api from "$lib/ApiHelpers";
import type * as ApiTypes from "$lib/ApiTypes";
import { redirect, type Actions } from "@sveltejs/kit";

export const load = async () => {
	return;
};
export const actions: Actions = {
	createarticle: async ({ request, locals }) => {
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
			api.RestMethods.POST,
			`${ENDPOINTS.ARTICLES}`,
			JSON.stringify(requestJson),
			locals.user?.token
		);

		if ("errors" in response) {
			return response;
		} else if ("article" in response) {
			throw redirect(303, `/${response.article.slug}`);
		} else return { errors: response };
	}
};
