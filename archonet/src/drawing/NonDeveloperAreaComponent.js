// import React, { useState } from 'react';

// const NonDeveloperAreaComponent = ({ mapRef }) => {
//   const [selectedAreas, setSelectedAreas] = useState([]);

//   const handleAreaSelect = (coordinates) => {
//     // Update state with the new area
//     setSelectedAreas((prevAreas) => [...prevAreas, coordinates]);

//     // Optional: Add logic to draw the area on the map
//     if (mapRef.current) {
//       const polygon = {
//         type: 'Feature',
//         geometry: {
//           type: 'Polygon',
//           coordinates: [coordinates], // coordinates should be in [lng, lat] format
//         },
//       };

//       // Add the polygon to the map
//       mapRef.current.addSource(`non-developer-area-${selectedAreas.length}`, {
//         type: 'geojson',
//         data: polygon,
//       });

//       mapRef.current.addLayer({
//         id: `non-developer-area-${selectedAreas.length}`,
//         type: 'fill',
//         source: `non-developer-area-${selectedAreas.length}`,
//         layout: {},
//         paint: {
//           'fill-color': '#FF0000', // Red color for non-developer areas
//           'fill-opacity': 0.5,
//         },
//       });
//     }
//   };

//   return (
//     <div className="non-developer-info">
//       <h3>Non-Developer Area Tool</h3>
//       <p>Select areas to mark as non-developer regions.</p>
//       <button onClick={() => handleAreaSelect([[72.8777, 19.0760], [72.8778, 19.0761], [72.8779, 19.0760], [72.8777, 19.0760]])}>
//         Mark Area
//       </button>
//       <div>
//         <h4>Selected Non-Developer Areas:</h4>
//         <ul>
//           {selectedAreas.map((area, index) => (
//             <li key={index}>Area {index + 1}: {JSON.stringify(area)}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NonDeveloperAreaComponent;


import React, { useState } from 'react';

const NonDeveloperAreaComponent = ({ mapRef }) => {
  const [selectedAreas, setSelectedAreas] = useState([]);

  const handleAreaSelect = (coordinates) => {
    // Update state with the new area
    setSelectedAreas((prevAreas) => [...prevAreas, coordinates]);

    // Add logic to draw the area on the map
    if (mapRef.current) {
      const polygon = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinates], // coordinates should be in [lng, lat] format
        },
      };

      // Add the polygon to the map
      const sourceId = `non-developer-area-${selectedAreas.length}`;
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
            'fill-color': '#FF0000', // Red color for non-developer areas
            'fill-opacity': 0.5,
          },
        });
      }
    }
  };

  return (
    <div className="non-developer-info">
      <h3>Non-Developer Area Tool</h3>
      <p>Select areas to mark as non-developer regions.</p>
      <button onClick={() => handleAreaSelect([
        [72.8777, 19.0760], 
        [72.8778, 19.0761], 
        [72.8779, 19.0760], 
        [72.8777, 19.0759], 
        [72.8777, 19.0760]
      ])}>
        Mark Area
      </button>
      <div>
        <h4>Selected Non-Developer Areas:</h4>
        <ul>
          {selectedAreas.map((area, index) => (
            <li key={index}>Area {index + 1}: {JSON.stringify(area)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NonDeveloperAreaComponent;
