import React from "react";
import PatientDashboard from "./PatientDashboard";  
import DoctorDashboard from "./DoctorDashboard";   


// Mock user data. Replace this with real user data from your backend or state.
const mockUser = {
  role: "patient", // Change this to "doctor" to test the doctor view
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {mockUser.role === "patient" ? <PatientDashboard /> : <DoctorDashboard />}
    </div>
  );
};

export default Dashboard;
