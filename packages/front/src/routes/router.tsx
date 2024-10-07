import { Navigate, createBrowserRouter } from "react-router-dom";
import { ProgressStepperProvider } from "../context/ProgressBar.tsx";
import AuthGuard from "../hooks/auth-guard.tsx";
import Layout from "../templates/layout.tsx";
import { paths } from "./paths";
import { Onboarding } from "../pages/Onboarding.tsx";
import { SplashScreen } from "../pages/SplashScreen.tsx";
import Crop from "../pages/Crop.tsx";
import Alerts from "../pages/Alerts.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to={paths.onboarding} replace />,
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
	{
		path: "/crops/:cropId",
		element: (
			<AuthGuard>
				<Layout>
					<Crop />
				</Layout>
			</AuthGuard>
		),
	},
]);
