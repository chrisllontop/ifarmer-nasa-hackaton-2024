import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "../routes/paths.ts";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const hasAccessToken = searchParams.has("access_token");
	if (hasAccessToken) {
		const accessToken = searchParams.get("access_token");
		const decodedAccessToken = accessToken?.replaceAll(" ", "+");
		localStorage.setItem("auth", JSON.stringify(decodedAccessToken));

		const allSearchParams = {};
		for (const [key, value] of searchParams) {
			if (key !== "access_token") allSearchParams[key] = value;
		}

		setSearchParams(allSearchParams);
	}

	const authenticated = localStorage.getItem("auth");
	const [checked, setChecked] = useState(false);

	const check = useCallback(() => {
		if (!authenticated || authenticated === "undefined") {
			navigate(paths.login);
		} else {
			setChecked(true);
		}
	}, [authenticated, navigate]);

	useEffect(() => {
		check();
	}, []);

	if (!checked) {
		return null;
	}
	return <>{children}</>;
}

AuthGuard.propTypes = {
	children: PropTypes.node,
};
