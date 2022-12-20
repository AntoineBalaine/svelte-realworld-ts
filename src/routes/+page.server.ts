import { ENDPOINTS } from "$lib/ApiEndpoints";
import * as api from "$lib/ApiHelpers";
import { PAGE_SIZE } from "$lib/Constants";
import type * as ApiTypes from "../lib/ApiTypes";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ /*locals tb used for logged-in user */ url }) => {
	// const tab = url.searchParams.get("tab") || "all";
	const tag = url.searchParams.get("tag");
	const pageNumber = +(url.searchParams.get("page") ?? "1");

	const searchParams = new URLSearchParams();

	searchParams.set("limit", PAGE_SIZE.toString());
	searchParams.set("offset", ((pageNumber - 1) * PAGE_SIZE).toString());
	if (tag) {
		searchParams.set("tag", tag);
	}
	const {
		articles,
		articlesCount
	}: ApiTypes.components["responses"]["MultipleArticlesResponse"]["content"]["application/json"] =
		await api.call(api.RestMethods.GET, `${ENDPOINTS.ARTICLES}/?${searchParams.toString()}`);

	const newStore = {
		articles,
		pages: Math.ceil(articlesCount || 10 / PAGE_SIZE),
		tags: (async (): Promise<{ tags: Array<string> }> =>
			await api.call(api.RestMethods.GET, ENDPOINTS.TAGS))()
	};
	return newStore;
};
