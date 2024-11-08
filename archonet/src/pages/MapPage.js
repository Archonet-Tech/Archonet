

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import * as turf from '@turf/turf';  // Import Turf.js for geometry calculations
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Toolbar from '../components/Toolbar';
// import TreeComponent from '../drawing/TreeComponent';
// import RegulatoryForm from '../pages/RegulatoryForm';
// import '../style/MapPage.css';  // Import your custom styles

// mapboxgl.accessToken = 'pk.eyJ1IjoicmFteWFrYW50IiwiYSI6ImNtMXViZDJyaDBhdHAycnM1OXh6Y2VhYncifQ.m3pXYCrfAAj0Ojt-jb0Gyw';

// const SiteMap = () => {
//   const [polygonCoords, setPolygonCoords] = useState([]);
//   const [trees, setTrees] = useState([]);
//   const [area, setArea] = useState(null);
//   const [sideLengths, setSideLengths] = useState([]);
//   const [showRegulatoryForm, setShowRegulatoryForm] = useState(false);
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const drawRef = useRef(null);
//   const polygonRef = useRef(null);
//   const lengthMarkersRef = useRef([]);

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize the map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [72.8777, 19.0760],
//       zoom: 18,
//     });

//     // Initialize Mapbox Draw
//     drawRef.current = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         polygon: true,
//         trash: true
//       }
//     });
//     mapRef.current.addControl(drawRef.current);

//     // Initialize Mapbox Geocoder
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//     });
//     mapRef.current.addControl(geocoder);

//     // Capture polygon creation event
//     mapRef.current.on('draw.create', (e) => {
//       const polygon = e.features[0];
//       const coords = polygon.geometry.coordinates[0];
//       setPolygonCoords(coords);
//       polygonRef.current = polygon;

