import React from 'react';
import '../style/TreeComponent.css';

const TreeComponent = ({ onSetDrawingMode }) => {
  return (
    <div className="tree-info">
      <h3>Tree Planting Tool</h3>
      <p>Select areas on the map to plant trees.</p>
      <button onClick={() => onSetDrawingMode('tree')}>Plant a Tree</button>
    </div>
  );
};

export default TreeComponent;
