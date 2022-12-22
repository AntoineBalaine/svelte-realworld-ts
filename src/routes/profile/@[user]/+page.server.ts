import * as api from "$lib/ApiHelpers";
import type { PageServerLoad } from "./$types";
import { PAGE_SIZE } from "$lib/Constants";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import type ApiTypes from "$lib/ApiTypes";

export const load: PageServerLoad = async ({ params, url }) => {
	const pageNumber = Number(url.searchParams.get("page") ?? "1");

	const searchParams = new URLSearchParams();
	searchParams.set("author", params.user);
	searchParams.set("limit", PAGE_SIZE.toString());
	searchParams.set("offset", ((pageNumber - 1) * PAGE_SIZE).toString());

	return {
		articles: (async () =>
			await api.call<
				ApiTypes.components["responses"]["MultipleArticlesResponse"]["content"]["application/json"]
			>(api.RestMethods.GET, `${ENDPOINTS.ARTICLES}/?${searchParams.toString()}`))(),
		author: (async () =>
			await api.call<
				ApiTypes.components["responses"]["ProfileResponse"]["content"]["application/json"]
			>(api.RestMethods.GET, ENDPOINTS.PROFILE.replace(/{username}/, params.user)))()
	};
};
