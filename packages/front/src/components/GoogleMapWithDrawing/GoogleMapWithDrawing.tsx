// PolygonDrawer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
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
      const googleMaps = window.google.maps;
      const latLngArray: google.maps.LatLng[] = paths.getArray().map((latLng: google.maps.LatLng) => latLng);
      setVertexMarkers(latLngArray);
      const areaValue = googleMaps.geometry.spherical.computeArea(latLngArray);
      setArea(areaValue);
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
      <div>
        <button onClick={clearPolygons}>
          Eliminar Polígonos
        </button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onLoad={handleLoadMap}
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
        <div style={{ marginTop: '16px' }}>
          {area && <p>Área del polígono: {area.toFixed(2)} m²</p>}
        </div>
      </div>
  );
};

export default PolygonDrawer;
