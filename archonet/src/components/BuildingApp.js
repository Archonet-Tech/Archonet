// import React, { useState } from 'react';
// import BuildingInputForm from './BuildingInputForm';  // Your form component
// import ThreeBuildingModel from './ThreeBuildingModel';  // Your 3D building model component

// const BuildingApp = () => {
//   const [buildingInput, setBuildingInput] = useState(null);  // To store the form input

//   const handleBuildingInputSubmit = (inputData) => {
//     console.log("Building Input Data:", inputData);  // Check if form data is correct
//     setBuildingInput(inputData);  // Set the input data for the building
//   };

//   return (
//     <div>
//       {/* Form for collecting building input */}
//       <BuildingInputForm onSubmit={handleBuildingInputSubmit} />

//       {/* Conditional rendering of the Three.js model based on form input */}
//       {buildingInput && (
//         <ThreeBuildingModel buildingInput={buildingInput} />  // Render the model after form submission
//       )}
//     </div>
//   );
// };

// export default BuildingApp;
