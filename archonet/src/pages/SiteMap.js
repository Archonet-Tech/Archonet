// // src/SiteMap.js
// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import '../style/SiteMap.css'; // Custom CSS for the SiteMap

// import L from 'leaflet';

// // Leaflet default icon workaround
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
//   iconUrl: 'leaflet/dist/images/marker-icon.png',
//   shadowUrl: 'leaflet/dist/images/marker-shadow.png',
// });

// const SiteMap = () => {
//   return (
//     <div className="map-page">
//       <header className="map-header">
//         <input type="text" placeholder="Search Project Location" className="search-bar" />
//         <button className="search-close-btn">X</button>
//       </header>
//       <aside className="map-sidebar">
//         <button className="sidebar-btn">
//           <img src="/path/to/logo1.png" alt="Logo 1" />
//         </button>
//         <button className="sidebar-btn">
//           <img src="/path/to/logo2.png" alt="Logo 2" />
//         </button>
//         {/* Add more buttons with logos as needed */}
//       </aside>
//       <MapContainer center={[20, 0]} zoom={2} className="map-container">
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {/* Add Markers here */}
//         <Marker position={[20, 0]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//       <button className="continue-btn">Continue</button>
//     </div>
//   );
// };

// export default SiteMap;
