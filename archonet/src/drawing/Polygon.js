

import React, { useEffect } from 'react';

const Polygon = ({ mapRef, drawRef, onPolygonCreated }) => {

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance || !drawRef.current) return;

    // Any additional polygon logic can go here

    return () => {
      // Ensure clean up when the component is unmounted
      if (mapInstance && drawRef.current) {
        mapInstance.removeControl(drawRef.current);
        drawRef.current = null;
      }
    };
  }, [mapRef, drawRef]);

  return null;
};

export default Polygon;
