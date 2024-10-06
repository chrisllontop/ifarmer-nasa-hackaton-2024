import { Box } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar/Navbar";

interface LayoutProps {
	children: React.ReactNode;
}

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
				{children}
			</Box>
			<Navbar />
		</Box>
	);
};

export default Layout;
