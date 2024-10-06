import { Navigate, createBrowserRouter } from "react-router-dom";
import { ProgressStepperProvider } from "../context/ProgressBar.tsx";
import AuthGuard from "../hooks/auth-guard.tsx";
import Alerts from "../pages/Alerts.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import { Onboarding } from "../pages/Onboarding.tsx";
import { OnboardingQuestions } from "../pages/OnboardingQuestions.tsx";
import Search from "../pages/Search.tsx";
import Layout from "../templates/layout.tsx";
import { paths } from "./paths";

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
		path: paths.onboarding,
		element: (
			<AuthGuard>
				<Onboarding />
			</AuthGuard>
		),
	},
	{
		path: paths.questions,
		element: (
			<AuthGuard>
				<ProgressStepperProvider>
					<OnboardingQuestions />
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
		path: paths.search,
		element: (
			<AuthGuard>
				<Layout>
					<ProgressStepperProvider>
						<Search />
					</ProgressStepperProvider>
				</Layout>
			</AuthGuard>
		),
	},
]);
