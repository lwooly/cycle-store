'use client';

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Box } from '@mui/material';

function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        version: 'quartely',
      });

      const { Map } = await loader.importLibrary('maps');

      const locationInMap = {
        lat: 39.60128890889341,
        lng: -9.069839810859907,
      };

      // MARKER
      const { Marker } = await loader.importLibrary('marker');

      const options = {
        center: locationInMap,
        zoom: 15,
        mapId: 'NEXT_MAPS_TUTS',
      };

      const map = new Map(mapRef.current, options);
      // add the marker in the map
      const marker = new Marker({
        map,
        position: locationInMap,
      });
    };

    initializeMap();
  }, []);

  return <Box sx={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default React.memo(GoogleMap);
