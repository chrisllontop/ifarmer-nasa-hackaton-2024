import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardImage } from "../components/cards/CardImage.tsx";
import { paths } from "../routes/paths.ts";

export const Onboarding = () => {
	const navigate = useNavigate();
	return (
		<Box>
			<Box sx={{ width: "350px", margin: "0 auto", height: "85vh" }}>
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
				sx={{ width: "350px", margin: "0 auto" }}
				onClick={() => navigate(paths.questions)}
			>
				Let's start
			</Button>
		</Box>
	);
};
