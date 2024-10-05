import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthGuard from "../hooks/auth-guard.tsx";
import Alerts from "../pages/Alerts.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Search from "../pages/Search.tsx";
import Layout from "../templates/layout.tsx";
import { paths } from "./paths";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to={paths.crops} replace />,
	},
	{
		path: paths.login,
		element: <Login />,
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
					<Search />
				</Layout>
			</AuthGuard>
		),
	},
]);
