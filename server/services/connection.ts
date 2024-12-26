import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
console.error('Environment variables not set!');
process.exit(1);
}

const dbPort = parseInt(process.env.DB_PORT || "5432", 10);


const pool = mysql.createPool({
host: process.env.DB_HOST,
port: dbPort,
user: process.env.DB_USER,
database: process.env.DB_NAME,
});
console.log('Connected to MySQL database');
export default pool;

