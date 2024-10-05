import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState, FormEvent } from "react";
import { useLogin } from "../hooks/use-auth.ts";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("test@gmail.com");
	const [password, setPassword] = useState<string>("password");

	const login = useLogin();
	const { mutate, error: loginError, isPending } = login;

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate({ email, password });
	};

	return (
		<Box
			component="form"
			noValidate
			onSubmit={handleLogin}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				width: "300px",
				margin: "auto",
				mt: 4,
			}}
		>
			<Box>
				<Typography
					variant="h5"
					component="h1"
					textAlign="left"
					gutterBottom={false}
				>
					Log in
				</Typography>
				<Typography
					variant="subtitle1"
					component="p"
					textAlign="left"
					sx={{ mb: "12px", fontSize: "14px" }}
				>
					Get started for free
				</Typography>
			</Box>

			<TextField
				id="email"
				label="Email"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				id="password"
				type="password"
				label="Password"
				variant="outlined"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button variant="contained" type="submit" sx={{ mt: "24px" }}>
				Login
			</Button>

			<Box
				sx={{
					display: "flex",
					marginTop: "12px",
					gap: "8px",
				}}
			>
				<Link href="#" variant="body2">
					Create account
				</Link>{" "}
				<Link href="#" variant="body2">
					Forgot password?
				</Link>
			</Box>
		</Box>
	);
};

export default Login;
