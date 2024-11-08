// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../style/Home.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

// const projects = [
//   { id: 1, name: 'Project 1', updated: '8 hours ago' },
//   { id: 2, name: 'Project 2', updated: '8 hours ago' },
//   { id: 3, name: 'Project 3', updated: '8 hours ago' },
//   { id: 4, name: 'Project 4', updated: '8 hours ago' },
//   { id: 5, name: 'Project 5', updated: '8 hours ago' },
//   { id: 6, name: 'Project 6', updated: '8 hours ago' },
//   { id: 7, name: 'Project 7', updated: '8 hours ago' },
// ];

// const Home = () => {
//   const navigate = useNavigate();

//   const handleCreateNewProject = () => {
//     navigate('/new-project');
//   };

//   const handleShareProject = (projectId) => {
//     alert(`Share project ${projectId}`);
//   };

//   const handleDownloadProject = (projectId) => {
//     alert(`Download project ${projectId}`);
//   };

//   return (
//     <div className="home-container">
//       <div className="search-bar">
//         <input type="text" placeholder="Search Projects" />
//         <button className="close-btn">X</button>
//       </div>

//       <div className="project-grid">
//         <div className="create-project-tile" onClick={handleCreateNewProject}>
//           <div className="plus-icon">+</div>
//           <p>Create New Project</p>
//         </div>

//         {projects.map((project) => (
//           <div key={project.id} className="project-tile">
//             <img
//               src="/image/project.png"
//               alt={project.name}
//             />
//             <h3>{project.name}</h3>
//             <p>Last updated {project.updated}</p>
//             <div className="project-actions">
//               <button
//                 className="share-btn"
//                 onClick={() => handleShareProject(project.id)}
//               >
//                 <i className="fas fa-share"></i>
//               </button>
//               <button
//                 className="download-btn"
//                 onClick={() => handleDownloadProject(project.id)}
//               >
//                 <i className="fas fa-download"></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="load-more-btn">Load More Projects</button>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../style/Home.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Home = () => {
//   const [projects, setProjects] = useState([]); // State to store projects
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const userToken = localStorage.getItem('userToken'); // Assume token is stored in localStorage

//   // Fetch projects when the component mounts
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/projects', {
//           headers: {
//             Authorization: `Bearer ${userToken}` // Send the token in the request headers
//           }
//         });

//         if (response.status === 200) {
//           setProjects(response.data.projects); // Store projects in state
//         }
//       } catch (err) {
//         console.error('Error fetching projects:', err);
//         setError('Failed to fetch projects');
//       }
//     };

//     if (userToken) {
//       fetchProjects(); // Fetch projects only if userToken is available
//     }
//   }, [userToken]);

//   const handleCreateNewProject = () => {
//     navigate('/new-project');
//   };

//   const handleShareProject = (projectId) => {
//     alert(`Share project ${projectId}`);
//   };

//   const handleDownloadProject = (projectId) => {
//     alert(`Download project ${projectId}`);
//   };

//   return (
//     <div className="home-container">
//       <div className="search-bar">
//         <input type="text" placeholder="Search Projects" />
//         <button className="close-btn">X</button>
//       </div>

//       <div className="project-grid">
//         <div className="create-project-tile" onClick={handleCreateNewProject}>
//           <div className="plus-icon">+</div>
//           <p>Create New Project</p>
//         </div>

//         {error && <p>{error}</p>} {/* Display error message if there is an issue */}
        
//         {projects.length === 0 ? (
//           <p>No projects available</p>
//         ) : (
//           projects.map((project) => (
//             <div key={project.project_id} className="project-tile">
//               <img
//                 src="/image/project.png" // Adjust image source as needed
//                 alt={project.project_title}
//               />
//               <h3>{project.project_title}</h3>
//               <p>Last updated {project.updated_at}</p> {/* Adjust field names as per your DB */}
//               <div className="project-actions">
//                 <button
//                   className="share-btn"
//                   onClick={() => handleShareProject(project.project_id)}
//                 >
//                   <i className="fas fa-share"></i>
//                 </button>
//                 <button
//                   className="download-btn"
//                   onClick={() => handleDownloadProject(project.project_id)}
//                 >
//                   <i className="fas fa-download"></i>
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <button className="load-more-btn">Load More Projects</button>
//     </div>
//   );
// };

