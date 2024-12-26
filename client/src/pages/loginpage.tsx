import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isNewUser ? '/api/signup' : '/api/login';
      const response = await axios.post(`http://localhost:3007${endpoint}`, {
        username: username,
        password: password,
        role: 1  // Assuming 1 is for patients. Adjust as needed.
      });

      console.log('Response:', response.data);
      const user = response.data.user; 
      localStorage.setItem('userID', user.userID);
      localStorage.setItem('username', user.username);
      localStorage.setItem('password', user.password);
      console.log("handleSubmit userID:", user.userID);
      console.log("handleSubmit username:", user.username);
      console.log("handleSubmit password:", user.userID);
      // handle successful login/signup here (like store user data, redirect)
      navigate('/dashboard');  // Redirect to the '/dashboard' route (or whichever route you want)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Welcome to HealthConnect</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            {isNewUser ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {isNewUser ? 'Already have an account?' : 'New user? '}
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-blue-500 font-semibold hover:underline"
            >
              {isNewUser ? 'Login' : 'Sign Up'}
            </button>
          </p>
          <p>
            <button className="text-blue-500 font-semibold hover:underline">Forgot Password?</button>
          </p>
        </div>
        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;