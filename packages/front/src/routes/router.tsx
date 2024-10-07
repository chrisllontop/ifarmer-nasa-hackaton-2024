import { Navigate, createBrowserRouter } from "react-router-dom";
import { ProgressStepperProvider } from "../context/ProgressBar.tsx";
import AuthGuard from "../hooks/auth-guard.tsx";
import Alerts from "../pages/Alerts.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import { Onboarding } from "../pages/Onboarding.tsx";
import { SplashScreen } from "../pages/SplashScreen.tsx";
import Layout from "../templates/layout.tsx";
import { paths } from "./paths";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to={paths.initialStep} replace />,
	},
	{
		path: paths.login,
		element: <Login />,
	},
	{
		path: paths.initialStep,
		element: (
			<AuthGuard>
				<SplashScreen />
			</AuthGuard>
		),
	},
	{
		path: paths.onboarding,
		element: (
			<AuthGuard>
				<ProgressStepperProvider>
					<Onboarding />
				</ProgressStepperProvider>
			</AuthGuard>
		),
	},
	{
		path: paths.crops,
		element: (
			<AuthGuard>
				<Layout>
					<Home />
				</Layout>
			</AuthGuard>
		),
	},
	{
		path: paths.alerts,
		element: (
			<AuthGuard>
				<Layout>
					<Alerts />
				</Layout>
			</AuthGuard>
		),
	},
]);
