import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths.ts";
import { useGetUser } from "./use-auth.ts";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const { data: user, isPending, error } = useGetUser();
	const [checked, setChecked] = useState(false);
	const authenticated = localStorage.getItem("access_token");

	const check = useCallback(() => {
		if (!authenticated || authenticated === "undefined") {
			navigate(paths.login);
		} else {
			setChecked(true);
		}
	}, [authenticated, navigate]);

	useEffect(() => {
		if (!authenticated || authenticated === "undefined") {
			localStorage.removeItem("access_token");
			navigate(paths.login);
		} else if (!isPending && (error || !user)) {
			localStorage.removeItem("access_token");
			navigate(paths.login);
		} else if (!isPending && user) {
			check();
		}
	}, [authenticated, isPending, user, error, check, navigate]);

	if (!checked || isPending) {
		return null;
	}

	return <>{children}</>;
}
