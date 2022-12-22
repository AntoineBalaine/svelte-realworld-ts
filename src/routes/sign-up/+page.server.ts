import { ENDPOINTS } from "$lib/ApiEndpoints";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import * as api from "$lib/ApiHelpers";
import type ApiTypes from "$lib/ApiTypes";

export const load: PageServerLoad = async (data) => {
	//redirect user to front page if already logged-in.
	return {};
};
export const actions: Actions = {
	default: async (req) => {
		const formData = await req.request.formData();
		const requestJson = Object.fromEntries(formData.entries());

		return await api.call<
			ApiTypes.components["responses"]["UserResponse"]["content"]["application/json"]
		>(api.RestMethods.POST, `${ENDPOINTS.CREATE_USER}`, JSON.stringify(requestJson));
	}
};
