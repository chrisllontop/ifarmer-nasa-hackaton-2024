import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../modules/auth.ts";
import { paths } from "../routes/paths.ts";

export const useLogin = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			if (data?.token) {
				localStorage.setItem("access_token", JSON.stringify(data.token));
				navigate(paths.onboarding);
			}
		},
	});
};
