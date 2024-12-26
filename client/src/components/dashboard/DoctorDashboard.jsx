import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, Doctor!</h1>
      <p className="text-gray-700">Here’s an overview of your patients and schedule.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-medium text-lg mb-2">Today's Appointments</h3>
          <p className="text-gray-600">You have no appointments for today.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-medium text-lg mb-2">Patient Records</h3>
          <p className="text-gray-600">No patient records to display.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
