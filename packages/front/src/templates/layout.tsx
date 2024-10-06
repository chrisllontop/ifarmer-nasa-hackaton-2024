import { Box } from "@mui/material";
import type React from "react";
import Navbar from "../components/navbar/Navbar";

interface LayoutProps {
	children: React.ReactNode;
	isWrapper?: boolean;
}

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
					{children}
			</Box>
			<Navbar />
		</Box>
	);
};

export default Layout;
