import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";

interface LoginFormProps {
	handleLogin: (e: FormEvent<HTMLFormElement>) => void;
	email: string;
	password: string;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
}

export const LoginForm = ({
	handleLogin,
	email,
	setEmail,
	password,
	setPassword,
}: LoginFormProps) => {
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
