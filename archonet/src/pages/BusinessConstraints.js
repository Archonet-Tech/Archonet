
// import React, { useState } from 'react';
// import '../style/BusinessConstraints.css';
// import InputSummary from './InputSummary'; // Importing the InputSummary component

// const BusinessConstraints = ({ onPrevious }) => {
//   const [showInputSummary, setShowInputSummary] = useState(false); // State to manage visibility of the InputSummary component

//   const handleContinue = () => {
//     setShowInputSummary(true); // Show the InputSummary component
//   };

//   return showInputSummary ? (
//     <InputSummary onPrevious={() => setShowInputSummary(false)} /> // Render InputSummary if true
//   ) : (
//     <div className="form-overlay">
//       <div className="form-container">
//         <div className="form-header">
//           <h2>Business Constraints</h2>
//           <button className="close-button">&times;</button> {/* Close button */}
//         </div>
//         <form>
//           <fieldset>
//             <legend>Product Mix</legend>
//             <div className="form-group">
//               <label>
//                 <input type="checkbox" checked readOnly />
//                 Residential
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 Commercial
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 Hospitality
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 Mixed Use
//               </label>
//             </div>
//           </fieldset>
//           <fieldset>
//             <legend>Unit Mix (Residential)</legend>
//             <div className="form-group">
//               <div className="unit-group">
//                 <label>Studio Apartment</label>
//                 <div className="input-group">
//                   <input type="text" value="50%" readOnly />
//                   <input type="text" value="500 sq.ft" readOnly />
//                   <input type="text" value="0.25 per unit" readOnly />
//                 </div>
//               </div>
//               <div className="unit-group">
//                 <label>1 BHK Apartment</label>
//                 <div className="input-group">
//                   <input type="text" value="20%" readOnly />
//                   <input type="text" value="750 sq.ft" readOnly />
//                   <input type="text" value="0.5 per unit" readOnly />
//                 </div>
//               </div>
//               <div className="unit-group">
//                 <label>2 BHK Apartment</label>
//                 <div className="input-group">
//                   <input type="text" value="25%" readOnly />
//                   <input type="text" value="1,000 sq.ft" readOnly />
//                   <input type="text" value="1 per unit" readOnly />
//                 </div>
//               </div>
//               <div className="unit-group">
//                 <label>3 BHK Apartment</label>
//                 <div className="input-group">
//                   <input type="text" value="5%" readOnly />
//                   <input type="text" value="1,250 sq.ft" readOnly />
//                   <input type="text" value="1 per unit" readOnly />
//                 </div>
//               </div>
//               <button type="button" className="add-more-button">+ Add More</button> {/* Placeholder for adding more units */}
//             </div>
//           </fieldset>
//           <fieldset>
//             <legend>Parking Location</legend>
//             <div className="form-group">
//               <label>
//                 <input type="checkbox" />
//                 Podium
//               </label>
//               <label>
//                 <input type="checkbox" checked readOnly />
//                 Basement
//               </label>
//             </div>
//           </fieldset>
//           <div className="form-actions">
//             <button type="button" onClick={onPrevious}>Previous</button> {/* Previous button */}
//             <button type="button" onClick={handleContinue}>Continue</button> {/* Continue button to go to InputSummary */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BusinessConstraints;

import React, { useState } from 'react';
import '../style/BusinessConstraints.css';
import InputSummary from './InputSummary'; // Importing the InputSummary component

const BusinessConstraints = ({ onPrevious }) => {
  const [showInputSummary, setShowInputSummary] = useState(false); // State to manage visibility of InputSummary component

  // State to track form input values for business constraints
  const [formData, setFormData] = useState({
    productMix: {
      residential: true,
      commercial: false,
      hospitality: false,
      mixedUse: false,
    },
    unitMix: {
      studio: { percentage: "50%", area: "500 sq.ft", efficiency: "0.25 per unit" },
      oneBHK: { percentage: "20%", area: "750 sq.ft", efficiency: "0.5 per unit" },
      twoBHK: { percentage: "25%", area: "1,000 sq.ft", efficiency: "1 per unit" },
      threeBHK: { percentage: "5%", area: "1,250 sq.ft", efficiency: "1 per unit" }
    },
    parkingLocation: {
      podium: false,
      basement: true
    }
  });

  // Handle checkbox and input changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      productMix: {
        ...formData.productMix,
        [name]: checked,
      }
    });
  };

  const handleUnitMixChange = (e, unitType, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      unitMix: {
        ...formData.unitMix,
        [unitType]: {
          ...formData.unitMix[unitType],
          [field]: value,
        }
      }
    });
  };

  const handleParkingChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      parkingLocation: {
        ...formData.parkingLocation,
        [name]: checked
      }
    });
  };

  const handleContinue = () => {
    // Continue to the next step
    setShowInputSummary(true);
  };

  return showInputSummary ? (
    <InputSummary onPrevious={() => setShowInputSummary(false)} formData={formData} /> // Pass form data to InputSummary component
  ) : (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>Business Constraints</h2>
          <button className="close-button">&times;</button>
        </div>
        <form>
          {/* Product Mix Fields */}
          <fieldset>
            <legend>Product Mix</legend>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="residential"
                  checked={formData.productMix.residential}
                  onChange={handleCheckboxChange}
                />
                Residential
              </label>
              <label>
                <input
                  type="checkbox"
                  name="commercial"
                  checked={formData.productMix.commercial}
                  onChange={handleCheckboxChange}
                />
                Commercial
              </label>
              <label>
                <input
                  type="checkbox"
                  name="hospitality"
                  checked={formData.productMix.hospitality}
                  onChange={handleCheckboxChange}
                />
                Hospitality
              </label>
              <label>
                <input
                  type="checkbox"
                  name="mixedUse"
                  checked={formData.productMix.mixedUse}
                  onChange={handleCheckboxChange}
                />
                Mixed Use
              </label>
            </div>
          </fieldset>

          {/* Unit Mix Fields */}
          <fieldset>
            <legend>Unit Mix (Residential)</legend>
            <div className="form-group">
              <div className="unit-group">
                <label>Studio Apartment</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={formData.unitMix.studio.percentage}
                    onChange={(e) => handleUnitMixChange(e, 'studio', 'percentage')}
                  />
                  <input
                    type="text"
                    value={formData.unitMix.studio.area}
                    onChange={(e) => handleUnitMixChange(e, 'studio', 'area')}
                  />
                  <input
                    type="text"
                    value={formData.unitMix.studio.efficiency}
                    onChange={(e) => handleUnitMixChange(e, 'studio', 'efficiency')}
                  />
                </div>
              </div>
              {/* Repeat similar blocks for other unit types (1 BHK, 2 BHK, etc.) */}
            </div>
          </fieldset>

          {/* Parking Location Fields */}
          <fieldset>
            <legend>Parking Location</legend>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="podium"
                  checked={formData.parkingLocation.podium}
                  onChange={handleParkingChange}
                />
                Podium
              </label>
              <label>
                <input
                  type="checkbox"
                  name="basement"
                  checked={formData.parkingLocation.basement}
                  onChange={handleParkingChange}
                />
                Basement
              </label>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="button" onClick={onPrevious}>Previous</button>
            <button type="button" onClick={handleContinue}>Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessConstraints;
