import { ENDPOINTS } from "$lib/ApiEndpoints";
import type { Actions } from "./$types";
import * as api from "$lib/ApiHelpers";
import type ApiTypes from "$lib/ApiTypes";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { dateFromNow } from "$lib/Helpers";

export const load = async ({ parent }: ServerLoadEvent) => {
	//redirect user to front page if already logged-in.
	const parentData = await parent();
	if (parentData["user" as keyof typeof parent]) {
		throw redirect(303, "/");
	}
};
export const actions: Actions = {
	default: async (requestEvent) => {
		const formData = await requestEvent.request.formData();
		const requestJson: ApiTypes.operations["CreateUser"]["requestBody"]["content"]["application/json"] =
			{
				user: {
					password: formData.get("password")?.toString() || "",
					email: formData.get("email")?.toString() || "",
					username: formData.get("username")?.toString() || ""
				}
			};

		const response = await api.call<
			| ApiTypes.operations["CreateUser"]["responses"]["201"]["content"]["application/json"]
			| ApiTypes.operations["CreateUser"]["responses"]["422"]["content"]["application/json"]
		>(api.RestMethods.POST, `${ENDPOINTS.CREATE_USER}`, JSON.stringify(requestJson));
		if ("errors" in response) {
			return response;
		} else {
			requestEvent.cookies.set("jwt", JSON.stringify(response.user), {
				path: "/",
				expires: dateFromNow()
			});

			throw redirect(303, "/");
		}
	}
};
