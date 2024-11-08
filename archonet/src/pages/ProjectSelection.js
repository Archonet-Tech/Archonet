// // src/pages/ProjectSelection.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../style/ProjectSelection.css'; // Custom styles for the new page

// const ProjectSelection = () => {
//   const navigate = useNavigate();

//   const handleStartProject = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="new-project-page">
//       {/* Project Card 1 */}
//       <div className="project-card">
//         <img src="/image/architects.jpg" alt="Site Feasibility" />
//         <h2>Site Feasibility</h2>
//         <p>Site Feasibility Analysis in Minutes</p>
//         <div className="button-container">
//           <button className="start-project-btn" onClick={() => handleStartProject('/site-constraints')}>Start Project</button>
//           <button className="watch-demo-btn">Watch Demo</button>
//         </div>
//       </div>

//       {/* Project Card 2 */}
//       <div className="project-card">
//         <img src="/image/architects.jpg" alt="Residential Unit Layout" />
//         <h2>Residential Unit Layout</h2>
//         <p>Unit level floor plans in minutes</p>
//         <div className="button-container">
//           <button className="start-project-btn" onClick={() => handleStartProject('/other-constraints')}>Start Project</button>
//           <button className="watch-demo-btn">Watch Demo</button>
//         </div>
//       </div>

//       {/* Project Card 3 */}
//       <div className="project-card">
//         <img src="/image/architects.jpg" alt="Building Massing" />
//         <h2>Building Massing</h2>
//         <p>Block level massing object for buildings</p>
//         <div className="button-container">
//           <button className="start-project-btn" onClick={() => handleStartProject('/input-summary')}>Start Project</button>
//           <button className="watch-demo-btn">Watch Demo</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectSelection;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ProjectSelection.css'; // Custom styles for the new page

const ProjectSelection = () => {
  const navigate = useNavigate();

  const handleStartProject = (path) => {
    navigate(path);
  };

  return (
    <div className="new-project-page">
      {/* Project Card 1 */}
      <div className="project-card">
        <img src="/images/architects.jpg" alt="Site Feasibility" />
        <h2>Site Feasibility</h2>
        <p>Site Feasibility Analysis in Minutes</p>
        <div className="button-container">
          <button className="start-project-btn" onClick={() => handleStartProject('/site-constraints')}>Start Project</button>
          <button className="watch-demo-btn">Watch Demo</button>
        </div>
      </div>

      {/* Project Card 2 */}
      <div className="project-card">
        <img src="/images/architects.jpg" alt="Residential Unit Layout" />
        <h2>Residential Unit Layout</h2>
        <p>Unit level floor plans in minutes</p>
        <div className="button-container">
          <button className="start-project-btn" onClick={() => handleStartProject('/other-constraints')}>Start Project</button>
          <button className="watch-demo-btn">Watch Demo</button>
        </div>
      </div>

      {/* Project Card 3 */}
      <div className="project-card">
        <img src="/images/architects.jpg" alt="Building Massing" />
        <h2>Building Massing</h2>
        <p>Block level massing object for buildings</p>
        <div className="button-container">
          <button className="start-project-btn" onClick={() => handleStartProject('/input-summary')}>Start Project</button>
          <button className="watch-demo-btn">Watch Demo</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelection;
