import React, { useState, useEffect } from "react";
import axios from 'axios';

const PatientDashboard = () => {
 const [fitnessData, setFitnessData] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);

 const patientID = 74592; // Replace with actual patient ID

 useEffect(() => {
   const fetchFitnessData = async () => {
     try {
       setIsLoading(true);
       const response = await axios.get(`http://localhost:3007/api/fitness/${patientID}`);
      
       if (response.data && response.data.fitnessData) {
         // Prepare data for display
         const processedData = response.data.fitnessData.map((item, index) => ({
           name: `Day ${index + 1}`,
           steps: Number(item.steps),
           caloriesBurned: Number(item.caloriesBurned),
           sleepDuration: Number(item.sleepDuration)
         }));

         console.log('Processed Fitness Data:', processedData);
         setFitnessData(processedData);
       }
     } catch (err) {
       setError(err);
       console.error('Failed to fetch fitness data:', err);
     } finally {
       setIsLoading(false);
     }
   };

   fetchFitnessData();
 }, []);

 const maxSteps = Math.max(...fitnessData.map(d => d.steps), 0);
 const maxCalories = Math.max(...fitnessData.map(d => d.caloriesBurned), 0);
 const maxSleep = Math.max(...fitnessData.map(d => d.sleepDuration), 0);

 if (isLoading) {
   return (
     <div className="p-6 text-center">
       <p>Loading fitness data...</p>
     </div>
   );
 }

 if (error) {
   return (
     <div className="p-6 text-center text-red-500">
       <p>Failed to load fitness data. Please try again later.</p>
       <p>{error.message}</p>
     </div>
   );
 }

 return (
  <div className="p-2">
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, Patient!</h1>
      <p className="text-gray-700">Here’s your health summary and updates.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-medium text-lg mb-2">Upcoming Appointments</h3>
          <p className="text-gray-600">You have no appointments scheduled.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-medium text-lg mb-2">Prescriptions</h3>
          <p className="text-gray-600">No prescriptions found.</p>
        </div>
        </div>
       </div>
      <div className="p-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="font-medium text-lg mb-4 text-center">Fitness Trends</h3>
        {fitnessData.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Day</th>
                  <th className="border p-2">Steps</th>
                  <th className="border p-2">Calories Burned</th>
                  <th className="border p-2">Sleep Duration</th>
                </tr>
              </thead>
              <tbody>
                {fitnessData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{item.name}</td>
                    <td className="border p-2 text-center">
                      {item.steps} 
                      <div 
                        className="bg-blue-500 h-2 mt-1" 
                        style={{width: `${(item.steps / maxSteps) * 100}%`}}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      {item.caloriesBurned}
                      <div 
                        className="bg-green-500 h-2 mt-1" 
                        style={{width: `${(item.caloriesBurned / maxCalories) * 100}%`}}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      {item.sleepDuration}
                      <div 
                        className="bg-yellow-500 h-2 mt-1" 
                        style={{width: `${(item.sleepDuration / maxSleep) * 100}%`}}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No fitness data available</p>
        )}
      </div>
    </div>
  </div>
 );
};

export default PatientDashboard;



// dependency problems with recharts
//  <ResponsiveContainer width="100%" height={250}>
          //    <LineChart data={fitnessData}>
              //  <CartesianGrid strokeDasharray="3 3" />
              //  <XAxis dataKey="date" />
              //  <YAxis />
              //  <Tooltip />
              //  <Legend />
              //  <Line type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} />
              //  <Line type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" />
              //  <Line type="monotone" dataKey="sleepDuration" stroke="#ffc658" />
          //    </LineChart>
          //  </ResponsiveContainer>