// export default Home;import React, { useState, useEffect } from 'react'; // Ensure correct imports


// import React, { useState, useEffect } from 'react'; 
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../style/Home.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Home = () => {
//   const [projects, setProjects] = useState([]); // State to store projects
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(""); // State to manage search input
//   const navigate = useNavigate();

//   const userToken = localStorage.getItem('userToken'); // Assume token is stored in localStorage

//   // Fetch projects when the component mounts
//     useEffect(() => {
//       const fetchProjects = async () => {
//         try {
//           const response = await axios.get('http://localhost:5001/api/projects', {
//             headers: {
//               Authorization: `Bearer ${userToken}` // Send the token in the request headers
//             }
//           });
    
//           console.log(response.data); // Log the response data to debug
    
//           if (response.status === 200 && response.data.projects) {
//             setProjects(response.data.projects); // Set projects data if it's present
//           } else {
//             setProjects([]); // Ensure that we reset the projects state if no projects are returned
//           }
//         } catch (err) {
//           console.error('Error fetching projects:', err);
//           setError('Failed to fetch projects');
//         }
//       };
    
//       if (userToken) {
//         fetchProjects(); // Fetch projects only if userToken is available
//       }
//     }, [userToken]);
    

//   const handleCreateNewProject = () => {
//     navigate('/new-project'); // Redirect to the page where new projects can be created
//   };

//   const handleShareProject = (projectId) => {
//     alert(`Share project ${projectId}`);
//   };

//   const handleDownloadProject = (projectId) => {
//     alert(`Download project ${projectId}`);
//   };

//   const handleNewProjectCreation = (newProject) => {
//     setProjects((prevProjects) => [...prevProjects, newProject]); // Add the new project to the state
//   };

//   const filteredProjects = projects.filter((project) =>
//     project.project_title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="home-container">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search Projects"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
//         />
//         <button className="close-btn" onClick={() => setSearchTerm("")}>X</button>
//       </div>

//       <div className="project-grid">
//         <div className="create-project-tile" onClick={handleCreateNewProject}>
//           <div className="plus-icon">+</div>
//           <p>Create New Project</p>
//         </div>

//         {error && <p>{error}</p>} {/* Display error message if there is an issue */}
        
//         {filteredProjects.length === 0 ? (
//           <p>No projects available</p>
//         ) : (
//           filteredProjects.map((project) => (
//             <div key={project.id} className="project-tile"> {/* Make sure to use correct field names */}
//               <img
//                 src="/image/project.png" // Adjust image source as needed
//                 alt={project.project_title}
//               />
//               <h3>{project.project_title}</h3>
//               <p>Last updated {project.created_at}</p> {/* Adjust field names as per your DB */}
//               <div className="project-actions">
//                 <button
//                   className="share-btn"
//                   onClick={() => handleShareProject(project.id)} // Use correct project identifier
//                 >
//                   <i className="fas fa-share"></i>
//                 </button>
//                 <button
//                   className="download-btn"
//                   onClick={() => handleDownloadProject(project.id)} // Use correct project identifier
//                 >
//                   <i className="fas fa-download"></i>
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <button className="load-more-btn">Load More Projects</button>
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../style/Home.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Home = () => {
//   const [projects, setProjects] = useState([]); // State to store projects
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
//   const navigate = useNavigate();

//   const userToken = localStorage.getItem('token'); // Ensure we use the correct token key

//   // Fetch projects when the component mounts
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/projects', {
//           headers: {
//             Authorization: `Bearer ${userToken}`, // Send the token in the request headers
//           },
//         });

//         console.log('Response Data:', response.data); // Log the response data to debug

//         if (response.status === 200 && response.data.projects) {
//           setProjects(response.data.projects); // Set projects data if it's present
//         } else {
//           setProjects([]); // Ensure that we reset the projects state if no projects are returned
//         }
//       } catch (err) {
//         console.error('Error fetching projects:', err);
//         setError('Failed to fetch projects');
//       }
//     };

//     if (userToken) {
//       fetchProjects(); // Fetch projects only if userToken is available
//     } else {
//       setError('User not authenticated');
//     }
//   }, [userToken]);

//   const handleCreateNewProject = () => {
//     navigate('/new-project'); // Redirect to the page where new projects can be created
//   };

//   const handleShareProject = (projectId) => {
//     alert(`Share project ${projectId}`);
//   };

//   const handleDownloadProject = (projectId) => {
//     alert(`Download project ${projectId}`);
//   };

//   const handleNewProjectCreation = (newProject) => {
//     setProjects((prevProjects) => [...prevProjects, newProject]); // Add the new project to the state
//   };

//   const filteredProjects = projects.filter((project) =>
//     project.project_title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="home-container">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search Projects"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
//         />
//         <button className="close-btn" onClick={() => setSearchTerm('')}>X</button>
//       </div>

//       <div className="project-grid">
//         <div className="create-project-tile" onClick={handleCreateNewProject}>
//           <div className="plus-icon">+</div>
//           <p>Create New Project</p>
//         </div>

//         {error && <p>{error}</p>} {/* Display error message if there is an issue */}

//         {filteredProjects.length === 0 ? (
//           <p>No projects available</p>
//         ) : (
//           filteredProjects.map((project) => (
//             <div key={project.id} className="project-tile">
//               <img
//                 src="/image/project.png" // Adjust image source as needed
//                 alt={project.project_title}
//               />
//               <h3>{project.project_title}</h3>
//               <p>Last updated {new Date(project.updated_at).toLocaleDateString()}</p>
//               <div className="project-actions">
//                 <button
//                   className="share-btn"
//                   onClick={() => handleShareProject(project.id)} // Use correct project identifier
//                 >
//                   <i className="fas fa-share"></i>
//                 </button>
//                 <button
//                   className="download-btn"
//                   onClick={() => handleDownloadProject(project.id)} // Use correct project identifier
//                 >
//                   <i className="fas fa-download"></i>
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <button className="load-more-btn">Load More Projects</button>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State to manage search input
  const navigate = useNavigate();

  const userToken = localStorage.getItem('token'); // Ensure we use the correct token key

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/projects', {
          headers: {
            Authorization: `Bearer ${userToken}`, // Send the token in the request headers
          },
        });

        console.log('Response Data:', response.data); // Log the response data to debug

        if (response.status === 200 && Array.isArray(response.data)) {
          setProjects(response.data); // Set projects data if it's an array
        } else {
          setProjects([]); // Ensure that we reset the projects state if no projects are returned
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects');
      }
    };

    if (userToken) {
      fetchProjects(); // Fetch projects only if userToken is available
    } else {
      setError('User not authenticated');
    }
  }, [userToken]);

  const handleCreateNewProject = () => {
    navigate('/new-project'); // Redirect to the page where new projects can be created
  };

  const handleShareProject = (projectId) => {
    alert(`Share project ${projectId}`);
  };

  const handleDownloadProject = (projectId) => {
    alert(`Download project ${projectId}`);
  };

  const handleNewProjectCreation = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]); // Add the new project to the state
  };

  const filteredProjects = projects.filter((project) =>
    project.project_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        <button className="close-btn" onClick={() => setSearchTerm('')}>X</button>
      </div>

      <div className="project-grid">
        <div className="create-project-tile" onClick={handleCreateNewProject}>
          <div className="plus-icon">+</div>
          <p>Create New Project</p>
        </div>

        {error && <p>{error}</p>} {/* Display error message if there is an issue */}

        {filteredProjects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.project_id} className="project-tile">
              <img
                src="/image/project.png" // Adjust image source as needed
                alt={project.project_title}
              />
              <h3>{project.project_title}</h3>
              <p>Last updated {new Date(project.created_at).toLocaleDateString()}</p>
              <div className="project-actions">
                <button
                  className="share-btn"
                  onClick={() => handleShareProject(project.project_id)} // Use correct project identifier
                >
                  <i className="fas fa-share"></i>
                </button>
                <button
                  className="download-btn"
                  onClick={() => handleDownloadProject(project.project_id)} // Use correct project identifier
                >
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="load-more-btn">Load More Projects</button>
    </div>
  );
};

export default Home;
