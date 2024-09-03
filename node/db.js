import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rij@N098",
    database: process.env.DATABASE, 
});


db.connect((err) => {
    if (err) console.log("Error connecting to the database:", err);
    else console.log("Db connected");
});

export default db;
