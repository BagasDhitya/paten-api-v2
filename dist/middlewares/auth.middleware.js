"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
class AuthMiddleware {
    async authenticate(req, res, next) {
        const token = req.header('Authorization')?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).send({
                message: "No token provided"
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userRepository = database_1.AppDataSource.getRepository(User_1.User);
            const user = await userRepository.findOneBy({ id: decoded?.id });
            if (!user) {
                return res.status(401).send({
                    message: "User not found"
                });
            }
            next();
        }
        catch (error) {
            return res.status(401).send({
                message: "Invalid token"
            });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
