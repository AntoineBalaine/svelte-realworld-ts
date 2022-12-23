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

		const requestJson: ApiTypes.operations["Login"]["requestBody"]["content"]["application/json"] =
			{
				user: {
					password: formData.get("password")?.toString() || "",
					email: formData.get("email")?.toString() || ""
				}
			};

		const response = await api.call<
			| ApiTypes.operations["CreateUser"]["responses"]["201"]["content"]["application/json"]
			| ApiTypes.operations["CreateUser"]["responses"]["422"]["content"]["application/json"]
		>(api.RestMethods.POST, `${ENDPOINTS.LOGIN}`, JSON.stringify(requestJson));

		if ("errors" in response) {
			return response;
		} else {
			const stringUser = JSON.stringify(response.user);
			if (stringUser) {
				requestEvent.cookies.set("jwt", stringUser, { path: "/" });
			}

			throw redirect(307, "/");
		}
	}
};
