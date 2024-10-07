import React, { useState } from "react";
import {
	Typography,
	Container,
	Button,
	Box,
	Card,
	CardContent,
	CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import image from "../assets/mask-group.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import cloudySnowing from "../assets/cloud-icons/cloudy-snowing.svg";
import rainy from "../assets/cloud-icons/Rainy.svg";

const Crop: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState("today");

	function createData(
		time: string,
		temperature: string,
		waterUsage: string,
		bestTime: boolean,
	) {
		return { bestTime, time, temperature, waterUsage };
	}

	const irrigationDays = {
		today: {
			id: "today",
			label: "TODAY",
			days: [
				createData("8 am", "7°", "900L", false),
				createData("12 pm", "11°", "1,017L", false),
				createData("15 pm", "13°", "1,028L", true),
				createData("18 pm", "10°", "900L", false),
				createData("20 pm", "7°", "1,030L", false),
			],
		},
		"2nov": {
			id: "2nov",
			label: "2 NOV",
			days: [
				createData("8 am", "7°", "900L", false),
				createData("12 pm", "11°", "1,017L", true),
				createData("15 pm", "13°", "1,028L", false),
				createData("18 pm", "10°", "900L", false),
				createData("20 pm", "7°", "1,030L", false),
			],
		},
		"5nov": {
			id: "5nov",
			label: "5 NOV",
			days: [
				createData("8 am", "7°", "900L", false),
				createData("12 pm", "11°", "1,017L", false),
				createData("15 pm", "13°", "1,028L", false),
				createData("18 pm", "10°", "900L", true),
				createData("20 pm", "7°", "1,030L", false),
			],
		},
		"10nov": {
			id: "10nov",
			label: "10 NOV",
			days: [
				createData("8 am", "7°", "900L", false),
				createData("12 pm", "11°", "1,017L", false),
				createData("15 pm", "13°", "1,028L", false),
				createData("18 pm", "10°", "900L", false),
				createData("20 pm", "7°", "1,030L", true),
			],
		},
		"15nov": {
			id: "15nov",
			label: "15 NOV",
			days: [
				createData("8 am", "7°", "900L", true),
				createData("12 pm", "11°", "1,017L", false),
				createData("15 pm", "13°", "1,028L", false),
				createData("18 pm", "10°", "900L", false),
				createData("20 pm", "7°", "1,030L", false),
			],
		},
		"18nov": {
			id: "18nov",
			label: "18 NOV",
			days: [
				createData("8 am", "7°", "900L", false),
				createData("12 pm", "11°", "1,017L", false),
				createData("15 pm", "13°", "1,028L", true),
				createData("18 pm", "10°", "900L", false),
				createData("20 pm", "7°", "1,030L", false),
			],
		},
	};

	return (
		<Container
			sx={{
				flexGrow: 1,
				backgroundColor: "#2196F326",
				textAlign: "left",
				paddingTop: "4px",
			}}
		>
			<Box sx={{ marginTop: 4, marginBottom: 4 }}>
				<Typography variant="h4" component="h1">
					2S 5500 W
				</Typography>
				<Typography variant="h6">Logan, UT 84321, USA </Typography>
			</Box>
			<Box sx={{ marginTop: 4, color: "#666666" }}>
				<Box sx={{ display: "flex", gap: "16px" }}>
					<Card sx={{ flex: "1" }}>
						<CardContent>
							<Typography variant="body2" component="div">
								WATER USAGE SCORE
							</Typography>
							<Typography
								variant="h5"
								component="div"
								sx={{ color: "#666666" }}
							>
								<Typography variant="h3" component="div" display="inline">
									70
								</Typography>
								<Typography variant="h5" component="div" display="inline">
									/100
								</Typography>
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Good job! There are still a couple of things to do
							</Typography>
						</CardContent>
					</Card>
					<Card sx={{ flex: "1" }}>
						<CardContent>
							<Typography variant="body2" sx={{ color: "inherit" }}>
								NEXT IRRIGATION
							</Typography>
							<Typography
								variant="h5"
								component="div"
								sx={{ color: "#666666", marginTop: "12px" }}
							>
								28th Oct
							</Typography>
							<Box sx={{ display: "flex", marginY: "12px" }}>
								<img src={rainy} />
								<Typography
									variant="body1"
									component="div"
									sx={{ color: "#666666", marginLeft: "8px" }}
								>
									H: 13° L: 7°
								</Typography>
							</Box>
							<Typography variant="body2" color="text.secondary">
								Patchy rain possible
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Card
					sx={{
						marginTop: "24px",
					}}
				>
					<CardContent>
						<Typography variant="body2" component="div">
							PRECIPITATION
						</Typography>
						<Typography variant="body2" color="text.secondary">
							23 mm in the next 24h
						</Typography>
						<Typography variant="body2" color="text.secondary">
							210 mm expected in the next week aprox.
						</Typography>
					</CardContent>
				</Card>
				<Card
					sx={{
						marginTop: "24px",
					}}
				>
					<CardContent>
						<Box
							sx={{
								marginBottom: "12px",
								display: "flex",
								alignItems: "center",
								gap: "16px",
							}}
						>
							<Typography variant="body1" component="div">
								Irrigation schedule
							</Typography>
							<Typography
								variant="body2"
								component="div"
								sx={{ display: "flex", alignItems: "center", gap: "8px" }}
							>
								<span
									style={{
										height: "8px",
										width: "8px",
										backgroundColor: "green",
										display: "flex",
									}}
								></span>
								<span>Best Time</span>
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								overflowX: "auto",
								whiteSpace: "nowrap",
								gap: "8px",
								paddingY: "8px",
								scrollbarWidth: "none",
							}}
						>
							{Object.values(irrigationDays).map((day) => (
								<Button
									onClick={() => setSelectedDay(day.id)}
									variant={selectedDay === day.id ? "contained" : "outlined"}
									sx={{ borderRadius: "100px" }}
								>
									{day.label}
								</Button>
							))}
						</Box>
						<TableContainer component={Paper}>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Time</TableCell>
										<TableCell align="center">Temperature</TableCell>
										<TableCell align="center">Water usage</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{irrigationDays[selectedDay].days.map((row) => (
										<TableRow
											key={row.time}
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
												backgroundColor: row.bestTime
													? "#AFF4C6"
													: "transparent",
												borderLeft: row.bestTime ? "4px solid #009951" : "none",
											}}
										>
											<TableCell component="th" scope="row">
												{row.time}
											</TableCell>
											<TableCell
												align="center"
												sx={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													gap: "4px",
												}}
											>
												<span>{row.temperature}</span>{" "}
												<span>
													<img src={cloudySnowing} />{" "}
												</span>
											</TableCell>
											<TableCell align="center">{row.waterUsage}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</CardContent>
				</Card>
				<Card
					sx={{
						marginTop: "24px",
					}}
				>
					<CardContent>
						<Grid container spacing={4}>
							<Grid
								container
								size={6}
								sx={{ gap: "4px", flexDirection: "column" }}
							>
								<Typography variant="body2" component="div">
									ALERTS
								</Typography>
								<Typography variant="body2" component="div">
									Flood warning
								</Typography>
								<Typography variant="body2" component="div">
									Lake FL; Volusia, FL
								</Typography>
							</Grid>
							<Grid
								container
								size={6}
								sx={{
									flexDirection: "column",
									alignItems: "flex-start",
									justifyContent: "end",
									"--Grid-rowSpacingLevel1": "0",
								}}
							>
								<Typography variant="body2" component="div">
									18 hours ago
								</Typography>
								<Typography
									variant="body2"
									component="div"
									sx={{ display: "flex", alignItems: "center", gap: "8px" }}
								>
									<span
										style={{
											height: "8px",
											width: "8px",
											backgroundColor: "orange",
											display: "flex",
											borderRadius: "100%",
										}}
									></span>
									<span>Severe</span>
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				<Card sx={{ display: "flex", marginTop: "24px" }}>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<CardContent sx={{ flex: "1 0 auto" }}>
							<Typography variant="body2" component="div">
								IRRIGATION METHOD
							</Typography>
							<Typography variant="subtitle1">Drip irrigation</Typography>
							<Typography
								variant="subtitle2"
								component="div"
								sx={{ color: "text.secondary" }}
							>
								Water is delivered slowly and directly to the root zone
								through...
							</Typography>
							<Button
								variant="contained"
								size="small"
								sx={{ width: "100%", marginTop: "20px" }}
							>
								Best way to save water
							</Button>
						</CardContent>
					</Box>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image={image}
						alt="Live from space album cover"
					/>
				</Card>
			</Box>
			<Button
				variant="contained"
				sx={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
			>
				save to crop list
			</Button>
		</Container>
	);
};

export default Crop;
