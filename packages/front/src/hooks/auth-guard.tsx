import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths.ts";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();

	const authenticated = localStorage.getItem("access_token");
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
