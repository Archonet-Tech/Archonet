

// import React, { useState, useEffect } from 'react';
// import '../style/Toolbar.css';
// import { FaCube, FaDrawPolygon, FaTree, FaBan } from 'react-icons/fa';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';

// const drawStyles = [
//   {
//     id: 'gl-draw-polygon-stroke-active',
//     type: 'line',
//     filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
//     layout: {
//       'line-cap': 'round',
//       'line-join': 'round',
//     },
//     paint: {
//       'line-color': '#D20C0C',
//       'line-dasharray': [0.2, 2],
//       'line-width': 2,
//     },
//   },
//   {
//     id: 'gl-draw-polygon-fill-active',
//     type: 'fill',
//     filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
//     paint: {
//       'fill-color': '#D20C0C',
//       'fill-opacity': 0.1,
//     },
//   },
//   // Add other styles as needed...
// ];

// const Toolbar = ({ drawRef, mapRef, step }) => {
//   const [selectedTool, setSelectedTool] = useState(null);

//   useEffect(() => {
//     if (drawRef.current && mapRef.current) {
//       const draw = new MapboxDraw({
//         displayControlsDefault: false,
//         styles: drawStyles,
//       });

//       const existingControl = mapRef.current._controls.find(control => control === draw);
//       if (!existingControl) {
//         mapRef.current.addControl(draw);
//         drawRef.current = draw;
//       }
//     }

//     return () => {
//       if (drawRef.current && mapRef.current) {
//         mapRef.current.removeControl(drawRef.current);
//         drawRef.current = null;
//       }
//     };
//   }, [drawRef, mapRef]);

