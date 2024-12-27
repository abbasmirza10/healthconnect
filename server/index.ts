import express, { Request, Response } from 'express';
import authRoutes from './routes/auth';
import cors from 'cors';
import pool from './services/connection'; 
import * as dotenv from 'dotenv';
dotenv.config();




const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
// app.use('/api/doctors', doctorRoutes);

app.get('/api/', (req:Request, res:Response) => {
    res.send('api');
});

//The log statements and the below test are to show that the DB connection is successful
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

app.get("/test-db", async (req, res) => {
    try {
      const [rows] = await pool.query("SHOW TABLES"); // Sample query to list tables
      res.json({ success: true, tables: rows });
    } catch (error) {
      console.error("Database connection failed:", error);
      res.status(500).json({ success: false, error: "Database connection failed" });
    }
  });

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

export default app;

const handleLogin = async (username: string, password: string) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        const data = await response.json();
        // Store the token in localStorage or a secure storage method
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or home page
    } catch (error) {
        console.error('Login error:', error);
        // Handle error (show message to user)
    }
};

