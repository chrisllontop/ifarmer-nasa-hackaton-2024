import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/login/LoginForm.tsx";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("test@gmail.com");
	const [password, setPassword] = useState<string>("password");
	const navigate = useNavigate();

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email === "test@gmail.com" && password === "password") {
			navigate("/crops");
		} else {
			alert("Credenciales incorrectas");
		}
	};

	return (
		<LoginForm
			handleLogin={handleLogin}
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
		/>
	);
};

export default Login;
