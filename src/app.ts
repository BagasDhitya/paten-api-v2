import express from 'express'
import { initializeDB } from './config/database'
import dotenv from 'dotenv'

dotenv.config()
class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.initializeDatabase()
    }

    private config() {
        this.app.use(express.json())
    }

    private async initializeDatabase() {
        await initializeDB()
    }
}

const port = process.env.DEV_PORT
const app = new App().app

app.listen(port, () => {
    console.log("Server running on port ", port)
})