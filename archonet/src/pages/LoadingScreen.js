import React from 'react';
import '../style/LoadingScreen.css';
import logo from '../image/archonetlogo.png'; // Import the image

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="overlay">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" /> {/* Use the imported image */}
        </div>
        <p className="loading-text">
          Sit tight while our Real Estate AI prepares the optimized options...
        </p>
        <div className="loading-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
