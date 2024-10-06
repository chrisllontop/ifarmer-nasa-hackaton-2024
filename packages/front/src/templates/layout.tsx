import { Box } from "@mui/material";
import { type Libraries, LoadScript } from "@react-google-maps/api";
import type React from "react";
import Navbar from "../components/navbar/Navbar";

interface LayoutProps {
	children: React.ReactNode;
	isWrapper?: boolean;
}

const libraries: Libraries = ["places", "geometry", "drawing"];

const Layout: React.FC<LayoutProps> = ({ children, isWrapper = false }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: isWrapper ? "94vh" : "100vh",
				width: "100vw",
			}}
		>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<LoadScript
					googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
					libraries={libraries}
				>
					{children}
				</LoadScript>
			</Box>
			<Navbar />
		</Box>
	);
};

export default Layout;
