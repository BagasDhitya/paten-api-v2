import express from 'express'
import { initializeDB } from './config/database'
import { AuthRoutes } from './routers/auth.route'
import { ProcurementRoutes } from './routers/procurement.route'
import dotenv from 'dotenv'
import cors from 'cors'

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
        this.app.use(cors({
            origin: 'http://localhost:3000'
        }))
    }

    private routes() {
        const authRoutes = new AuthRoutes()
        const procurementRoutes = new ProcurementRoutes()

        this.app.use("/api/auth", authRoutes.router)
        this.app.use("/api/procurements", procurementRoutes.router)
    }

    private async initializeDatabase() {
        await initializeDB()
    }
}

const port = 8000
const app = new App().app

app.listen(port, () => {
    console.log("Server running on port ", port)
})