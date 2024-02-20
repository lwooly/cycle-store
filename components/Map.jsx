import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Loader } from '@googlemaps/js-api-loader';
import { Box } from '@mui/material';

function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      // Check if the Google Maps API is already loaded
      if (window.google && window.google.maps) {
        return; // Google Maps API is already loaded, no need to load it again
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        version: 'weekly',
      });

      await loader.load(); // Ensure the API is loaded before attempting to access Maps or Marker

      const locationInMap = {
        lat: 39.60128890889341,
        lng: -9.069839810859907,
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center: locationInMap,
        zoom: 15,
        mapId: 'NEXT_MAPS_TUTS',
      });

      // Add the marker to the map
      window.google.maps.Marker({
        map,
        position: locationInMap,
      });
    };

    initializeMap();
  }, []);

  return <Box sx={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default React.memo(GoogleMap);
