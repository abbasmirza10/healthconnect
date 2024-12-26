export interface User {
    userID: number;
    username: string;
    password: string;
    role: number;
}

export interface Patient {
    patientID: number;
    assignedDoctorID: number
    gender: number;
 	ageInYears: number; 
    ageInMonths: number;
    pregnancyStatus: number;
}

export interface Doctor {
    docID: number;
    docName: string;
    specialization: string;
}
