import { Client } from "pg";

export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
});

export const connectDatabase = async () => {
    try {
        await client.connect();
        console.log("Database connected sucessfully")
    } catch (error) {
        console.log(error)
    }
}