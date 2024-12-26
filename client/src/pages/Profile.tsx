import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile: React.FC = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFitnessFormVisible, setIsFitnessFormVisible] = useState(false);
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  //const [email, setEmail] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');
  const [steps, setSteps] = useState('');
  const [sleepDuration, setSleepDuration] = useState('');

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Mock function to simulate account deletion
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID'); 
    console.log("handleDelete userID", userID);
    try {
      const response = await axios.delete('http://localhost:3007/api/delete', {

        data: { userID },
      });
      if (response.status === 200) {
        alert('Your account has been deleted.');
        setIsDeleted(true);
        navigate('/login');
      }
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleUpdateFitness = async (e: React.FormEvent) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID'); 
    console.log("Payload:", { userID, caloriesBurnt, steps, sleepDuration });
    try {
      const response = await axios.put('http://localhost:3007/api/update-fitness', {
            patientID: userID, // Match the backend field
            caloriesBurned: parseFloat(caloriesBurnt), // Convert to number
            steps: parseInt(steps, 10), // Convert to number
            sleepDuration: parseFloat(sleepDuration), // Convert to number
        });
      if (response.status === 200) {
        setMessage('Fitness data updated successfully!');
        setCaloriesBurnt('');
        setSteps('');
        setSleepDuration('');
        setIsFitnessFormVisible(false);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);

    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const userID = localStorage.getItem('userID'); 

    try {
      const response = await axios.put('http://localhost:3007/api/update', {
        userID,
        username,
        password,

      });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  if (isDeleted) {
    return <div>Your account has been deleted. Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <p className="mb-4">Here, users can view and manage their account information.</p>
      {message && <p className="text-red-500">{message}</p>}

      {!isEditing ? (
        <div>
          <div className="mb-4">
            <strong>Username:</strong> {username || 'Not set'}
          </div>
          <div className="mb-4">
            <strong>Password:</strong> {password || 'Not set'}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!isFitnessFormVisible && (
        <button
          onClick={() => setIsFitnessFormVisible(true)}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add Fitness Data
        </button>
      )}

      {isFitnessFormVisible && (
        <form onSubmit={handleUpdateFitness} className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Update Fitness Data</h2>

          <div>
            <label htmlFor="calories" className="block text-sm font-medium text-gray-600">Calories Burnt</label>
            <input
              type="number"
              id="calories"
              value={caloriesBurnt}
              onChange={(e) => setCaloriesBurnt(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="steps" className="block text-sm font-medium text-gray-600">Steps</label>
            <input
              type="number"
              id="steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="sleep" className="block text-sm font-medium text-gray-600">Sleep Duration (hours)</label>
            <input
              type="number"
              id="sleep"
              value={sleepDuration}
              onChange={(e) => setSleepDuration(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Update Fitness Data
          </button>
        </form>
      )}

      <div className="mt-6">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};


export default Profile;


