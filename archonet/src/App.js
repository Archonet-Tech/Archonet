
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header';
import Home from './components/Home';
import NewProject from './pages/NewProject';
import SiteConstraints from './pages/MapPage';
import OtherConstraints from './pages/OtherConstraints';
import InputSummary from './pages/InputSummary';
import DesignOutput from './pages/DesignOutput';
import ProjectSelection from './pages/ProjectSelection';
import SiteMap from './pages/SiteMap';
import RegulatoryForm from './pages/RegulatoryForm';
import BusinessConstraints from './pages/BusinessConstraints';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if the user is logged in based on the token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update the login state

    if (isLoggedIn && location.pathname === '/login') {
      navigate('/home'); // Redirect to home if already logged in
    }

    switch (location.pathname) {
      case '/site-constraints':
        setCurrentStep(1);
        break;
      case '/other-constraints':
        setCurrentStep(2);
        break;
      case '/input-summary':
        setCurrentStep(3);
        break;
      case '/design-output':
        setCurrentStep(4);
        break;
      default:
        setCurrentStep(0);
        break;
    }
  }, [location.pathname, isLoggedIn, navigate]);

  return (
    <div className="app-container">
      {isLoggedIn && <Header currentStep={currentStep} setCurrentStep={setCurrentStep} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <div className="content">
        <Routes>
          {/* Public Route: Login */}
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />

          {/* Redirect to login if user is not authenticated */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          {/* Protected Routes: Require Login */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-project"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <NewProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site-constraints"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SiteConstraints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/other-constraints"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <OtherConstraints />
              </ProtectedRoute>
            }
          />
          <Route
            path="/input-summary"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <InputSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/design-output"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DesignOutput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project-selection"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProjectSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site-map"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SiteMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/regulatoryform"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <RegulatoryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <BusinessConstraints />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
 

