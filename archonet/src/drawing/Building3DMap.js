// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import BuildingInputForm from '../components/BuildingInputForm'; // Import the BuildingInputForm component

// mapboxgl.accessToken = 'pk.eyJ1IjoicmFteWFrYW50IiwiYSI6ImNtMXViZDJyaDBhdHAycnM1OXh6Y2VhYncifQ.m3pXYCrfAAj0Ojt-jb0Gyw';

// const Building3DMap = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const [buildingInput, setBuildingInput] = useState(null); // Store current building input
//   const [clickLocation, setClickLocation] = useState(null); // Store click location on the map

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize the Mapbox map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/light-v10',
//       center: [72.8777, 19.0760], // Example location (Mumbai)
//       zoom: 15,
//       pitch: 60,  // Tilt the map for 3D effect
//       bearing: -17.6,
//     });

//     // Add a 3D building layer to the map
//     mapRef.current.on('load', () => {
//       mapRef.current.addLayer({
//         'id': '3d-buildings',
//         'source': 'composite',
//         'source-layer': 'building',
//         'filter': ['==', 'extrude', 'true'],
//         'type': 'fill-extrusion',
//         'minzoom': 15,
//         'paint': {
//           'fill-extrusion-color': '#aaa',
//           'fill-extrusion-height': [
//             'interpolate',
//             ['linear'],
//             ['zoom'],
//             15,
//             0,
//             15.05,
//             ['get', 'height']
//           ],
//           'fill-extrusion-base': [
//             'interpolate',
//             ['linear'],
//             ['zoom'],
//             15,
//             0,
//             15.05,
//             ['get', 'min_height']
//           ],
//           'fill-extrusion-opacity': 0.8
//         }
//       });
//     });

//     // Listen for map click event to get coordinates for new building
//     mapRef.current.on('click', (event) => {
//       const { lng, lat } = event.lngLat;
//       setClickLocation([lng, lat]); // Set click location
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const handleFormSubmit = (input) => {
//     setBuildingInput(input); // Store the building input (e.g., height)
//   };

//   // const handleCreateBuilding = () => {
//   //   if (!clickLocation || !buildingInput) {
//   //     alert("Click on the map to choose a building location and fill in the form!");
//   //     return;
//   //   }
  
//   //   const uniqueId = `custom-building-${Date.now()}`;
//   //   const [lng, lat] = clickLocation;
  
//   //   // Adjust building size dynamically based on input dimensions
//   //   const width = buildingInput.dimensions.width * 0.00001;  // Convert to map scale
//   //   const depth = buildingInput.dimensions.depth * 0.00001;
  
//   //   const coordinates = [
//   //     [lng - width / 2, lat - depth / 2],
//   //     [lng - width / 2, lat + depth / 2],
//   //     [lng + width / 2, lat + depth / 2],
//   //     [lng + width / 2, lat - depth / 2],
//   //     [lng - width / 2, lat - depth / 2],
//   //   ];
  
//   //   // Add building layer to the map
//   //   mapRef.current.addLayer({
//   //     'id': uniqueId,
//   //     'type': 'fill-extrusion',
//   //     'source': {
//   //       'type': 'geojson',
//   //       'data': {
//   //         'type': 'Feature',
//   //         'geometry': {
//   //           'type': 'Polygon',
//   //           'coordinates': [coordinates],
//   //         },
//   //       },
//   //     },
//   //     'paint': {
//   //       'fill-extrusion-color': '#888888',
//   //       'fill-extrusion-height': buildingInput.dimensions.height,
//   //       'fill-extrusion-base': 0,
//   //       'fill-extrusion-opacity': 0.9,
//   //       'fill-extrusion-vertical-gradient': true,
//   //     },
//   //   });
  
//   //   alert('Building added to the map at the clicked location!');
//   // };
//   const handleCreateBuilding = () => {
//     if (!clickLocation || !buildingInput) {
//       alert("Click on the map to choose a building location and fill in the form!");
//       return;
//     }
  
//     const uniqueId = `custom-building-${Date.now()}`;
//     const [lng, lat] = clickLocation;
  
//     // Adjust building size dynamically based on input dimensions
//     const width = buildingInput.dimensions.width * 0.00001;  // Convert to map scale
//     const depth = buildingInput.dimensions.depth * 0.00001;
//     const totalHeight = buildingInput.dimensions.height;
//     const numberOfFloors = buildingInput.floors.number;
//     const floorHeight = totalHeight / numberOfFloors; // Calculate height per floor
  
//     const coordinates = [
//       [lng - width / 2, lat - depth / 2],
//       [lng - width / 2, lat + depth / 2],
//       [lng + width / 2, lat + depth / 2],
//       [lng + width / 2, lat - depth / 2],
//       [lng - width / 2, lat - depth / 2],
//     ];
  
//     // Define colors for each floor
//     const floorColors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD'];
  
//     // Loop through each floor and add a separate layer for each
//     for (let i = 0; i < numberOfFloors; i++) {
//       const floorBase = i * floorHeight;
//       const floorColor = floorColors[i % floorColors.length]; // Cycle through colors
  
//       mapRef.current.addLayer({
//         'id': `${uniqueId}-floor-${i}`,
//         'type': 'fill-extrusion',
//         'source': {
//           'type': 'geojson',
//           'data': {
//             'type': 'Feature',
//             'geometry': {
//               'type': 'Polygon',
//               'coordinates': [coordinates],
//             },
//           },
//         },
//         'paint': {
//           'fill-extrusion-color': floorColor,
//           'fill-extrusion-height': floorBase + floorHeight,
//           'fill-extrusion-base': floorBase,
//           'fill-extrusion-opacity': 0.9,
//           'fill-extrusion-vertical-gradient': false, // Disable gradient to see lines clearly
//         },
//       });
//     }
  
//     alert('Building added to the map with different colored floors!');
//   };
  
//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       {/* Left: Map */}
//       <div
//         ref={mapContainerRef}
//         style={{
//           width: '70%',
//           height: '100%',
//         }}
//       />

//       {/* Right: Form */}
//       <div style={{ width: '30%', padding: '20px', backgroundColor: '#f9f9f9', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
//         <h2>Building Input</h2>
//         <BuildingInputForm onSubmit={handleFormSubmit} />

//         {/* Button to create building on the map */}
//         <button
//           onClick={handleCreateBuilding}
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             backgroundColor: '#28a745',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontSize: '16px',
//           }}
//         >
//           Create Building
//         </button>

//         {/* Instructions */}
//         <p style={{ marginTop: '20px', fontSize: '14px' }}>
//           Click on the map to choose a location, then click "Create Building" to place it.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Building3DMap;
