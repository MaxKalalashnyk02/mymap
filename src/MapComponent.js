import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerClusterer from '@googlemaps/markerclusterer';

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchedMarkers = [
      { lat: 37.7749, lng: -122.4194 },
      { lat: 37.775, lng: -122.418 },
    ];
    setMarkers(fetchedMarkers);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyALQGZ2IQdMda7c99XJq9xIbSvxb0BduQs">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        zoom={10}
        center={{ lat: 37.7749, lng: -122.4194 }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {mapRef.current && (
          <MarkerClusterer
            imagePath="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
            gridSize={60}
            minimumClusterSize={2}
          >
            {(clusterer) =>
              markers.map((marker, index) => (
                <Marker key={index} position={marker} clusterer={clusterer} />
              ))
            }
          </MarkerClusterer>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
