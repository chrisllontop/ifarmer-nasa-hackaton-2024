import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";
import { LoadScript } from "@react-google-maps/api";

interface LayoutProps {
	children: React.ReactNode;
}

const libraries = ['places', 'geometry'];

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				width: "100vw",
			}}
		>
			<Box component="main" sx={{ flexGrow: 1 }}>
			<LoadScript googleMapsApiKey="AIzaSyDH6v6GHzcqbNwXN_rRTHww1uctpw6OM0Q" libraries={libraries}>
				{children}
			</LoadScript>
			</Box>
			<Navbar />
		</Box>
	);
};

export default Layout;
