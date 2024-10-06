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
