import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean; // This will be passed as a prop to decide the menu items
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Application name/logo */}
        <Link to="/" className="text-white text-2xl font-semibold">HealthConnect</Link>

        <div className="space-x-4">
          {/* If user is authenticated */}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <Link to="/profile" className="text-white">Profile</Link>
              <Link to="/logout" className="text-white">Logout</Link>
            </>
          ) : (
            <>
              {/* If user is not authenticated */}
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/signup" className="text-white">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
