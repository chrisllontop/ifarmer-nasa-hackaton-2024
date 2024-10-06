import client from "../utils/api.ts";

interface LoginBody {
	email: string;
	password: string;
}

export const login = async (data: LoginBody) => {
	return await client.api.auth.login.post(data);
};
//
// export const user = async () => {
// 	return await client.get("/auth/user");
// };
