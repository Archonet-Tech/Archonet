

// // /components/NewProject.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const NewProject = () => {
//   const [projectTitle, setProjectTitle] = useState('');
//   const [projectDescription, setProjectDescription] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem('token');  // Retrieve token from localStorage
  
//     if (!token) {
//       setError('You must be logged in to create a project');
//       return;
//     }
  
//     // Log the data being sent to the backend
//     console.log({
//       project_title: projectTitle,
//       about: projectDescription
//     });
  
//     try {
//       const response = await axios.post(
//         'http://localhost:5001/api/projects',  // Ensure this is the correct endpoint
//         {
//           project_title: projectTitle,
//           about: projectDescription
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`  // Send token in Authorization header
//           }
//         }
//       );
  
//       if (response.status === 201) {
//         setSuccess('Project created successfully');
//         setError(null);
//       }
//     } catch (err) {
//       console.error(err.response);  // Log the error response for debugging
//       setError('Failed to create project');
//       setSuccess(null);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Create New Project</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={projectTitle}
//           onChange={(e) => setProjectTitle(e.target.value)}
//           placeholder="Project Title"
//         />
//         <textarea
//           value={projectDescription}
//           onChange={(e) => setProjectDescription(e.target.value)}
//           placeholder="Project Description"
//         />
//         <button type="submit">Create Project</button>
//       </form>
//       {error && <p>{error}</p>}
//       {success && <p>{success}</p>}
//     </div>
//   );
// };

// export default NewProject;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();  // Initialize navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
  
    if (!token) {
      setError('You must be logged in to create a project');
      return;
    }
  
    // Log the data being sent to the backend
    console.log({
      project_title: projectTitle,
      about: projectDescription
    });
  
    try {
      const response = await axios.post(
        'http://localhost:5001/api/projects',  // Ensure this is the correct endpoint
        {
          project_title: projectTitle,
          about: projectDescription
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Send token in Authorization header
          }
        }
      );
  
      if (response.status === 201) {
        setSuccess('Project created successfully');
        setError(null);
        navigate('/project-selection');  // Redirect to ProjectSelection page
      }
    } catch (err) {
      console.error(err.response);  // Log the error response for debugging
      setError('Failed to create project');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="Project Title"
        />
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Project Description"
        />
        <button type="submit">Create Project</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default NewProject;

