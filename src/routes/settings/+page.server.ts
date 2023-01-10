import { redirect, type Actions, type ServerLoadEvent } from "@sveltejs/kit";
import type ApiTypes from "$lib/ApiTypes";
import * as api from "$lib/ApiHelpers";
import { ENDPOINTS } from "$lib/ApiEndpoints";
import { dateFromNow } from "$lib/Helpers";

export const load = async ({ locals }: ServerLoadEvent) => {
	if (!locals.user) {
		throw redirect(307, "/");
	}
	return { user: locals.user || null };
};

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		cookies.delete("jwt", { path: "/" });
		locals.user = null;
		throw redirect(303, "/");
	},
	save: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const requestJson: ApiTypes.operations["UpdateCurrentUser"]["requestBody"]["content"]["application/json"] =
			{
				user: {
					email: formData.get("email")?.toString() || "",
					password: formData.get("password")?.toString() || "",
					username: formData.get("username")?.toString() || "",
					bio: formData.get("bio")?.toString() || "",
					image: formData.get("image")?.toString() || ""
				}
			};

		const response = await api.call<
			| ApiTypes.operations["UpdateCurrentUser"]["responses"]["200"]["content"]["application/json"]
			| ApiTypes.operations["UpdateCurrentUser"]["responses"]["401"]
			| ApiTypes.operations["UpdateCurrentUser"]["responses"]["422"]["content"]["application/json"]
		>(api.RestMethods.PUT, `${ENDPOINTS.USER}`, JSON.stringify(requestJson), locals.user?.token);

		if ("errors" in response) {
			return response;
		} else if ("user" in response) {
			const stringUser = JSON.stringify(response.user);
			if (stringUser) {
				cookies.set("jwt", stringUser, { path: "/", expires: dateFromNow() });
			}
			throw redirect(303, "/");
		} else return { errors: response };
	}
};
