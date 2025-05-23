"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/register", this.authController.register.bind(this.authController));
        this.router.post("/login", this.authController.login.bind(this.authController));
        this.router.get("/profile", this.authMiddleware.authenticate.bind(this.authMiddleware), this.authController.getProfile.bind(this.authController));
    }
}
exports.AuthRoutes = AuthRoutes;
