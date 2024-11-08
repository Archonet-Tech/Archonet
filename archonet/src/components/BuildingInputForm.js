// import React, { useState } from 'react';

// const BuildingInputForm = ({ onSubmit }) => {
//   const [dimensions, setDimensions] = useState({ height: 50, width: 30, depth: 20 });
//   const [floors, setFloors] = useState({ number: 5, height: 3 });
//   const [materials, setMaterials] = useState({ walls: 'concrete', roof: 'tile' });
//   const [windows, setWindows] = useState({ dimensions: { width: 1.2, height: 1.5 }, type: 'sliding', quantity: 10 });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDimensions((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFloorsChange = (e) => {
//     const { name, value } = e.target;
//     setFloors((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMaterialsChange = (e) => {
//     const { name, value } = e.target;
//     setMaterials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleWindowsChange = (e) => {
//     const { name, value } = e.target;
//     setWindows((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const buildingInput = { dimensions, floors, materials, windows };
//     onSubmit(buildingInput);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Building Input Form</h2>
//       <div>
//         <h3>Dimensions</h3>
//         <label>Height (m):
//           <input type="number" name="height" value={dimensions.height} onChange={handleInputChange} />
//         </label>
//         <label>Width (m):
//           <input type="number" name="width" value={dimensions.width} onChange={handleInputChange} />
//         </label>
//         <label>Depth (m):
//           <input type="number" name="depth" value={dimensions.depth} onChange={handleInputChange} />
//         </label>
//       </div>

//       <div>
//         <h3>Floors</h3>
//         <label>Number:
//           <input type="number" name="number" value={floors.number} onChange={handleFloorsChange} />
//         </label>
//         <label>Height (m):
//           <input type="number" name="height" value={floors.height} onChange={handleFloorsChange} />
//         </label>
//       </div>

//       <div>
//         <h3>Materials</h3>
//         <label>Wall Material:
//           <input type="text" name="walls" value={materials.walls} onChange={handleMaterialsChange} />
//         </label>
//         <label>Roof Material:
//           <input type="text" name="roof" value={materials.roof} onChange={handleMaterialsChange} />
//         </label>
//       </div>

//       <div>
//         <h3>Windows</h3>
//         <label>Window Width (m):
//           <input type="number" name="width" value={windows.dimensions.width} onChange={handleWindowsChange} />
//         </label>
//         <label>Window Height (m):
//           <input type="number" name="height" value={windows.dimensions.height} onChange={handleWindowsChange} />
//         </label>
//         <label>Window Type:
//           <input type="text" name="type" value={windows.type} onChange={handleWindowsChange} />
//         </label>
//         <label>Window Quantity:
//           <input type="number" name="quantity" value={windows.quantity} onChange={handleWindowsChange} />
//         </label>
//       </div>

//       <button type="submit">Create Building</button>
//     </form>
//   );
// };

// export default BuildingInputForm;


// BuildingInputForm.js
import React, { useState } from 'react';
import '../style/BuildingInputForm.css'; // Import the CSS file for styles

const BuildingInputForm = ({ onSubmit }) => {
  const [dimensions, setDimensions] = useState({ height: 50, width: 30, depth: 20 });
  const [floors, setFloors] = useState({ number: 5, height: 3 });
  const [materials, setMaterials] = useState({ walls: 'concrete', roof: 'tile' });
  const [windows, setWindows] = useState({ dimensions: { width: 1.2, height: 1.5 }, type: 'sliding', quantity: 10 });
  const [errors, setErrors] = useState({}); // State for form validation errors

  const validateForm = () => {
    const newErrors = {};

    // Validation rules
    if (dimensions.height <= 0) newErrors.height = 'Height must be greater than 0.';
    if (dimensions.width <= 0) newErrors.width = 'Width must be greater than 0.';
    if (dimensions.depth <= 0) newErrors.depth = 'Depth must be greater than 0.';
    if (floors.number <= 0) newErrors.floors = 'Number of floors must be at least 1.';
    if (windows.quantity < 0) newErrors.windows = 'Window quantity cannot be negative.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleFloorsChange = (e) => {
    const { name, value } = e.target;
    setFloors((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleMaterialsChange = (e) => {
    const { name, value } = e.target;
    setMaterials((prev) => ({ ...prev, [name]: value }));
  };

  const handleWindowsChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setWindows((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setWindows((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [name]: parseFloat(value) },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const buildingInput = { dimensions, floors, materials, windows };
      onSubmit(buildingInput); // Send form data to parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="building-input-form">
      <h2>Building Input Form</h2>

      {/* Dimensions */}
      <div>
        <h3>Dimensions</h3>
        <label>Height (m):
          <input type="number" name="height" value={dimensions.height} onChange={handleInputChange} />
          {errors.height && <span className="error">{errors.height}</span>}
        </label>
        <label>Width (m):
          <input type="number" name="width" value={dimensions.width} onChange={handleInputChange} />
          {errors.width && <span className="error">{errors.width}</span>}
        </label>
        <label>Depth (m):
          <input type="number" name="depth" value={dimensions.depth} onChange={handleInputChange} />
          {errors.depth && <span className="error">{errors.depth}</span>}
        </label>
      </div>

      {/* Floors */}
      <div>
        <h3>Floors</h3>
        <label>Number:
          <input type="number" name="number" value={floors.number} onChange={handleFloorsChange} />
          {errors.floors && <span className="error">{errors.floors}</span>}
        </label>
        <label>Height per Floor (m):
          <input type="number" name="height" value={floors.height} onChange={handleFloorsChange} />
        </label>
      </div>

      {/* Materials */}
      <div>
        <h3>Materials</h3>
        <label>Wall Material:
          <input type="text" name="walls" value={materials.walls} onChange={handleMaterialsChange} />
        </label>
        <label>Roof Material:
          <input type="text" name="roof" value={materials.roof} onChange={handleMaterialsChange} />
        </label>
      </div>

      {/* Windows */}
      <div>
        <h3>Windows</h3>
        <label>Window Width (m):
          <input type="number" name="width" value={windows.dimensions.width} onChange={handleWindowsChange} />
        </label>
        <label>Window Height (m):
          <input type="number" name="height" value={windows.dimensions.height} onChange={handleWindowsChange} />
        </label>
        <label>Window Type:
          <input type="text" name="type" value={windows.type} onChange={handleWindowsChange} />
        </label>
        <label>Window Quantity:
          <input type="number" name="quantity" value={windows.quantity} onChange={handleWindowsChange} />
          {errors.windows && <span className="error">{errors.windows}</span>}
        </label>
      </div>

      <button type="submit" className="submit-button">Create Building</button>
    </form>
  );
};

export default BuildingInputForm;
