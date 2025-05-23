"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const User_2 = require("../entities/User");
const database_1 = require("../config/database");
class AuthService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async register(name, email, password, role = User_2.UserRole.VENDOR) {
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("Email already registered/exist");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = this.userRepository.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });
        await this.userRepository.save(user);
        return user;
    }
    async login(email, password) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }
    async getProfile(userId) {
        return this.userRepository.findOneBy({ id: userId });
    }
}
exports.AuthService = AuthService;
