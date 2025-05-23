"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const User_1 = require("../entities/User");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const user = await this.authService.register(name, email, password, role || User_1.UserRole.VENDOR);
            res.status(201).send({
                data: user,
                status: res.statusCode,
                message: "Sucessfully register"
            });
        }
        catch (error) {
            res.status(400).send({
                detail: error,
                status: res.statusCode,
                message: "Failed register, please try again"
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            res.status(201).send({
                data: user,
                status: res.statusCode,
                message: "Sucessfully login"
            });
        }
        catch (error) {
            res.status(400).send({
                detail: error,
                status: res.statusCode,
                message: "Failed login, please try again"
            });
        }
    }
    async getProfile(req, res) {
        try {
            const { userId } = req.body;
            const user = await this.authService.getProfile(userId);
            res.status(201).send({
                data: user,
                status: res.statusCode,
                message: "Sucessfully get profile"
            });
        }
        catch (error) {
            res.status(400).send({
                detail: error,
                status: res.statusCode,
                message: "Failed get profile, please try again"
            });
        }
    }
}
exports.AuthController = AuthController;
