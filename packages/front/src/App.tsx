import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { type Libraries, LoadScript } from "@react-google-maps/api";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const theme = createTheme({
	palette: {
		mode: "light",
	},
});

const queryClient = new QueryClient();
const libraries: Libraries = ["places", "geometry", "drawing"];

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LoadScript
					googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
					libraries={libraries}
				>
				<RouterProvider router={router} />
				</LoadScript>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
