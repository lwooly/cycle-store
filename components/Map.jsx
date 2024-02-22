'use client';

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

      // initialise Maps loader with API key
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        version: 'weekly',
      });

      // import map and marker from
      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');

      const location = {
        lat: 50.503632,
        lng: -4.652498,
      };

      // MARKER
      const options = {
        center: location,
        zoom: 8,
        mapId: 'NEXT_MAPS_CORNWALL',
      };

      const map = new Map(mapRef.current, options);
      // add the marker in the map
      const marker = new AdvancedMarkerElement({
        map,
        position: location,
      });
    };

    initializeMap();
  }, []);

  return <Box sx={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default React.memo(GoogleMap);
