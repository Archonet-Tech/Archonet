// import React from 'react';
// import '../style/Header.css';
// import logo from '../image/archonetlogo.png'; // Assuming you have a logo image in the images folder
// import UserAccount from './UserAccount'; // Import UserAccount component
// import { useLocation } from 'react-router-dom'; // Import hook for getting the current path
// import CustomProgressBar from './ProgressBar'; // Import the renamed CustomProgressBar component

// const Header = ({ currentStep, setCurrentStep }) => {
//   const location = useLocation(); // Get the current location

//   // Dynamic notification message based on the current path
//   const getNotificationMessage = () => {
//     switch (location.pathname) {
//       case '/new-project':
//         return 'Select the scope of project - Start Project for Site Feasibility';
//       case '/':
//         return 'Start by creating a new project';
//       // Add other cases if you want different notifications for other pages
//       default:
//         return '';
//     }
//   };

//   return (
//     <header className="header">
//       <img src={logo} alt="Logo" className="logo" />
//       {/* Dynamic Notification */}
//       {(location.pathname === '/new-project' || location.pathname === '/') && (
//         <div className="notification">
//           <span>{getNotificationMessage()}</span>
//         </div>
//       )}
//       {/* Render Progress Bar */}
//       <div className="progress-bar-container">
//         <CustomProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
//       </div>
//       <UserAccount />
//     </header>
//   );
// };

// export default Header;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../style/Header.css';
// import logo from '../image/archonetlogo.png'; // Assuming you have a logo image in the images folder
// import UserAccount from './UserAccount';
// import CustomProgressBar from './ProgressBar';

// const Header = ({ currentStep, setCurrentStep }) => {
//   const location = useLocation();

//   // Dynamic notification message based on the current path
//   const getNotificationMessage = () => {
//     switch (location.pathname) {
//       case '/new-project':
//         return 'Select the scope of project - Start Project for Site Feasibility';
//       case '/':
//         return 'Start by creating a new project';
//       // Add other cases if you want different notifications for other pages
//       default:
//         return '';
//     }
//   };

//   return (
//     <header className="header">
//       <img src={logo} alt="Logo" className="logo" />
//       {/* Dynamic Notification */}
//       {(location.pathname === '/new-project' || location.pathname === '/') && (
//         <div className="notification">
//           <span>{getNotificationMessage()}</span>
//         </div>
//       )}
//       {/* Render Progress Bar */}
//       <div className="progress-bar-container">
//         <CustomProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
//       </div>
//       <UserAccount />
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../style/Header.css';
// import logo from '../image/archonetlogo.png'; // Assuming you have a logo image in the images folder
// import UserAccount from './UserAccount';
// import CustomProgressBar from './ProgressBar';

// const Header = ({ currentStep, setCurrentStep, isLoggedIn }) => {
//   const location = useLocation();

//   // Dynamic notification message based on the current path
//   const getNotificationMessage = () => {
//     switch (location.pathname) {
//       case '/new-project':
//         return 'Select the scope of project - Start Project for Site Feasibility';
//       case '/':
//         return 'Start by creating a new project';
//       // Add other cases if you want different notifications for other pages
//       default:
//         return '';
//     }
//   };

//   return (
//     <header className="header">
//       <img src={logo} alt="Logo" className="logo" />
//       {/* Dynamic Notification */}
//       {(location.pathname === '/new-project' || location.pathname === '/') && (
//         <div className="notification">
//           <span>{getNotificationMessage()}</span>
//         </div>
//       )}
//       {/* Render Progress Bar */}
//       <div className="progress-bar-container">
//         <CustomProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
//       </div>
//       {/* Conditionally render UserAccount based on isLoggedIn */}
//       {isLoggedIn && <UserAccount />}
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import '../style/Header.css';
// import logo from '../image/archonetlogo.png'; // Assuming you have a logo image in the images folder
// import CustomProgressBar from './ProgressBar';

// const Header = ({ currentStep, setCurrentStep, isLoggedIn, setIsLoggedIn }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token from localStorage
//     setIsLoggedIn(false); // Update the login state
//     navigate('/'); // Navigate to the login page
//   };

//   // Dynamic notification message based on the current path
//   const getNotificationMessage = () => {
//     switch (location.pathname) {
//       case '/new-project':
//         return 'Select the scope of project - Start Project for Site Feasibility';
//       case '/':
//         return 'Start by creating a new project';
//       // Add other cases if you want different notifications for other pages
//       default:
//         return '';
//     }
//   };

//   return (
//     <header className="header">
//       <img src={logo} alt="Logo" className="logo" />
//       {/* Dynamic Notification */}
//       {(location.pathname === '/new-project' || location.pathname === '/') && (
//         <div className="notification">
//           <span>{getNotificationMessage()}</span>
//         </div>
//       )}
//       {/* Render Progress Bar */}
//       <div className="progress-bar-container">
//         <CustomProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
//       </div>
//       {/* Conditionally render Logout button based on isLoggedIn */}
//       {isLoggedIn && (
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       )}
//     </header>
//   );
// };

// export default Header;



import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Header.css';
import logo from '../image/archonetlogo.png'; // Assuming you have a logo image in the images folder
import CustomProgressBar from './ProgressBar';

const Header = ({ currentStep, setCurrentStep, isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the login state
    navigate('/'); // Navigate to the login page
  };

  // Dynamic notification message based on the current path
  const getNotificationMessage = () => {
    switch (location.pathname) {
      case '/new-project':
        return 'Select the scope of project - Start Project for Site Feasibility';
      case '/':
        return 'Start by creating a new project';
      // Add other cases if you want different notifications for other pages
      default:
        return '';
    }
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      {/* Dynamic Notification */}
      {(location.pathname === '/new-project' || location.pathname === '/') && (
        <div className="notification">
          <span>{getNotificationMessage()}</span>
        </div>
      )}
      {/* Render Progress Bar */}
      <div className="progress-bar-container">
        <CustomProgressBar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      {/* Conditionally render Logout button based on isLoggedIn */}
      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
