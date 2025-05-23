import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    public router: Router
    private authController = new AuthController()
    private authMiddleware = new AuthMiddleware()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post("/register", this.authController.register.bind(this.authController))
        this.router.post("/login", this.authController.login.bind(this.authController))
        this.router.get("/profile", this.authMiddleware.authenticate.bind(this.authMiddleware), this.authController.getProfile.bind(this.authController))
    }
}