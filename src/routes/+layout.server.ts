import type { ServerLoadEvent } from "@sveltejs/kit";

export const load = async ({ locals }: ServerLoadEvent) => {
	return { user: locals.user || null };
};
