"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const auth_route_1 = require("./routers/auth.route");
const procurement_route_1 = require("./routers/procurement.route");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.initializeDatabase();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:3000'
        }));
    }
    routes() {
        const authRoutes = new auth_route_1.AuthRoutes();
        const procurementRoutes = new procurement_route_1.ProcurementRoutes();
        this.app.use("/api/auth", authRoutes.router);
        this.app.use("/api/procurements", procurementRoutes.router);
    }
    async initializeDatabase() {
        await (0, database_1.initializeDB)();
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log("Server running on port ", port);
});
