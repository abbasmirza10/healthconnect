import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/homepage';
import LoginPage from './pages/loginpage';
import Dashboard from './components/dashboard/Dashboard'; 
import Navbar from './components/Navbar'; 
import Profile from './pages/Profile';

const App: React.FC = () => {
  const isAuthenticated = true; // Replace with actual authentication logic once ready
  // const mockUser = { role: "patient" }; // Replace with real user data fetched from backend

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Homepage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
