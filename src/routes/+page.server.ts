import * as api from "$lib/ApiHelpers";
import type * as ApiTypes from "../ApiTypes";
import type { PageServerLoad } from "./$types";

type Paths = keyof ApiTypes.paths;

const page_size = 10;
export const load: PageServerLoad = async ({ /*locals tb used for logged-in user */ url }) => {
	// const tab = url.searchParams.get("tab") || "all";
	const tag = url.searchParams.get("tag");
	const pageNumber = +(url.searchParams.get("page") ?? "1");

	const endPoint: Paths = "/articles";
	//const endPoint: Paths = tab === "/articles" ? "/articles" : "/articles/feed";

	const searchParams = new URLSearchParams();

	searchParams.set("limit", page_size.toString());
	searchParams.set("offset", ((pageNumber - 1) * page_size).toString());
	if (tag) {
		searchParams.set("tag", tag);
	}
	const {
		articles,
		articlesCount
	}: ApiTypes.components["responses"]["MultipleArticlesResponse"]["content"]["application/json"] =
		await api.call(api.RestMethods.GET, `${endPoint}/?${searchParams.toString()}`);

	return {
		articles,
		pages: Math.ceil(articlesCount || 10 / page_size),
		tags: (async (): Promise<{ tags: Array<string> }> =>
			await api.call(api.RestMethods.GET, "tags"))()
	};
};
