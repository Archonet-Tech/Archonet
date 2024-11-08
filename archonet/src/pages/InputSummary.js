
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import for navigation
// import LoadingScreen from './LoadingScreen'; // Import the loading screen component
// import '../style/InputSummary.css'; // Import styles

// const InputSummary = ({ onPrevious }) => {
//   const [isLoading, setIsLoading] = useState(false); // Manage loading state
//   const navigate = useNavigate(); // Use navigate to change route

//   const handleGenerateClick = () => {
//     setIsLoading(true); // Show loading screen
//     // Simulate an API call or process
//     setTimeout(() => {
//       setIsLoading(false); 
//       // After loading is complete, navigate to the 3D map page
//       navigate('/3d-building');
//     }, 3000); // Simulate a 3-second loading duration
//   };

//   return (
//     <>
//       {isLoading ? ( 
//         <LoadingScreen /> // Display loading screen during loading
//       ) : (
//         <div className="form-overlay">
//           <div className="form-container">
//             <div className="form-header">
//               <h2>Input Summary</h2>
//               <button className="close-button">&times;</button>
//             </div>
//             <div className="summary-section">
//               <h3>Site Constraints</h3>
//               <div className="summary-row">
//                 <label>Location:</label>
//                 <span>Location, City, Country</span>
//               </div>
//               <div className="summary-row">
//                 <label>Plot Area:</label>
//                 <span>160,000 sq.ft</span>
//               </div>
//               <div className="summary-row">
//                 <label>Developable Area:</label>
//                 <span>78,840 sq.ft</span>
//               </div>

//               <h3>Regulatory Constraints</h3>
//               <div className="summary-row">
//                 <label>Max BUA:</label>
//                 <span>360,000 sq.ft</span>
//               </div>
//               <div className="summary-row">
//                 <label>Max Height:</label>
//                 <span>50 m</span>
//               </div>
//               <div className="summary-row">
//                 <label>Min Ground Open Space:</label>
//                 <span>20%</span>
//               </div>

//               <h3>Business Constraints</h3>
//               <div className="summary-row">
//                 <label>Primary Use:</label>
//                 <span>Residential Only</span>
//               </div>
//               <div className="summary-row">
//                 <label>Unit Mix:</label>
//                 <span>
//                   Studios: 50% | 500 sq.ft, 1 BHK: 20% | 750 sq.ft, 2 BHK: 25% | 1,000 sq.ft, 3 BHK: 5% | 1,250 sq.ft
//                 </span>
//               </div>
//               <div className="summary-row">
//                 <label>Parking Type:</label>
//                 <span>Basement Only</span>
//               </div>

//               <div className="summary-row">
//                 <label># of Options to be Generated:</label>
//                 <span>3 Options</span>
//               </div>
//             </div>
//             <div className="form-actions">
//               <button type="button" onClick={onPrevious}>Previous</button>
//               <button type="button" onClick={handleGenerateClick}>Generate</button> {/* Trigger loading */}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default InputSummary;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen'; // Import the loading screen component
import '../style/InputSummary.css'; // Import styles

const InputSummary = ({ onPrevious, formData }) => {
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const navigate = useNavigate(); // Use navigate to change route

  const handleGenerateClick = () => {
    setIsLoading(true); // Show loading screen
    // Simulate an API call or process
    setTimeout(() => {
      setIsLoading(false); 
      navigate('/3d-building'); // After loading is complete, navigate to the 3D map page
    }, 3000); // Simulate a 3-second loading duration
  };

  return (
    <>
      {isLoading ? ( 
        <LoadingScreen /> // Display loading screen during loading
      ) : (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Input Summary</h2>
              <button className="close-button">&times;</button>
            </div>

            <div className="summary-section">
              <h3>Site Constraints</h3>
              {/* Hardcoded sample data for Site Constraints */}
              <div className="summary-row">
                <label>Location:</label>
                <span>Location, City, Country</span>
              </div>
              <div className="summary-row">
                <label>Plot Area:</label>
                <span>160,000 sq.ft</span>
              </div>

              <h3>Business Constraints</h3>
              <div className="summary-row">
                <label>Product Mix:</label>
                <span>
                  {formData.productMix.residential && 'Residential '}
                  {formData.productMix.commercial && 'Commercial '}
                  {formData.productMix.hospitality && 'Hospitality '}
                  {formData.productMix.mixedUse && 'Mixed Use'}
                </span>
              </div>
              <div className="summary-row">
                <label>Unit Mix:</label>
                <span>
                  Studio: {formData.unitMix.studio.percentage}, {formData.unitMix.studio.area} | 
                  1 BHK: {formData.unitMix.oneBHK.percentage}, {formData.unitMix.oneBHK.area} |
                  2 BHK: {formData.unitMix.twoBHK.percentage}, {formData.unitMix.twoBHK.area}
                </span>
              </div>
              <div className="summary-row">
                <label>Parking Location:</label>
                <span>
                  {formData.parkingLocation.podium && 'Podium '}
                  {formData.parkingLocation.basement && 'Basement '}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onPrevious}>Previous</button>
              <button type="button" onClick={handleGenerateClick}>Generate</button> {/* Trigger loading */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InputSummary;