//       // Calculate area and side lengths
//       calculateAreaAndLengths(coords);
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const calculateAreaAndLengths = (coords) => {
//     const polygon = turf.polygon([coords]);
//     const calculatedArea = turf.area(polygon);
//     setArea(calculatedArea);

//     const lengths = coords.slice(0, -1).map((start, i) => {
//       const end = coords[i + 1];
//       const line = turf.lineString([start, end]);
//       return {
//         length: turf.length(line, { units: 'meters' }),
//         midpoint: turf.midpoint(turf.point(start), turf.point(end)).geometry.coordinates
//       };
//     });
//     setSideLengths(lengths);

//     // Remove existing length markers
//     lengthMarkersRef.current.forEach(marker => marker.remove());
//     lengthMarkersRef.current = [];

//     // Add length markers to the map
//     lengths.forEach(({ length, midpoint }) => {
//       const el = document.createElement('div');
//       el.className = 'length-marker';
//       el.innerText = `${length.toFixed(2)} m`;

//       const marker = new mapboxgl.Marker({ element: el })
//         .setLngLat(midpoint)
//         .addTo(mapRef.current);

//       lengthMarkersRef.current.push(marker);
//     });
//   };

//   const handlePlantTree = useCallback((lngLat) => {
//     if (polygonCoords.length > 0) {
//       const newTree = { lng: lngLat.lng, lat: lngLat.lat };
//       setTrees((prevTrees) => [...prevTrees, newTree]);

//       // Add tree marker to the map
//       new mapboxgl.Marker({ color: 'green' })
//         .setLngLat([lngLat.lng, lngLat.lat])
//         .addTo(mapRef.current);
//     }
//   }, [polygonCoords]);

//   // Check if a point is inside the polygon
//   const isPointInPolygon = (point) => {
//     const [lng, lat] = point;
//     const inside = require('point-in-polygon');
//     return inside([lng, lat], polygonCoords);
//   };

//   const handleMapClick = (event) => {
//     const { lng, lat } = event.lngLat;
//     if (polygonCoords.length > 0 && isPointInPolygon([lng, lat])) {
//       handlePlantTree({ lng, lat });
//     } else {
//       // alert("Click inside the polygon to plant a tree.");
//     }
//   };

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.on('click', handleMapClick);
//     }
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.off('click', handleMapClick);
//       }
//     };
//   }, [polygonCoords]);

//   const AreaAndLengthsDisplay = ({ area, lengths }) => (
//     <div className="area-lengths-display">
//       <h3>Polygon Information</h3>
//       {area && <p>Area: {area.toFixed(2)} square meters</p>}
//       {lengths.length > 0 && (
//         <ul>
//           {lengths.map(({ length }, index) => (
//             <li key={index}>Length of side {index + 1}: {length.toFixed(2)} meters</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <div className="map-page">
//       <div ref={mapContainerRef} className="map-container" style={{ height: "100vh", width: "100%" }} />
//       <Toolbar drawRef={drawRef} mapRef={mapRef} />
//       <TreeComponent />
//       <AreaAndLengthsDisplay area={area} lengths={sideLengths} />
//       <button
//         className="continue-button"
//         style={{
//           position: 'absolute',
//           bottom: '200px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           padding: '10px 20px',
//           backgroundColor: 'red',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}
//         onClick={() => setShowRegulatoryForm(true)}
//       >
//         Continue
//       </button>
//       {showRegulatoryForm && <RegulatoryForm onClose={() => setShowRegulatoryForm(false)} />}
//     </div>
//   );
// };

// export default SiteMap;



// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import * as turf from '@turf/turf';  // Import Turf.js for geometry calculations
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Toolbar from '../components/Toolbar';
// import TreeComponent from '../drawing/TreeComponent';
// import RegulatoryForm from '../pages/RegulatoryForm';
// import '../style/MapPage.css';  // Import your custom styles
// import { supabase } from '../auth/'; // Adjust the import path as needed

// mapboxgl.accessToken = 'pk.eyJ1IjoicmFteWFrYW50IiwiYSI6ImNtMXViZDJyaDBhdHAycnM1OXh6Y2VhYncifQ.m3pXYCrfAAj0Ojt-jb0Gyw';

// const SiteMap = () => {
//   const [polygonCoords, setPolygonCoords] = useState([]);
//   const [trees, setTrees] = useState([]);
//   const [area, setArea] = useState(null);
//   const [sideLengths, setSideLengths] = useState([]);
//   const [showRegulatoryForm, setShowRegulatoryForm] = useState(false);
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const drawRef = useRef(null);
//   const polygonRef = useRef(null);
//   const lengthMarkersRef = useRef([]);

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize the map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [72.8777, 19.0760],
//       zoom: 18,
//     });

//     // Initialize Mapbox Draw
//     drawRef.current = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         polygon: true,
//         trash: true
//       }
//     });
//     mapRef.current.addControl(drawRef.current);

//     // Initialize Mapbox Geocoder
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//     });
//     mapRef.current.addControl(geocoder);

//     geocoder.on('result', (event) => {
//       const { text, center } = event.result;
//       const [lng, lat] = center;
      
//       // Save search location to Supabase
//       saveSearchLocation(text, lng, lat);
//     });

//     // Capture polygon creation event
//     mapRef.current.on('draw.create', (e) => {
//       const polygon = e.features[0];
//       const coords = polygon.geometry.coordinates[0];
//       setPolygonCoords(coords);
//       polygonRef.current = polygon;

//       // Calculate area and side lengths
//       calculateAreaAndLengths(coords);

//       // Save polygon and side lengths to Supabase
//       savePolygon(coords, area, sideLengths);
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const savePolygon = async (coords, area, lengths) => {
//     try {
//       const { data: polygonData, error: polygonError } = await supabase
//         .from('polygons')
//         .insert([{ coordinates: coords, area }])
//         .select();
      
//       if (polygonError) throw polygonError;
//       const polygonId = polygonData[0].id;

//       const sideLengthData = lengths.map(length => ({
//         polygon_id: polygonId,
//         length: length.length,
//         midpoint: length.midpoint,
//       }));
      
//       const { error: sideLengthsError } = await supabase
//         .from('side_lengths')
//         .insert(sideLengthData);

//       if (sideLengthsError) throw sideLengthsError;

//       console.log('Polygon and side lengths saved successfully!');
//     } catch (error) {
//       console.error('Error saving polygon and side lengths:', error);
//     }
//   };

//   const saveTree = async (polygonId, tree) => {
//     try {
//       const { error } = await supabase
//         .from('trees')
//         .insert([{ polygon_id: polygonId, lng: tree.lng, lat: tree.lat }]);
      
//       if (error) throw error;

//       console.log('Tree saved successfully!');
//     } catch (error) {
//       console.error('Error saving tree:', error);
//     }
//   };

//   const saveSearchLocation = async (query, lng, lat) => {
//     try {
//       const { error } = await supabase
//         .from('search_locations')
//         .insert([{ query, lng, lat }]);
      
//       if (error) throw error;

//       console.log('Search location saved successfully!');
//     } catch (error) {
//       console.error('Error saving search location:', error);
//     }
//   };

//   const calculateAreaAndLengths = (coords) => {
//     const polygon = turf.polygon([coords]);
//     const calculatedArea = turf.area(polygon);
//     setArea(calculatedArea);

//     const lengths = coords.slice(0, -1).map((start, i) => {
//       const end = coords[i + 1];
//       const line = turf.lineString([start, end]);
//       return {
//         length: turf.length(line, { units: 'meters' }),
//         midpoint: turf.midpoint(turf.point(start), turf.point(end)).geometry.coordinates
//       };
//     });
//     setSideLengths(lengths);

//     // Remove existing length markers
//     lengthMarkersRef.current.forEach(marker => marker.remove());
//     lengthMarkersRef.current = [];

//     // Add length markers to the map
//     lengths.forEach(({ length, midpoint }) => {
//       const el = document.createElement('div');
//       el.className = 'length-marker';
//       el.innerText = `${length.toFixed(2)} m`;

//       const marker = new mapboxgl.Marker({ element: el })
//         .setLngLat(midpoint)
//         .addTo(mapRef.current);

//       lengthMarkersRef.current.push(marker);
//     });
//   };

//   const handlePlantTree = useCallback((lngLat) => {
//     if (polygonCoords.length > 0) {
//       const newTree = { lng: lngLat.lng, lat: lngLat.lat };
//       setTrees((prevTrees) => [...prevTrees, newTree]);

//       // Add tree marker to the map
//       new mapboxgl.Marker({ color: 'green' })
//         .setLngLat([lngLat.lng, lngLat.lat])
//         .addTo(mapRef.current);

//       // Save tree to Supabase
//       saveTree(polygonRef.current.id, newTree);
//     }
//   }, [polygonCoords]);

//   // Check if a point is inside the polygon
//   const isPointInPolygon = (point) => {
//     const [lng, lat] = point;
//     const inside = require('point-in-polygon');
//     return inside([lng, lat], polygonCoords);
//   };

//   const handleMapClick = (event) => {
//     const { lng, lat } = event.lngLat;
//     if (polygonCoords.length > 0 && isPointInPolygon([lng, lat])) {
//       handlePlantTree({ lng, lat });
//     } else {
//       // alert("Click inside the polygon to plant a tree.");
//     }
//   };

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.on('click', handleMapClick);
//     }
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.off('click', handleMapClick);
//       }
//     };
//   }, [polygonCoords]);

//   const AreaAndLengthsDisplay = ({ area, lengths }) => (
//     <div className="area-lengths-display">
//       <h3>Polygon Information</h3>
//       {area && <p>Area: {area.toFixed(2)} square meters</p>}
//       {lengths.length > 0 && (
//         <ul>
//           {lengths.map(({ length }, index) => (
//             <li key={index}>Length of side {index + 1}: {length.toFixed(2)} meters</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <div className="map-page">
//       <div ref={mapContainerRef} className="map-container" style={{ height: "100vh", width: "100%" }} />
//       <Toolbar drawRef={drawRef} mapRef={mapRef} />
//       <TreeComponent />
//       <AreaAndLengthsDisplay area={area} lengths={sideLengths} />
//       {showRegulatoryForm && <RegulatoryForm />}
//     </div>
//   );
// };

// export default SiteMap;


// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import * as turf from '@turf/turf';  // Import Turf.js for geometry calculations
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Toolbar from '../components/Toolbar';
// import TreeComponent from '../drawing/TreeComponent';
// import RegulatoryForm from '../pages/RegulatoryForm';
// import '../style/MapPage.css';  // Import your custom styles
// import { supabase } from '../auth/supabaseClient'; // Adjust the import path as needed

// mapboxgl.accessToken = 'pk.eyJ1IjoicmFteWFrYW50IiwiYSI6ImNtMXViZDJyaDBhdHAycnM1OXh6Y2VhYncifQ.m3pXYCrfAAj0Ojt-jb0Gyw';

// const SiteMap = () => {
//   const [polygonCoords, setPolygonCoords] = useState([]);
//   const [trees, setTrees] = useState([]);
//   const [area, setArea] = useState(null);
//   const [sideLengths, setSideLengths] = useState([]);
//   const [showRegulatoryForm, setShowRegulatoryForm] = useState(false);
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const drawRef = useRef(null);
//   const polygonRef = useRef(null);
//   const lengthMarkersRef = useRef([]);

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize the map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [72.8777, 19.0760],
//       zoom: 18,
//     });

//     // Initialize Mapbox Draw
//     drawRef.current = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         polygon: true,
//         trash: true
//       }
//     });
//     mapRef.current.addControl(drawRef.current);

//     // Initialize Mapbox Geocoder
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//     });
//     mapRef.current.addControl(geocoder);

//     geocoder.on('result', (event) => {
//       const { text, center } = event.result;
//       const [lng, lat] = center;
      
//       // Save search location to Supabase
//       saveSearchLocation(text, lng, lat);
//     });

//     // Capture polygon creation event
//     mapRef.current.on('draw.create', (e) => {
//       const polygon = e.features[0];
//       const coords = polygon.geometry.coordinates[0];
//       setPolygonCoords(coords);
//       polygonRef.current = polygon;

//       // Calculate area and side lengths
//       calculateAreaAndLengths(coords);

//       // Save polygon and side lengths to Supabase
//       savePolygon(coords, area, sideLengths);
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const savePolygon = async (coords, area, lengths) => {
//     try {
//       const { data: polygonData, error: polygonError } = await supabase
//         .from('polygons')
//         .insert([{ coordinates: coords, area }])
//         .select();
      
//       if (polygonError) throw polygonError;
//       const polygonId = polygonData[0].id;

//       const sideLengthData = lengths.map(length => ({
//         polygon_id: polygonId,
//         length: length.length,
//         midpoint: length.midpoint,
//       }));
      
//       const { error: sideLengthsError } = await supabase
//         .from('side_lengths')
//         .insert(sideLengthData);

//       if (sideLengthsError) throw sideLengthsError;

//       console.log('Polygon and side lengths saved successfully!');
//     } catch (error) {
//       console.error('Error saving polygon and side lengths:', error);
//     }
//   };

//   const saveTree = async (polygonId, tree) => {
//     try {
//       const { error } = await supabase
//         .from('trees')
//         .insert([{ polygon_id: polygonId, lng: tree.lng, lat: tree.lat }]);
      
//       if (error) throw error;

//       console.log('Tree saved successfully!');
//     } catch (error) {
//       console.error('Error saving tree:', error);
//     }
//   };

//   const saveSearchLocation = async (query, lng, lat) => {
//     try {
//       const { error } = await supabase
//         .from('search_locations')
//         .insert([{ query, lng, lat }]);
      
//       if (error) throw error;

//       console.log('Search location saved successfully!');
//     } catch (error) {
//       console.error('Error saving search location:', error);
//     }
//   };

//   const calculateAreaAndLengths = (coords) => {
//     const polygon = turf.polygon([coords]);
//     const calculatedArea = turf.area(polygon);
//     setArea(calculatedArea);

//     const lengths = coords.slice(0, -1).map((start, i) => {
//       const end = coords[i + 1];
//       const line = turf.lineString([start, end]);
//       return {
//         length: turf.length(line, { units: 'meters' }),
//         midpoint: turf.midpoint(turf.point(start), turf.point(end)).geometry.coordinates
//       };
//     });
//     setSideLengths(lengths);

//     // Remove existing length markers
//     lengthMarkersRef.current.forEach(marker => marker.remove());
//     lengthMarkersRef.current = [];

//     // Add length markers to the map
//     lengths.forEach(({ length, midpoint }) => {
//       const el = document.createElement('div');
//       el.className = 'length-marker';
//       el.innerText = `${length.toFixed(2)} m`;

//       const marker = new mapboxgl.Marker({ element: el })
//         .setLngLat(midpoint)
//         .addTo(mapRef.current);

//       lengthMarkersRef.current.push(marker);
//     });
//   };

//   const handlePlantTree = useCallback((lngLat) => {
//     if (polygonCoords.length > 0) {
//       const newTree = { lng: lngLat.lng, lat: lngLat.lat };
//       setTrees((prevTrees) => [...prevTrees, newTree]);

//       // Add tree marker to the map
//       new mapboxgl.Marker({ color: 'green' })
//         .setLngLat([lngLat.lng, lngLat.lat])
//         .addTo(mapRef.current);

//       // Save tree to Supabase
//       saveTree(polygonRef.current.id, newTree);
//     }
//   }, [polygonCoords]);

//   // Check if a point is inside the polygon
//   const isPointInPolygon = (point) => {
//     const [lng, lat] = point;
//     const inside = require('point-in-polygon');
//     return inside([lng, lat], polygonCoords);
//   };

//   const handleMapClick = (event) => {
//     const { lng, lat } = event.lngLat;
//     if (polygonCoords.length > 0 && isPointInPolygon([lng, lat])) {
//       handlePlantTree({ lng, lat });
//     } else {
//       // alert("Click inside the polygon to plant a tree.");
//     }
//   };

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.on('click', handleMapClick);
//     }
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.off('click', handleMapClick);
//       }
//     };
//   }, [polygonCoords]);

//   const AreaAndLengthsDisplay = ({ area, lengths }) => (
//     <div className="area-lengths-display">
//       <h3>Polygon Information</h3>
//       {area && <p>Area: {area.toFixed(2)} square meters</p>}
//       {lengths.length > 0 && (
//         <ul>
//           {lengths.map(({ length }, index) => (
//             <li key={index}>Length of side {index + 1}: {length.toFixed(2)} meters</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <div className="map-page">
//       <div ref={mapContainerRef} className="map-container" style={{ height: "100vh", width: "100%" }} />
//       <Toolbar drawRef={drawRef} mapRef={mapRef} />
//       <TreeComponent />
//       <AreaAndLengthsDisplay area={area} lengths={sideLengths} />
//       {showRegulatoryForm && <RegulatoryForm />}
//     </div>
//   );
// };

// export default SiteMap;


// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import * as turf from '@turf/turf';  // Import Turf.js for geometry calculations
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Toolbar from '../components/Toolbar';
// import TreeComponent from '../drawing/TreeComponent';
// import RegulatoryForm from '../pages/RegulatoryForm';
// import '../style/MapPage.css';  // Import your custom styles
// import { supabase } from '../auth/supabaseClient'; // Adjust the import path as needed

// mapboxgl.accessToken = 'pk.eyJ1IjoicmFteWFrYW50IiwiYSI6ImNtMXViZDJyaDBhdHAycnM1OXh6Y2VhYncifQ.m3pXYCrfAAj0Ojt-jb0Gyw';

// const SiteMap = () => {
//   const [polygonCoords, setPolygonCoords] = useState([]);
//   const [trees, setTrees] = useState([]);
//   const [area, setArea] = useState(null);
//   const [sideLengths, setSideLengths] = useState([]);
//   const [showRegulatoryForm, setShowRegulatoryForm] = useState(false);
//   const [step, setStep] = useState(1);  // Track the current step for toolbar control
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const drawRef = useRef(null);
//   const polygonRef = useRef(null);
//   const lengthMarkersRef = useRef([]);

//   useEffect(() => {
//     if (!mapContainerRef.current) return;

//     // Initialize the map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [72.8777, 19.0760],
//       zoom: 18,
//     });

//     // Initialize Mapbox Draw
//     drawRef.current = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         polygon: true,
//         trash: true,
//       }
//     });
//     mapRef.current.addControl(drawRef.current);

//     // Initialize Mapbox Geocoder
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//     });
//     mapRef.current.addControl(geocoder);

//     geocoder.on('result', (event) => {
//       const { text, center } = event.result;
//       const [lng, lat] = center;
//       saveSearchLocation(text, lng, lat);
//     });

//     // Capture polygon creation event
//     mapRef.current.on('draw.create', (e) => {
//       const polygon = e.features[0];
//       const coords = polygon.geometry.coordinates[0];
//       setPolygonCoords(coords);
//       polygonRef.current = polygon;

//       // Calculate area and side lengths
//       calculateAreaAndLengths(coords);

//       // Save polygon and side lengths to Supabase
//       savePolygon(coords, area, sideLengths);
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const savePolygon = async (coords, area, lengths) => {
//     try {
//       const { data: polygonData, error: polygonError } = await supabase
//         .from('polygons')
//         .insert([{ coordinates: coords, area }])
//         .select();
      
//       if (polygonError) throw polygonError;
//       const polygonId = polygonData[0].id;

//       const sideLengthData = lengths.map(length => ({
//         polygon_id: polygonId,
//         length: length.length,
//         midpoint: length.midpoint,
//       }));
      
//       const { error: sideLengthsError } = await supabase
//         .from('side_lengths')
//         .insert(sideLengthData);

//       if (sideLengthsError) throw sideLengthsError;

//       console.log('Polygon and side lengths saved successfully!');
//     } catch (error) {
//       console.error('Error saving polygon and side lengths:', error);
//     }
//   };

//   const saveTree = async (polygonId, tree) => {
//     try {
//       const { error } = await supabase
//         .from('trees')
//         .insert([{ polygon_id: polygonId, lng: tree.lng, lat: tree.lat }]);
      
//       if (error) throw error;

//       console.log('Tree saved successfully!');
//     } catch (error) {
//       console.error('Error saving tree:', error);
//     }
//   };

//   const saveSearchLocation = async (query, lng, lat) => {
//     try {
//       const { error } = await supabase
//         .from('search_locations')
//         .insert([{ query, lng, lat }]);
      
//       if (error) throw error;

//       console.log('Search location saved successfully!');
//     } catch (error) {
//       console.error('Error saving search location:', error);
//     }
//   };

//   const calculateAreaAndLengths = (coords) => {
//     const polygon = turf.polygon([coords]);
//     const calculatedArea = turf.area(polygon);
//     setArea(calculatedArea);

//     const lengths = coords.slice(0, -1).map((start, i) => {
//       const end = coords[i + 1];
//       const line = turf.lineString([start, end]);
//       return {
//         length: turf.length(line, { units: 'meters' }),
//         midpoint: turf.midpoint(turf.point(start), turf.point(end)).geometry.coordinates
//       };
//     });
//     setSideLengths(lengths);

//     // Remove existing length markers
//     lengthMarkersRef.current.forEach(marker => marker.remove());
//     lengthMarkersRef.current = [];

//     // Add length markers to the map
//     lengths.forEach(({ length, midpoint }) => {
//       const el = document.createElement('div');
//       el.className = 'length-marker';
//       el.innerText = `${length.toFixed(2)} m`;

//       const marker = new mapboxgl.Marker({ element: el })
//         .setLngLat(midpoint)
//         .addTo(mapRef.current);

//       lengthMarkersRef.current.push(marker);
//     });
//   };

//   const handlePlantTree = useCallback((lngLat) => {
//     if (polygonCoords.length > 0) {
//       const newTree = { lng: lngLat.lng, lat: lngLat.lat };
//       setTrees((prevTrees) => [...prevTrees, newTree]);

//       // Add tree marker to the map
//       new mapboxgl.Marker({ color: 'green' })
//         .setLngLat([lngLat.lng, lngLat.lat])
//         .addTo(mapRef.current);

//       // Save tree to Supabase
//       saveTree(polygonRef.current.id, newTree);
//     }
//   }, [polygonCoords]);

//   // Check if a point is inside the polygon
//   const isPointInPolygon = (point) => {
//     const [lng, lat] = point;
//     const inside = require('point-in-polygon');
//     return inside([lng, lat], polygonCoords);
//   };

//   const handleMapClick = (event) => {
//     const { lng, lat } = event.lngLat;
//     if (polygonCoords.length > 0 && isPointInPolygon([lng, lat])) {
//       handlePlantTree({ lng, lat });
//     } else {
//       // alert("Click inside the polygon to plant a tree.");
//     }
//   };

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.on('click', handleMapClick);
//     }
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.off('click', handleMapClick);
//       }
//     };
//   }, [polygonCoords]);

//   const AreaAndLengthsDisplay = ({ area, lengths }) => (
//     <div className="area-lengths-display">
//       <h3>Polygon Information</h3>
//       {area && <p>Area: {area.toFixed(2)} square meters</p>}
//       {lengths.length > 0 && (
//         <ul>
//           {lengths.map(({ length }, index) => (
//             <li key={index}>Length of side {index + 1}: {length.toFixed(2)} meters</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );

//   return (
//     <div className="map-page">
//       <div ref={mapContainerRef} className="map-container" style={{ height: "100vh", width: "100%" }} />
//       <Toolbar drawRef={drawRef} mapRef={mapRef} step={step} setStep={setStep} />
//       <TreeComponent />
//       <AreaAndLengthsDisplay area={area} lengths={sideLengths} />
//       {showRegulatoryForm && <RegulatoryForm />}
//     </div>
//   );
// };

// export default SiteMap;
import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as turf from '@turf/turf';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Toolbar from '../components/Toolbar';
import RegulatoryForm from '../pages/RegulatoryForm';
import '../style/MapPage.css';

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicmFteWFrYW50IiwiYSI6ImNtMXViZDJyaDBhdHAycnM1OXh6Y2VhYncifQ.m3pXYCrfAAj0Ojt-jb0Gyw';

const SiteMap = () => {
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [trees, setTrees] = useState([]);
  const [area, setArea] = useState(null);
  const [sideLengths, setSideLengths] = useState([]);
  const [showRegulatoryForm, setShowRegulatoryForm] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const polygonRef = useRef(null);
  const lengthMarkersRef = useRef([]);

  // Initialize map and drawing tools
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [72.8777, 19.0760], // Mumbai coordinates as an example
        zoom: 18,
      });

      // Initialize Mapbox Draw
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
      mapRef.current.addControl(drawRef.current);

      // Initialize Geocoder
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });
      mapRef.current.addControl(geocoder);

      geocoder.on('result', async (event) => {
        const { text, center } = event.result;
        const [lng, lat] = center;

        try {
          const response = await fetch('POST http://localhost:5001/api/map/search-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text, lng, lat })
          });

          if (!response.ok) {
            throw new Error('Failed to save search location');
          }

          console.log('Search location saved successfully!');
        } catch (error) {
          console.error('Error saving search location:', error);
        }
      });

      // Handle polygon draw
      mapRef.current.on('draw.create', async (e) => {
        const polygon = e.features[0];
        const coords = polygon.geometry.coordinates[0];
        setPolygonCoords(coords);
        polygonRef.current = polygon;

        calculateAreaAndLengths(coords);

        // Ensure polygonRef.current is valid before making API request
        if (!polygonRef.current || !polygonRef.current.id) {
          console.error('Polygon ID is not available');
          return;
        }

        try {
          const response = await fetch('POST http://localhost:5001/api/map/polygon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              coordinates: coords,
              area,
              sideLengths,
              trees // Include trees in the request body
            })
          });

          if (!response.ok) {
            throw new Error('Failed to save polygon');
          }

          const result = await response.json();
          console.log('Polygon saved successfully!', result.polygon);
        } catch (error) {
          console.error('Error saving polygon:', error);
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [area, sideLengths, trees]);

  // Calculate area and side lengths of the drawn polygon
  const calculateAreaAndLengths = (coords) => {
    const polygon = turf.polygon([coords]);
    const calculatedArea = turf.area(polygon);
    setArea(calculatedArea);

    const lengths = coords.slice(0, -1).map((start, i) => {
      const end = coords[i + 1];
      const line = turf.lineString([start, end]);
      return {
        length: turf.length(line, { units: 'meters' }),
        midpoint: turf.midpoint(turf.point(start), turf.point(end)).geometry.coordinates
      };
    });
    setSideLengths(lengths);

    // Remove previous markers
    lengthMarkersRef.current.forEach(marker => marker.remove());
    lengthMarkersRef.current = [];

    // Add new markers for the lengths
    lengths.forEach(({ length, midpoint }) => {
      const el = document.createElement('div');
      el.className = 'length-marker';
      el.innerText = `${length.toFixed(2)} m`;

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(midpoint)
        .addTo(mapRef.current);

      lengthMarkersRef.current.push(marker);
    });
  };

  // Add a tree marker on the map
  const addTree = async (lng, lat) => {
    if (!polygonRef.current || !polygonRef.current.id) {
      console.error('Polygon is not valid');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/map/tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ polygonId: polygonRef.current.id, lng, lat })
      });

      if (!response.ok) {
        throw new Error('Failed to save tree');
      }

      const result = await response.json();
      console.log(result.message);
      setTrees([...trees, { lng, lat }]);
    } catch (error) {
      console.error('Error adding tree:', error);
    }
  };

  return (
    <div>
      {/* Map container with height and width */}
      <div className="map-container" ref={mapContainerRef}></div>

      {/* Toolbar for adding trees and showing regulatory form */}
      <Toolbar onAddTree={addTree} onShowRegulatoryForm={() => setShowRegulatoryForm(true)} />

      {/* Show regulatory form when required */}
      {showRegulatoryForm && <RegulatoryForm />}
    </div>
  );
};

export default SiteMap;

