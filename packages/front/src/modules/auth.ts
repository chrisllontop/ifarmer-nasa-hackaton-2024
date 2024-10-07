import { paths } from "../routes/paths.ts";
import client from "../utils/api.ts";

interface LoginBody {
	email: string;
	password: string;
}

export const login = async (body: LoginBody) => {
	const { data, error } = await client.api.auth.login.post(body);
	if (data) return data;
	throw error.value;
};

export const user = async () => {
	const authToken = localStorage.getItem("access_token");

	const { data, error } = await client.api.user.get({
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (data) return data;
	if (error.value) {
		localStorage.removeItem("access_token");
		window.location.href = paths.login;
		throw error.value;
	}
};
