import React from 'react';

const AreaAndLengthsDisplay = ({ area, sideLengths, polygonCoords }) => {
  return (
    <div>
      <h4>Area: {area} sq. meters</h4>
      <h4>Side Lengths:</h4>
      <ul>
        {sideLengths.map((length, index) => (
          <li key={index}>{length} meters</li>
        ))}
      </ul>
    </div>
  );
};

export default AreaAndLengthsDisplay;
