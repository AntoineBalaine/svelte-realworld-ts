import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get("jwt");
	event.locals.user = jwt ? JSON.parse(jwt) : null;

	const response = await resolve(event);
	return response;
};
