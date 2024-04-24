import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const QuestMap = ({ google }) => {
  const [markers, setMarkers] = useState([]);

  const handleMapClick = async (mapProps, map, clickEvent) => {
    const newMarker = {
      position: clickEvent.latLng,
      label: (markers.length + 1).toString(),
      draggable: true
    };

    try {
      const docRef = await addDoc(collection(db, 'quests'), {
        location: newMarker.position.toJSON(),
        timestamp: serverTimestamp()
      });
      console.log('Marker added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding marker: ', error);
    }

    setMarkers([...markers, newMarker]);
  };

  const handleMarkerDrag = (markerIndex, markerPosition) => {
    const updatedMarkers = [...markers];
    updatedMarkers[markerIndex].position = markerPosition;
    setMarkers(updatedMarkers);
  };

  const handleMarkerClick = (markerIndex) => {
    const updatedMarkers = markers.filter((marker, index) => index !== markerIndex);
    setMarkers(updatedMarkers);
  };

  const handleDeleteAllMarkers = () => {
    setMarkers([]);
  };

  return (
    <div>
      <div style={{ width: '100%', height: '400px' }}>
        <Map
          google={google}
          zoom={14}
          onClick={handleMapClick}
          initialCenter={{
            lat: 37.774929,
            lng: -122.419416
          }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              label={marker.label}
              draggable={marker.draggable}
              onClick={() => handleMarkerClick(index)}
              onDragend={(t, map, coord) => handleMarkerDrag(index, coord.latLng)}
            />
          ))}
        </Map>
      </div>
      <button 
        onClick={handleDeleteAllMarkers}
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '1000' }}
      >
        Delete All Markers
      </button>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(QuestMap);
