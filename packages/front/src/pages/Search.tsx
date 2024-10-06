import React, { useState } from 'react';
import GoogleMapWithSearch from '../components/GoogleMapWithSearch';
import GoogleMapWithDrawing from '../components/GoogleMapWithDrawing';
import { Box, Container } from '@mui/material';

const Settings: React.FC = () => {
	const [center, setCenter] = useState<google.maps.LatLng | null>(null);
	const [steps, setSteps] = useState(1);

	const handleLocationChange = (location: google.maps.LatLng) => {
		setCenter(location);
		setSteps(2)
	};

	return (
		<Box
			sx={{ 
				display: 'flex', 
				flexDirection: 'column', 
				height: '100%'
			}}
	  >
		<Container
		  sx={{ 
			flex: 1, 
			overflowY: 'auto',
			padding: 0
		  }}
		>
			{ steps === 1 ? (
					<GoogleMapWithSearch onLocationChange={handleLocationChange} />
				) : null
			}
			{ steps === 2  && center ? (
				<GoogleMapWithDrawing center={center} />
				) : null}
		</Container>
		</Box>
	);
};

export default Settings;
