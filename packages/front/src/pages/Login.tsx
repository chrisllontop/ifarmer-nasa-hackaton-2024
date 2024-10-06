import {
	Box,
	Button,
	CircularProgress,
	Link,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useLogin } from "../hooks/use-auth.ts";

const Login = () => {
	const [email, setEmail] = useState<string>("nasa@nasa.com");
	const [password, setPassword] = useState<string>("1234");
	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

	const login = useLogin();
	const { mutate, error, isPending } = login;

	useEffect(() => {
		if (error?.message) {
			setOpenSnackbar(true);
		}
	}, [error]);

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
			<Button
				variant="contained"
				type="submit"
				sx={{ mt: "24px" }}
				disabled={isPending}
			>
				{isPending ? (
					<span style={{ display: "flex", alignItems: "center" }}>
						<CircularProgress size={18} sx={{ color: "white", mr: 2 }} />
						Loading
					</span>
				) : (
					"Login"
				)}
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
			<Snackbar
				message={error?.message}
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={() => setOpenSnackbar(false)}
			/>
		</Box>
	);
};

export default Login;
