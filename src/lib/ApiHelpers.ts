import * as api from "$lib/ApiHelpers";
import type ApiTypes from "$lib/ApiTypes";
import { error } from "@sveltejs/kit";
import { ENDPOINTS } from "./ApiEndpoints";
export const ApiBaseURL = new URL("https://api.realworld.io/api");
export enum RestMethods {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"
}
type JSONData = string;
type AuthToken = string;

export const call = async <T>(
	method: RestMethods,
	path: string,
	body?: JSONData,
	token?: AuthToken
): Promise<T> => {
	const headers = new Headers([["Content-Type", "application/json"]]);
	if (token) {
		headers.set("Authorization", `Token ${token}`);
	}

	const reqData: RequestInit = {
		...(!(method === RestMethods.GET) ? { body } : {}),
		method,
		headers
	};

	// need to update the path to include the "/api" at the front of the pathname
	// otherwie, "api" gets chopped off the request
	path = `${ApiBaseURL.pathname}/${path}`;

	const fullPath = new URL(path, ApiBaseURL);
	return await fetch(fullPath, reqData)
		.then(async (response) => {
			const text = await response.text();

			return text ? JSON.parse(text) : {};
		})
		.catch((err) => {
			throw error(err);
		});
};

export const getArticle = async (
	slug: string | undefined,
	articlesList: Array<ApiTypes.components["schemas"]["Article"]>
) => {
	let article = articlesList.find((arti) => arti.slug === slug);
	if (article) {
		return article;
	} else {
		const response = await api.call<
			ApiTypes.operations["GetArticle"]["responses"]["200"]["content"]["application/json"]
		>(api.RestMethods.GET, `${ENDPOINTS.ARTICLES}/${slug}`);
		article = response.article;
		return article;
	}
};
