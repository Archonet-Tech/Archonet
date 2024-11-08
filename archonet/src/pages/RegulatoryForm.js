// import React, { useState } from 'react';
// import '../style/RegulatoryForm.css';
// import BusinessConstraints from '../pages/BusinessConstraints'; // Importing the BusinessConstraints component

// const RegulatoryForm = ({ onClose }) => {
//   const [showBusinessConstraints, setShowBusinessConstraints] = useState(false); // State to manage visibility of the BusinessConstraints component

//   const handleContinue = () => {
//     setShowBusinessConstraints(true); // Show the BusinessConstraints component
//   };

//   const handlePrevious = () => {
//     setShowBusinessConstraints(false); // Hide the BusinessConstraints component
//   };

//   return showBusinessConstraints ? (
//     <BusinessConstraints onClose={onClose} onPrevious={handlePrevious} /> // Render BusinessConstraints if true
//   ) : (
//     <div className="form-overlay">
//       <div className="form-container">
//         <div className="form-header">
//           <h2>Regulatory Constraints</h2>
//           <button className="close-button" onClick={onClose}>&times;</button> {/* Close button */}
//         </div>
//         <form>
//           <fieldset>
//             <legend>Setbacks</legend>
//             <div className="form-group">
//               <label>Front Setbacks</label>
//               <div className="input-group">
//                 <label>Super-structure*</label>
//                 <input type="text" value="6 m" readOnly />
//                 <label>Sub-structure*</label>
//                 <input type="text" value="3 m" readOnly />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Side Setbacks</label>
//               <div className="input-group">
//                 <label>Super-structure*</label>
//                 <input type="text" value="3 m" readOnly />
//                 <label>Sub-structure*</label>
//                 <input type="text" value="1.5 m" readOnly />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Non-Developable Area Setbacks</label>
//               <div className="input-group">
//                 <label>Super-structure*</label>
//                 <input type="text" value="3 m" readOnly />
//                 <label>Sub-structure*</label>
//                 <input type="text" value="3 m" readOnly />
//               </div>
//             </div>
//           </fieldset>

//           <fieldset>
//             <legend>Height & Ground Open Space</legend>
//             <div className="form-group">
//               <label>Extreme Constraints</label>
//               <div className="input-group">
//                 <label>Maximum Height*</label>
//                 <input type="text" value="50 m" readOnly />
//                 <label>Minimum Ground Open Space*</label>
//                 <input type="text" value="20%" readOnly />
//               </div>
//             </div>
//           </fieldset>

//           <fieldset>
//             <legend>Built-Up Area</legend>
//             <div className="form-group">
//               <label>Maximum Permissible BUA</label>
//               <div className="input-group">
//                 <input type="text" value="360,000 sq.ft" readOnly />
//               </div>
//             </div>
//           </fieldset>

//           <div className="form-actions">
//             <button type="button" onClick={onClose}>Previous</button>
//             <button type="button" onClick={handleContinue}>Continue</button> {/* Continue button to go to the next component */}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegulatoryForm;

import React, { useState } from 'react';
import '../style/RegulatoryForm.css';
import BusinessConstraints from '../pages/BusinessConstraints'; // Importing the BusinessConstraints component

const RegulatoryForm = ({ onClose }) => {
  const [showBusinessConstraints, setShowBusinessConstraints] = useState(false); // State to manage visibility of BusinessConstraints component
  const [formData, setFormData] = useState({
    frontSuper: "6 m",
    frontSub: "3 m",
    sideSuper: "3 m",
    sideSub: "1.5 m",
    nonDevelopableSuper: "3 m",
    nonDevelopableSub: "3 m",
    maxHeight: "50 m",
    minGroundOpenSpace: "20%",
    maxBUA: "360,000 sq.ft"
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle continue button click
  const handleContinue = () => {
    setShowBusinessConstraints(true); // Show BusinessConstraints component
  };

  const handlePrevious = () => {
    setShowBusinessConstraints(false); // Hide BusinessConstraints component
  };

  return showBusinessConstraints ? (
    <BusinessConstraints onClose={onClose} onPrevious={handlePrevious} /> // Render BusinessConstraints if true
  ) : (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>Regulatory Constraints</h2>
          <button className="close-button" onClick={onClose}>&times;</button> {/* Close button */}
        </div>
        <form>
          <fieldset>
            <legend>Setbacks</legend>
            <div className="form-group">
              <label>Front Setbacks</label>
              <div className="input-group">
                <label>Super-structure*</label>
                <input
                  type="text"
                  name="frontSuper"
                  value={formData.frontSuper}
                  onChange={handleChange} // Update value based on user input
                />
                <label>Sub-structure*</label>
                <input
                  type="text"
                  name="frontSub"
                  value={formData.frontSub}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Side Setbacks</label>
              <div className="input-group">
                <label>Super-structure*</label>
                <input
                  type="text"
                  name="sideSuper"
                  value={formData.sideSuper}
                  onChange={handleChange}
                />
                <label>Sub-structure*</label>
                <input
                  type="text"
                  name="sideSub"
                  value={formData.sideSub}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Non-Developable Area Setbacks</label>
              <div className="input-group">
                <label>Super-structure*</label>
                <input
                  type="text"
                  name="nonDevelopableSuper"
                  value={formData.nonDevelopableSuper}
                  onChange={handleChange}
                />
                <label>Sub-structure*</label>
                <input
                  type="text"
                  name="nonDevelopableSub"
                  value={formData.nonDevelopableSub}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Height & Ground Open Space</legend>
            <div className="form-group">
              <label>Extreme Constraints</label>
              <div className="input-group">
                <label>Maximum Height*</label>
                <input
                  type="text"
                  name="maxHeight"
                  value={formData.maxHeight}
                  onChange={handleChange}
                />
                <label>Minimum Ground Open Space*</label>
                <input
                  type="text"
                  name="minGroundOpenSpace"
                  value={formData.minGroundOpenSpace}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Built-Up Area</legend>
            <div className="form-group">
              <label>Maximum Permissible BUA</label>
              <div className="input-group">
                <input
                  type="text"
                  name="maxBUA"
                  value={formData.maxBUA}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Previous</button>
            <button type="button" onClick={handleContinue}>Continue</button> {/* Continue button */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegulatoryForm;
