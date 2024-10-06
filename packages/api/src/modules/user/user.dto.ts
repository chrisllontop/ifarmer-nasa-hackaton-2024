import { t } from "elysia";

export const createUserDto = {
	body: t.Object({
		username: t.String(),
		email: t.String(),
		password: t.String(),
	}),
};

export const updateUserDto = {
	body: t.Object({
		email: t.String(),
		password: t.String(),
	}),
};