//   const handleIconClick = (tool) => {
//     setSelectedTool(tool);
//     if (drawRef.current) {
//       switch (tool) {
//         case 'polygon':
//           drawRef.current.changeMode('draw_polygon');
//           break;
//         case '3d':
//           switchTo3D();
//           break;
//         case 'tree':
//           // Handle tree tool logic here if needed
//           break;
//         case 'nonDeveloperArea':
//           drawRef.current.changeMode('draw_polygon');
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const switchTo3D = () => {
//     if (mapRef.current) {
//       const map = mapRef.current;
//       map.setPitch(60);
//       map.setBearing(30);
//       map.setZoom(15);
//     }
//   };

//   return (
//     <div>
//       <div className="toolbar">
//         <button
//           className={`toolbar-btn ${selectedTool === '3d' ? 'active' : ''}`}
//           onClick={() => handleIconClick('3d')}
//         >
//           <FaCube title="Switch to 3D" />
//         </button>
//         <button
//           className={`toolbar-btn ${selectedTool === 'polygon' ? 'active' : ''} ${step === 2 ? 'highlight' : ''}`}
//           onClick={() => handleIconClick('polygon')}
//         >
//           <FaDrawPolygon title="Polygon" />
//         </button>
//         <button
//           className={`toolbar-btn ${selectedTool === 'tree' ? 'active' : ''} ${step === 3 ? 'highlight' : ''}`}
//           onClick={() => handleIconClick('tree')}
//         >
//           <FaTree title="Plantation" />
//         </button>
//         <button
//           className={`toolbar-btn ${selectedTool === 'nonDeveloperArea' ? 'active' : ''} ${step === 4 ? 'highlight' : ''}`}
//           onClick={() => handleIconClick('nonDeveloperArea')}
//         >
//           <FaBan title="Non-developer Area" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Toolbar;

// import React, { useState, useEffect } from 'react';
// import '../style/Toolbar.css';
// import { FaCube, FaDrawPolygon, FaTree, FaBan } from 'react-icons/fa';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';

// const drawStyles = [
//   {
//     id: 'gl-draw-polygon-stroke-active',
//     type: 'line',
//     filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
//     layout: {
//       'line-cap': 'round',
//       'line-join': 'round',
//     },
//     paint: {
//       'line-color': '#D20C0C',
//       'line-dasharray': [0.2, 2],
//       'line-width': 2,
//     },
//   },
//   {
//     id: 'gl-draw-polygon-fill-active',
//     type: 'fill',
//     filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
//     paint: {
//       'fill-color': '#D20C0C',
//       'fill-opacity': 0.1,
//     },
//   },
//   // Add other styles as needed...
// ];

// const Toolbar = ({ drawRef, mapRef, step }) => {
//   const [selectedTool, setSelectedTool] = useState(null);

//   useEffect(() => {
//     if (drawRef.current && mapRef.current) {
//       const draw = new MapboxDraw({
//         displayControlsDefault: false,
//         styles: drawStyles,
//       });

//       const existingControl = mapRef.current._controls.find(control => control === draw);
//       if (!existingControl) {
//         mapRef.current.addControl(draw);
//         drawRef.current = draw;
//       }
//     }

//     return () => {
//       if (drawRef.current && mapRef.current) {
//         mapRef.current.removeControl(drawRef.current);
//         drawRef.current = null;
//       }
//     };
//   }, [drawRef, mapRef]);

//   const handleIconClick = (tool) => {
//     setSelectedTool(tool);
//     if (drawRef.current) {
//       switch (tool) {
//         case 'polygon':
//           drawRef.current.changeMode('draw_polygon');
//           break;
//         case '3d':
//           switchTo3D();
//           break;
//         case 'tree':
//           // Handle tree tool logic here if needed
//           break;
//         case 'nonDeveloperArea':
//           drawRef.current.changeMode('draw_polygon');
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const switchTo3D = () => {
//     if (mapRef.current) {
//       const map = mapRef.current;
//       map.setPitch(60);
//       map.setBearing(30);
//       map.setZoom(15);
//     }
//   };

//   return (
//     <div>
//       <div className="toolbar">
//         <button
//           className={`toolbar-btn ${selectedTool === '3d' ? 'active' : ''}`}
//           onClick={() => handleIconClick('3d')}
//           disabled={step !== 1}
//         >
//           <FaCube title="Switch to 3D" />
//         </button>
//         <button
//           className={`toolbar-btn ${selectedTool === 'polygon' ? 'active' : ''} ${step === 2 ? 'highlight' : ''}`}
//           onClick={() => handleIconClick('polygon')}
//           disabled={step !== 2}
//         >
//           <FaDrawPolygon title="Polygon" />
//         </button>
//         <button
//           className={`toolbar-btn ${selectedTool === 'tree' ? 'active' : ''} ${step === 3 ? 'highlight' : ''}`}
//           onClick={() => handleIconClick('tree')}
//           disabled={step !== 3}
//         >
//           <FaTree title="Plantation" />
//         </button>
//         <button
//           className={`toolbar-btn ${selectedTool === 'nonDeveloperArea' ? 'active' : ''} ${step === 4 ? 'highlight' : ''}`}
//           onClick={() => handleIconClick('nonDeveloperArea')}
//           disabled={step !== 4}
//         >
//           <FaBan title="Non-developer Area" />
//         </button>
//       </div>
//       {step === 4 && <button className="continue-btn">Continue</button>}
//     </div>
//   );
// };

// export default Toolbar;


import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
import '../style/TreeComponent.css';

const TreeComponent = ({ onSetDrawingMode }) => {
  const [drawData, setDrawData] = useState(null); // To store the drawn data
  const [map, setMap] = useState(null);
  const drawRef = useRef(null);

  useEffect(() => {
    // Initialize the map only once
    if (map) return; // Ensure the map is initialized only once
    const newMap = new mapboxgl.Map({
      container: 'map', // The ID of your map container
      style: 'mapbox://styles/mapbox/streets-v11', // Your map style
      center: [0, 0], // Set the initial map center
      zoom: 2, // Set the initial zoom level
    });

    newMap.on('load', () => {
      // Initialize MapboxDraw once the map is loaded
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          line_string: false,
          point: false,
        },
      });
      newMap.addControl(drawRef.current);
      setMap(newMap);
    });

    // Cleanup on component unmount
    return () => newMap.remove();
  }, [map]);

  const handleDrawingMode = (mode) => {
    if (drawRef.current) {
      onSetDrawingMode(mode);
      if (mode === 'tree') {
        drawRef.current.changeMode('draw_polygon');
      }
    }
  };

  // Handle the drawn polygon data
  const handleSaveTreeData = async () => {
    if (drawRef.current) {
      const data = drawRef.current.getAll(); // Get all drawn features
      setDrawData(data);

      try {
        const response = await axios.post('http://your-backend-api.com/trees', {
          polygons: data, // Send drawn data (polygon) to backend
        });
        console.log('Tree data saved:', response.data);
      } catch (error) {
        console.error('Error saving tree data:', error);
      }
    }
  };

  return (
    <div className="tree-info">
      <h3>Tree Planting Tool</h3>
      <p>Select areas on the map to plant trees.</p>
      <button onClick={() => handleDrawingMode('tree')}>Plant a Tree</button>
      <button onClick={handleSaveTreeData}>Save Tree Area</button>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default TreeComponent;
