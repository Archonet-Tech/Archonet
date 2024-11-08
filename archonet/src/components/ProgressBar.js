import React from 'react';
import '../style/ProgressBar.css';

const CustomProgressBar = ({ currentStep, setCurrentStep }) => {
  const steps = [
    'New Project',
    'Site Constraints',
    'Other Constraints',
    'Input Summary',
    'Design Output'
  ];

  // Click handler to allow users to go directly to a specific step
  const handleStepClick = (index) => {
    // Only allow navigation to previous or current steps
    if (index <= currentStep) {
      setCurrentStep(index); // Update step when clicked
    }
  };

  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`step ${index <= currentStep ? 'completed' : ''}`}
            onClick={() => handleStepClick(index)}
            style={{ cursor: index <= currentStep ? 'pointer' : 'default' }} // Only make past steps clickable
          >
            <span>{step}</span>
            <div className={`circle ${index <= currentStep ? 'completed' : ''}`}>
              {/* Display checkmark only if the current step or a previous one is completed */}
              <span className="checkmark">{index <= currentStep ? '✓' : ''}</span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`line ${index < currentStep ? 'completed' : ''}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomProgressBar;
