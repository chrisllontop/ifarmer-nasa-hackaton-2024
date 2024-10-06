import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Alerts from "./components/pages/Alerts";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Layout from "./components/templates/layout";
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import Login from "./pages/Login";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Onboarding } from "./pages/Onboarding.tsx";

const theme = createTheme({
	palette: {
		mode: "light",
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/crops"
						element={
							<ProtectedRoute isAuthenticated>
								<Layout>
									<Home />
								</Layout>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/alerts"
						element={
							<ProtectedRoute isAuthenticated>
								<Layout>
									<Alerts />
								</Layout>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/search"
						element={
							<ProtectedRoute isAuthenticated>
								<Layout>
									<Search />
								</Layout>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/onboarding"
						element={
							<ProtectedRoute isAuthenticated>
								<Onboarding />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
