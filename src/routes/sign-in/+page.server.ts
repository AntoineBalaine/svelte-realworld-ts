import type { Actions, ServerLoadEvent } from "@sveltejs/kit";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import * as api from "$lib/ApiHelpers";
import type ApiTypes from "$lib/ApiTypes";
import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }: ServerLoadEvent) => {
	const parentData = await parent();
	if (parentData["user" as keyof typeof parentData]) {
		throw redirect(307, "/");
	}
	return;
};

export const actions: Actions = {
	default: async (requestEvent) => {
		const formData = await requestEvent.request.formData();
		const requestJson = Object.fromEntries(formData.entries());

		const response = await api.call<
			ApiTypes.components["responses"]["UserResponse"]["content"]["application/json"]
		>(api.RestMethods.POST, `${ENDPOINTS.LOGIN}`, JSON.stringify(requestJson));

		requestEvent.cookies.set("jwt", JSON.stringify(response.user), { path: "/" });

		throw redirect(307, "/");
	}
};
