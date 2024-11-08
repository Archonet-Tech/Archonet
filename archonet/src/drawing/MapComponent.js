import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your token

const MapComponent = React.forwardRef(({ longitude, latitude }, ref) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Choose the style
      center: [longitude, latitude], // Set your map's initial center
      zoom: 13, // Set your map's initial zoom level
    });

    // Expose the map instance to the parent component
    ref.current = map;

    // Clean up the map on unmount
    return () => {
      map.remove();
    };
  }, [longitude, latitude, ref]); // Add longitude and latitude to dependency array

  return <div ref={mapContainerRef} className="mapbox-map" style={{ height: "100vh", width: "100%" }} />; // Set height and width for the map
});

export default MapComponent;
