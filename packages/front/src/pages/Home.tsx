import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CropsList } from "../components/crops/CropsList.tsx";
import { paths } from "../routes/paths.ts";

const Home = () => {
	const navigate = useNavigate();
	return (
		<Box sx={{ width: "350px", margin: "48px auto 0" }}>
			<Typography
				variant="h5"
				component="h1"
				textAlign="left"
				sx={{ marginBottom: "48px" }}
			>
				Saved crops
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
				<Button
					variant="outlined"
					startIcon={<AddIcon />}
					fullWidth
					onClick={() => navigate(paths.onboarding)}
				>
					New crop
				</Button>
				<CropsList />
			</Box>
		</Box>
	);
};

export default Home;
