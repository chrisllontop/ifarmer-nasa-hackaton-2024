import AddIcon from "@mui/icons-material/Add";
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Fab,
	Typography,
} from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import type React from "react";
import { useProgressStepper } from "../../context/ProgressBar.tsx";

const mapContainerStyle = {
	width: "100%",
	height: "100%",
};

interface PolygonDrawerProps {
	center: google.maps.LatLng;
}

const PolygonDrawer: React.FC<PolygonDrawerProps> = ({ center }) => {
	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [area, setArea] = useState<number | null>(null);
	const [hasPolygon, setHasPolygon] = useState(false);
	const [vertexMarkers, setVertexMarkers] = useState<google.maps.LatLng[]>([]);
	const [drawingMode, setDrawingMode] = useState(false); // Estado para manejar el modo de dibujo
	const polygonFeatureRef = useRef<google.maps.Polygon | null>(null);
	const [perimeter, setPerimeter] = useState<number | null>(null);

	const { setActiveStep } = useProgressStepper();

	const handleLoadMap = (mapInstance: google.maps.Map) => {
		setMap(mapInstance);
	};

	const clearPolygons = () => {
		if (polygonFeatureRef.current) {
			polygonFeatureRef.current.setMap(null);
		}

		setArea(null);
		setHasPolygon(false);
		setVertexMarkers([]);
	};

	const calculatePerimeter = (latLngArray: google.maps.LatLng[]) => {
		let totalPerimeter = 0;
		for (let i = 0; i < latLngArray.length; i++) {
			const point1 = latLngArray[i];
			const point2 = latLngArray[(i + 1) % latLngArray.length];
			totalPerimeter += google.maps.geometry.spherical.computeDistanceBetween(
				point1,
				point2,
			);
		}
		return totalPerimeter;
	};

	const handlePolygonComplete = (polygon: google.maps.Polygon) => {
		const path = polygon.getPath();
		const googleMaps = window.google.maps;

		const latLngArray = path.getArray();
		setVertexMarkers(latLngArray);

		const areaValue = googleMaps.geometry.spherical.computeArea(latLngArray);
		const perimeterValue = calculatePerimeter(latLngArray);

		setArea(areaValue);
		setPerimeter(perimeterValue);
		polygonFeatureRef.current = polygon;
		setDrawingMode(false);
	};

	const startDrawing = () => {
		if (!map || drawingMode) return;

		const googleMaps = window.google.maps;
		const drawingManager = new googleMaps.drawing.DrawingManager({
			drawingMode: googleMaps.drawing.OverlayType.POLYGON,
			drawingControl: false,
			polygonOptions: {
				fillColor: "rgba(255, 255, 255, 0.5)",
				strokeColor: "white",
				strokeOpacity: 1.0,
				strokeWeight: 2,
				editable: true,
				draggable: true,
			},
		});

		drawingManager.setMap(map);

		googleMaps.event.addListener(
			drawingManager,
			"polygoncomplete",
			(polygon: google.maps.Polygon) => {
				handlePolygonComplete(polygon);
				drawingManager.setDrawingMode(null);
			},
		);

		setDrawingMode(true); // Se activa el modo de dibujo
	};

	const submitCropInformation = () => {
		console.log({ area, center });
		setActiveStep(3);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<Container
				sx={{ flex: 1, overflowY: "auto", padding: 0, position: "relative" }}
			>
				<Box
					sx={{
						backgroundColor: "white",
						position: "absolute",
						top: "48px",
						zIndex: "1",
						width: "40%",
						left: "30%",
						borderRadius: "8px",
					}}
				>
					<Button
						variant="outlined"
						onClick={clearPolygons}
						sx={{ width: "100%" }}
					>
						UNDO MEASURE
					</Button>
				</Box>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={center}
					zoom={18}
					onLoad={handleLoadMap}
					options={{
						mapTypeId: "hybrid",
						streetViewControl: false,
						mapTypeControl: false,
						clickableIcons: false,
						drawingControl: false,
					}}
				>
					{vertexMarkers.map((marker, index) => (
						<Marker
							key={index}
							position={marker}
							icon={{
								path: google.maps.SymbolPath.CIRCLE,
								scale: 5,
								fillColor: "white",
								fillOpacity: 1,
								strokeWeight: 2,
								strokeColor: "black",
							}}
						/>
					))}
				</GoogleMap>
				<CssBaseline />
				<Container
					fixed
					sx={{
						width: "100%",
						padding: "0",
						position: "absolute",
						bottom: "0",
						paddingBottom: "16px",
						bgcolor: "white",
						textAlign: "left",
						paddingX: "24px",
						paddingY: "24px",
						borderTopLeftRadius: "8px",
						borderTopRightRadius: "8px",
					}}
				>
					<Typography variant="h5" component="h5">
						Measure Distance
					</Typography>
					{area ? (
						<div style={{ marginTop: "16px" }}>
							<Typography variant="subtitle1" sx={{ fontWeight: "light" }}>
								Total area: {area.toFixed(2)} m²
							</Typography>
							<Typography variant="subtitle1" sx={{ fontWeight: "light" }}>
								Total distance: {perimeter ? perimeter.toFixed(2) : 0} m
							</Typography>
							<Button
								variant="contained"
								onClick={submitCropInformation}
								sx={{ width: "100%", marginTop: "20px" }}
							>
								save crop area
							</Button>
						</div>
					) : (
						<div style={{ marginTop: "16px", position: "relative" }}>
							<Typography variant="subtitle1" sx={{ fontWeight: "light" }}>
								Click on the map and select your crop area
							</Typography>
							<Fab
								color="primary"
								aria-label="add"
								style={{ position: "absolute", top: "-96px", right: "0" }}
								onClick={startDrawing}
							>
								<AddIcon />
							</Fab>
						</div>
					)}
				</Container>
			</Container>
		</Box>
	);
};

export default PolygonDrawer;
