import { t } from "elysia";

export const loginDto = {
	body: t.Object({
		email: t.String(),
		password: t.String(),
	}),
};
