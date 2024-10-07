import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login, user } from "../modules/auth.ts";
import { paths } from "../routes/paths.ts";

export const useLogin = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			if (data?.token) {
				localStorage.setItem("access_token", data.token);
				navigate(paths.onboarding);
			}
		},
	});
};

export const useGetUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => user(),
	});
};
