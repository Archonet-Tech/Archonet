import React, { useEffect, useRef } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const RightToolBox = ({ mapRef, drawRef, onPolygonCreated }) => {
  const handlerAddedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current && !handlerAddedRef.current) {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      mapRef.current.addControl(drawRef.current);

      mapRef.current.on('draw.create', (e) => {
        const polygon = e.features[0];
        console.log('Polygon created:', polygon.geometry.coordinates);

        if (polygon.geometry.coordinates.length > 0) {
          onPolygonCreated(polygon);
        }
      });

      handlerAddedRef.current = true; // Mark handler as added
    }

    return () => {
      if (mapRef.current && drawRef.current) {
        mapRef.current.removeControl(drawRef.current);
        handlerAddedRef.current = false; // Reset handler added state
      }
    };
  }, [mapRef, drawRef, onPolygonCreated]);

  return null;
};

export default RightToolBox;
