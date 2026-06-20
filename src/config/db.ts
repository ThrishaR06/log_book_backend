// src/config/db.ts

import "dotenv/config";
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

export async function connectDB() {
    try {
        const connection = await pool.getConnection();

        console.log("✅ MySQL Connected");

        connection.release();
    } catch (error) {
        console.error("❌ MySQL Connection Failed");
        console.error(error);

        process.exit(1);
    }
}