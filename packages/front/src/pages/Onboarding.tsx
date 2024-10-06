import { Box, Button, Typography } from "@mui/material";
import { CardImage } from "../components/cardImage/CardImage.tsx";

export const Onboarding = () => {
	return (
		<Box>
			<Box sx={{ maxWidth: "95%", margin: "0 auto", height: "85vh" }}>
				<Typography
					variant="h5"
					component="h1"
					textAlign="left"
					sx={{ marginBottom: "48px" }}
				>
					First of all
				</Typography>
				<CardImage description="Remember to introduce precise information to get a better answer" />
				<CardImage description="The result obtained is tailored to your specific needs using AI" />
				<CardImage description="Track your real time reports  on water management and recommendation" />
			</Box>
			<Button
				variant="contained"
				sx={{ maxWidth: "95%", margin: "0 auto", width: "100%" }}
			>
				Let's start
			</Button>
		</Box>
	);
};
