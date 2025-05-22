"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../entities/User");
const User_2 = require("../entities/User");
const database_1 = require("../config/database");
class AuthService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    register(name_1, email_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (name, email, password, role = User_2.UserRole.VENDOR) {
            const existingUser = yield this.userRepository.findOneBy({ email });
            if (existingUser) {
                throw new Error("Email already registered/exist");
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = this.userRepository.create({
                name: name,
                email: email,
                password: hashedPassword,
                role: role
            });
            yield this.userRepository.save(user);
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ email });
        });
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.AuthService = AuthService;
