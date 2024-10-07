import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardImage } from "../components/cards/CardImage.tsx";
import { paths } from "../routes/paths.ts";

export const SplashScreen = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Box>
				<img
					src="/logo-if.png"
					alt="ifarmer"
					style={{ margin: "24px 0 56px" }}
				/>
			</Box>
			<Box sx={{ width: "350px", margin: "0 auto", flex: 1 }}>
				<Typography
					variant="h6"
					component="h1"
					textAlign="left"
					sx={{ marginBottom: "24px" }}
				>
					Before starting, here are some tips:
				</Typography>
				<CardImage
					description="Remember to introduce precise information to get a better answer"
					image="/plant.svg"
				/>
				<CardImage
					description="The result obtained is tailored to your specific needs using AI"
					image="/vegetables.svg"
				/>
				<CardImage
					description="Track your real time reports  on water management and recommendation"
					image="/schedule.svg"
				/>
			</Box>
			<Button
				variant="contained"
				sx={{ width: "350px", margin: "0 auto 12px" }}
				onClick={() => navigate(paths.onboarding)}
			>
				Let's start
			</Button>
		</Box>
	);
};
