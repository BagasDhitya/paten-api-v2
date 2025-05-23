import { DataSource } from "typeorm";
import dotenv from 'dotenv'

import { User } from "../entities/User";
import { Procurement } from "../entities/Procurement";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Procurement],
    migrations: ["src/migrations/*.ts"],
    subscribers: []
})

export const initializeDB = async () => {
    try {
        await AppDataSource.initialize()
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Database connection error : ', error)
    }
}