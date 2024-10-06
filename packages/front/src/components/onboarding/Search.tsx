import { Box, Container } from "@mui/material";
import { useState } from "react";
import { useProgressStepper } from "../../context/ProgressBar.tsx";
import GoogleMapWithDrawing from "../GoogleMapWithDrawing";
import GoogleMapWithSearch from "../GoogleMapWithSearch";

const Settings = () => {
	const [center, setCenter] = useState<google.maps.LatLng | null>(null);

	const { activeStep, setActiveStep } = useProgressStepper();

	const handleLocationChange = (location: google.maps.LatLng) => {
		setCenter(location);
		setActiveStep(2);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<Container
				sx={{
					flex: 1,
					overflowY: "auto",
					padding: 0,
				}}
			>
				{activeStep === 1 ? (
					<GoogleMapWithSearch onLocationChange={handleLocationChange} />
				) : null}
				{activeStep === 2 && center ? (
					<GoogleMapWithDrawing center={center} />
				) : null}
			</Container>
		</Box>
	);
};

export default Settings;
