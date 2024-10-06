// PolygonDrawer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

interface PolygonDrawerProps {
  center: google.maps.LatLng; // Recibir las coordenadas centrales
}

const PolygonDrawer: React.FC<PolygonDrawerProps> = ({ center }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [area, setArea] = useState<number | null>(null);
  const [hasPolygon, setHasPolygon] = useState(false);
  const [vertexMarkers, setVertexMarkers] = useState<google.maps.LatLng[]>([]);
  const polygonFeatureRef = useRef<google.maps.Data.Feature | null>(null);
  const [perimeter, setPerimeter] = useState<number | null>(null); // Agregado para el perímetro

  const handleLoadMap = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    mapInstance.data.setControls(['Polygon']);
    mapInstance.data.setStyle(() => ({
      fillColor: 'rgba(255, 255, 255, 0.5)', // Color de relleno
      strokeColor: 'white', // Color del borde
      strokeOpacity: 1.0, // Opacidad del borde
      strokeWeight: 2, // Grosor del borde
    }));
  };

  const clearPolygons = () => {
    if (map) {
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });
      setArea(null);
      polygonFeatureRef.current = null;
      setHasPolygon(false);
      setVertexMarkers([]);
    }
  };

  const calculatePerimeter = (latLngArray: google.maps.LatLng[]) => {
    let totalPerimeter = 0;
    for (let i = 0; i < latLngArray.length; i++) {
      const point1 = latLngArray[i];
      const point2 = latLngArray[(i + 1) % latLngArray.length]; // Volver al primer punto
      totalPerimeter += google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    }
    return totalPerimeter;
  };

  const handleFeatureAdded = (event: google.maps.Data.Event) => {
    const feature = event.feature;
    if (polygonFeatureRef.current) {
      map?.data.remove(polygonFeatureRef.current);
    }

    polygonFeatureRef.current = feature;
    setHasPolygon(true);

    const geometry = feature.getGeometry();
    if (geometry && geometry.getType() === "Polygon") {
      const paths = geometry.getAt(0);
      const markers = paths.getArray().map((latLng: google.maps.LatLng) => latLng);
      const googleMaps = window.google.maps;
      const latLngArray: google.maps.LatLng[] = paths.getArray().map((latLng: google.maps.LatLng) => latLng);
      setVertexMarkers(latLngArray);
      const areaValue = googleMaps.geometry.spherical.computeArea(latLngArray);
      setArea(areaValue);
      const perimeterValue = calculatePerimeter(markers);
      setPerimeter(perimeterValue);
    }
  };

  const handleVertexChanged = () => {
    if (polygonFeatureRef.current) {
      const geometry = polygonFeatureRef.current.getGeometry();
      if (geometry && geometry.getType() === "Polygon") {
        const paths = geometry.getAt(0);
        const markers = paths.getArray().map((latLng: google.maps.LatLng) => latLng);
        setVertexMarkers(markers);
      }
    }
  };

  useEffect(() => {
    if (map) {
      const featureListener = map.data.addListener('addfeature', handleFeatureAdded);
      const vertexUpdateListener = map.data.addListener('setgeometry', handleVertexChanged);
      return () => {
        google.maps.event.removeListener(featureListener);
        google.maps.event.removeListener(vertexUpdateListener);
      };
    }
  }, [map]);

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
          padding: 0,
          position: 'relative'
        }}
      >
        <Box 
          sx={{ 
            backgroundColor: 'white',
            position: 'absolute',
            top: '48px',
            zIndex: '1',
            width: '40%',
            left: '30%',
            borderRadius: '8px'
          }}
        >
          <Button
            variant="outlined"
            onClick={() => clearPolygons()}
            sx={{
              width: '100%'
            }}>UNDO MEASURE</Button>
        </Box>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={18}
          onLoad={handleLoadMap}
          options={{
            mapTypeId: 'hybrid',
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: false,
          }}
        >
          {/* Añadir marcadores para cada vértice del polígono */}
          {vertexMarkers.map((marker, index) => (
            <Marker key={index} position={marker} icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5, // Tamaño del círculo
              fillColor: 'white', // Color de relleno del círculo
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: 'black', // Color del borde del círculo
            }} />
          ))}
        </GoogleMap>
        {area && (
        <>
            <CssBaseline />
            <Container fixed sx={{
              width: '100%',
              padding: '0',
              position: 'absolute',
              bottom: '0',
              paddingBottom: '16px',
              bgcolor: 'white',
              textAlign: 'left',
              paddingX: '24px',
              paddingY: '24px',
              }}>
              <div style={{ marginTop: '16px' }}>
                <Typography variant="h5" component="h5">
                  Measure Distance
                </Typography>
                <p>Total area: {area.toFixed(2)} m²</p>
                <p>Total distance: {perimeter ? perimeter.toFixed(2) : 0} m</p>
                <Button
                  variant="contained"
                  onClick={() => clearPolygons()}
                  sx={{
                    width: '100%'
                  }}>
                    save crop area
                </Button>
              </div>
            </Container>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PolygonDrawer;
