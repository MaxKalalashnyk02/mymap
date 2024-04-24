import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import QuestMap from './QuestMap';

const GoogleMap = ({ google }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {mapLoaded && (
        <Map
          google={google}
          zoom={14}
          initialCenter={{
            lat: 37.774929,
            lng: -122.419416
          }}
        >
          <QuestMap google={google} />
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(GoogleMap);
