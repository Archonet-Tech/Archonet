import React, { useState } from 'react';

const DeveloperAreaComponent = ({ mapRef }) => {
  const [selectedDeveloperAreas, setSelectedDeveloperAreas] = useState([]);

  const handleDeveloperAreaSelect = (coordinates) => {
    setSelectedDeveloperAreas((prevAreas) => [...prevAreas, coordinates]);

    // Add logic to draw the developer area polygon on the map
    if (mapRef.current) {
      const polygon = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates],
        },
      };

      const sourceId = `developer-area-${selectedDeveloperAreas.length}`;
      if (!mapRef.current.getSource(sourceId)) {
        mapRef.current.addSource(sourceId, {
          type: 'geojson',
          data: polygon,
        });

        mapRef.current.addLayer({
          id: sourceId,
          type: 'fill',
          source: sourceId,
          layout: {},
          paint: {
            'fill-color': '#0000FF', // Blue color for developer areas
            'fill-opacity': 0.5,
          },
        });
      }
    }
  };

  return (
    <div className="developer-area-info">
      <h3>Developer Area Tool</h3>
      <p>Select areas to mark as developer regions.</p>
      <button onClick={() => handleDeveloperAreaSelect([
        [72.8777, 19.0762], 
        [72.8778, 19.0763], 
        [72.8779, 19.0762], 
        [72.8777, 19.0761], 
        [72.8777, 19.0762]
      ])}>
        Mark Developer Area
      </button>
      <div>
        <h4>Selected Developer Areas:</h4>
        <ul>
          {selectedDeveloperAreas.map((area, index) => (
            <li key={index}>Area {index + 1}: {JSON.stringify(area)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeveloperAreaComponent;
