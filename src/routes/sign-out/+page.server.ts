import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export const load = async ({ locals, cookies }: ServerLoadEvent) => {
	cookies.delete("jwt", { path: "/" });
	locals.user = null;
	throw redirect(303, "/");
};
