import { Router, Request, Response, NextFunction } from 'express';
import { signUp, login, deleteUser, updateUser, searchDoctors, getFitnessData } from '../services/database';
import pool from '../services/connection';

const router = Router();

// Sign-Up Route
router.post('/signup', async (req: Request, res: Response) => {
    const { username, password} = req.body;

    try {
        const newUser = await signUp(username, password, 1);
        res.status(201).json({ message: 'User signed up successfully!', user: newUser });
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// Login Route
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    //console.log(username, password)
// Simulating a role check for simplicity. In a real-world application, you would likely use a middleware for this.
    try {
       
        const user = await login(username, password);
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Invalid credentials.' });
    }
});

// Delete User Route
router.delete('/delete', async (req: Request, res: Response): Promise<void> => {
    let { userID } = req.body; 
    console.log("router.delete userId:", userID);
    userID = parseInt(userID, 10);

    if (isNaN(userID)) {
        res.status(400).json({ error: 'Invalid userID. It must be a number.' });
    }


    try {
        await deleteUser(userID);
        res.status(200).json({ message: `User with ID ${userID} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

// Update Profile Route
router.put('/update', async (req: Request, res: Response) => {
    // const userID = parseInt(req.body.userID);
    const { userID, username, password, role } = req.body;
    console.log("router.put:", userID, username, password, role);

    try {
        const updatedUser = await updateUser(userID, { username, password, role });
        res.status(200).json({ message: `User with ID ${userID} updated successfully.`, user: updatedUser });
    } catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

router.get('/doctors', async (req: Request<{}, any, any, { keyword?: string }>, res: Response, next: NextFunction) => {
    const { keyword } = req.query;

    try {
        const searchKeyword = keyword ? String(keyword).trim() : '';
        const doctors = await searchDoctors(searchKeyword);
        
        // if (doctors.length === 0) {
        //     res.status(404).json({ 
        //         message: 'No doctors found matching the search criteria.' 
        //     });
        //     return;
        // }
        
        res.status(200).json({
            message: 'Doctors retrieved successfully',
            doctors
        });
    } catch (error) {
        next(error);
    }
});

router.get('/fitness/:patientID', async (req: Request<{ patientID: number }>, res: Response): Promise<void> => {
    // console.log("arrived here");
    const patientID = req.params.patientID;


    if (isNaN(patientID)) {
        res.status(400).json({ error: 'Invalid patient ID' });
        return;
    }
 
 
    try {
        const fitnessData = await getFitnessData(patientID);
        res.status(200).json({
            message: 'Fitness data retrieved successfully',
            fitnessData
        });
    } catch (error) {
        console.error('Error retrieving fitness data:', error);
        res.status(500).json({
            error: error instanceof Error ? error.message : 'An unknown error occurred.'
        });
    }
 });

 router.put('/update-fitness', async (req: Request, res: Response): Promise<void> => {
    const { patientID, caloriesBurned, steps, sleepDuration } = req.body;
    console.log('Received payload:', req.body);

    if (!patientID || !caloriesBurned || !steps || !sleepDuration) {
        res.status(400).json({ error: 'Missing required fields: patientID, caloriesBurned, steps, sleepDuration' });
        return;
    }

    try {
        // Call the stored procedure with the provided parameters
        await pool.query(
            `CALL updateFitnessAndNotifyDoctor(?, ?, ?, ?)`,
            [patientID, caloriesBurned, steps, sleepDuration]
        );

        res.status(200).json({ message: `Fitness data for patient ID ${patientID} updated successfully.` });
    } catch (error) {
        console.error('Error updating fitness data:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    }
});

export default router;

