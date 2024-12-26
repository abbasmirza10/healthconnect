import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Doctor {
  docID: number;
  docName: string;
  specialization: string;
}
const DoctorKeywordSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchDoctors = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('http://localhost:3007/api/doctors');
          setDoctors(response.data.doctors || []);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to fetch doctors');
          setDoctors([]); // set empty array on error
          setIsLoading(false);
        }
      };
  
      fetchDoctors();
    }, []);

    useEffect(() => {
      if (!searchTerm || !Array.isArray(doctors)) {
        setFilteredDoctors([]);
        return;
      }
  
      const results = doctors.filter(doctor => 
        doctor?.docName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor?.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setFilteredDoctors(results);
    }, [searchTerm, doctors]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input 
          type="text"
          placeholder="Search doctors by name or specialization"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>

      {searchTerm && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <div 
                key={doctor.docID} 
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{doctor.docName}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    // TODO: add functionality to view doctor details/book appointment
                  >
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No doctors found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorKeywordSearch;