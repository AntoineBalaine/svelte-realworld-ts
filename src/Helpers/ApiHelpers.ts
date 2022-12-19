import { error } from '@sveltejs/kit';
export const ApiBaseURL = 'https://api.realworld.io/api';
enum RestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'
}
type JSONData = string;
type AuthToken = string;
type ResHandler = (handleResponse: () => void, handleFailure: () => void) => void;

type RestCall = (method: RestMethods, path: URL, data: JSONData, token: AuthToken) => void;

const call: RestCall = async (method, path, body, token) => {
	const reqData: RequestInit = {
		body,
		method,
		headers: new Headers([
			['Content-Type', 'application/json'],
			['Authorization', token]
		])
	};
	const fullPath = new URL(path, ApiBaseURL);
	const response = await fetch(fullPath, reqData);
	try {
		if (response.ok || response.status === 422) {
			const text = await response.text();
			return text ? JSON.parse(text) : {};
		}
	} catch {
		throw error(response.status);
	}
};
