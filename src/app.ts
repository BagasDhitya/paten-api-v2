import express from 'express'
import { initializeDB } from './config/database'
import { AuthRoutes } from './routers/auth.route'
import dotenv from 'dotenv'

dotenv.config()
class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
        this.initializeDatabase()
    }

    private config() {
        this.app.use(express.json())
    }

    private routes() {
        const authRoutes = new AuthRoutes()

        this.app.use("/api/auth", authRoutes.router)
    }

    private async initializeDatabase() {
        await initializeDB()
    }
}

const port = 5000
const app = new App().app

app.listen(port, () => {
    console.log("Server running on port ", port)
})