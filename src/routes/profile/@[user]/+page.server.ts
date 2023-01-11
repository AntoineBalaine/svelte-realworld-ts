import * as api from "$lib/ApiHelpers";
import { PAGE_SIZE } from "$lib/Constants";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import type ApiTypes from "$lib/ApiTypes";
import type { ActionResult, Actions, ServerLoadEvent } from "@sveltejs/kit";

export const load = async ({ params, url, locals }: ServerLoadEvent) => {
	const pageNumber = Number(url.searchParams.get("page") ?? "1");

	const searchParams = new URLSearchParams();
	searchParams.set("author", params.user || "");
	searchParams.set("limit", PAGE_SIZE.toString());
	searchParams.set("offset", ((pageNumber - 1) * PAGE_SIZE).toString());

	return {
		articles: await api.call<
			ApiTypes.components["responses"]["MultipleArticlesResponse"]["content"]["application/json"]
		>(
			api.RestMethods.GET,
			`${ENDPOINTS.ARTICLES}/?${searchParams.toString()}`,
			JSON.stringify({}),
			locals.user?.token
		),
		author: await api.call<
			ApiTypes.components["responses"]["ProfileResponse"]["content"]["application/json"]
		>(api.RestMethods.GET, ENDPOINTS.PROFILE.replace(/{username}/, params.user || ""))
	};
};

export const actions: Actions = {
	togglefollow: async ({ locals, params, url }): Promise<ActionResult> => {
		const userToFollow: ApiTypes.operations["FollowUserByUsername"]["parameters"]["path"]["username"] =
			params.user || "";
		const following = url.searchParams.get("following") === "true";

		const response = await api.call<
			| ApiTypes.operations["FollowUserByUsername"]["responses"]["200"]["content"]["application/json"]
			| ApiTypes.operations["FollowUserByUsername"]["responses"]["422"]["content"]["application/json"]
			| ApiTypes.operations["FollowUserByUsername"]["responses"]["401"]["content"]
		>(
			following ? api.RestMethods.DELETE : api.RestMethods.POST,
			ENDPOINTS.FOLLOW.replace(/{username}/, userToFollow || ""),
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
	}
};
