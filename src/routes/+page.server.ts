import { ENDPOINTS } from "$lib/ApiEndpoints";
import * as api from "$lib/ApiHelpers";
import { PAGE_SIZE } from "$lib/Constants";
import { redirect, type Actions, type ServerLoadEvent } from "@sveltejs/kit";
import type * as ApiTypes from "$lib/ApiTypes";

export const load = async ({ locals, url }: ServerLoadEvent) => {
	const tag = url.searchParams.get("tag");
	const pageNumber = +(url.searchParams.get("page") ?? "1");
	const tab = url.searchParams.get("tab") || "all";

	const searchParams = new URLSearchParams();

	searchParams.set("limit", PAGE_SIZE.toString());
	searchParams.set("offset", ((pageNumber - 1) * PAGE_SIZE).toString());
	if (tag) {
		searchParams.set("tag", tag);
	}

	// Consumer
	const { articles, articlesCount } = await api.call<
		ApiTypes.components["responses"]["MultipleArticlesResponse"]["content"]["application/json"]
	>(
		api.RestMethods.GET,
		tab === "feed" ? ENDPOINTS.FEED : ENDPOINTS.ARTICLES,
		"{}",
		locals.user?.token
	);
	return {
		articles,
		pages: Math.ceil(articlesCount || 10 / PAGE_SIZE),
		tags: (async (): Promise<{ tags: Array<string> }> =>
			await api.call(api.RestMethods.GET, ENDPOINTS.TAGS, "{}", locals.user?.token))(),
		isLoggedIn: false,
		pageNumber,
		user: locals.user
	};
};
export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		cookies.delete("jwt", { path: "/" });
		locals.user = null;
		throw redirect(303, "/");
	}
};
