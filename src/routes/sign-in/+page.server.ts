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

		const requestJson: ApiTypes.components["requestBodies"]["NewUserRequest"]["content"]["application/json"] =
			{
				user: {
					password: formData.get("password")?.toString() || "",
					email: formData.get("email")?.toString() || "",
					username: formData.get("username")?.toString() || ""
				}
			};

		const response = await api.call<
			ApiTypes.components["responses"]["UserResponse"]["content"]["application/json"]
		>(api.RestMethods.POST, `${ENDPOINTS.LOGIN}`, JSON.stringify(requestJson));

		const stringUser = JSON.stringify(response.user);
		if (stringUser) {
			requestEvent.cookies.set("jwt", stringUser, { path: "/" });
		}

		throw redirect(307, "/");
	}
};
