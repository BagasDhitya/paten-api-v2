import { DataSource } from "typeorm";
import dotenv from 'dotenv'

import { User } from "../entities/User";
import { Procurement } from "../entities/Procurement";
import { Contract } from "../entities/Contract";
import { Vendor } from "../entities/Vendor";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: process.env.NODE_ENV === "production"
        ? ["dist/entities/*.js"]
        : [User, Procurement, Contract, Vendor],
    migrations: process.env.NODE_ENV === "production"
        ? ["dist/migrations/*.js"]
        : ["src/migrations/*.ts"],
    subscribers: []
});


export const initializeDB = async () => {
    try {
        console.log("NODE_ENV =", process.env.NODE_ENV)
        console.log("Entities loaded:", AppDataSource.options.entities)

        await AppDataSource.initialize()
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Database connection error : ', error)
    }
}