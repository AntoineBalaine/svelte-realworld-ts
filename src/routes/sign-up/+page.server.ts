import { ENDPOINTS } from "$lib/ApiEndpoints";
import type { Actions } from "./$types";
import * as api from "$lib/ApiHelpers";
import type ApiTypes from "$lib/ApiTypes";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export const load = async ({ parent }: ServerLoadEvent) => {
	//redirect user to front page if already logged-in.
	const parentData = await parent();
	if (parentData["user" as keyof typeof parent]) {
		throw redirect(307, "/");
	}
};
export const actions: Actions = {
	default: async (requestEvent) => {
		const formData = await requestEvent.request.formData();
		const requestJson = Object.fromEntries(formData.entries());

		const response = await api.call<
			ApiTypes.components["responses"]["UserResponse"]["content"]["application/json"]
		>(api.RestMethods.POST, `${ENDPOINTS.CREATE_USER}`, JSON.stringify(requestJson));

		requestEvent.cookies.set("jwt", JSON.stringify(response.user), { path: "/" });

		throw redirect(307, "/");
	}
};
