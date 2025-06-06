"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDB = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../entities/User");
const Procurement_1 = require("../entities/Procurement");
const Contract_1 = require("../entities/Contract");
const Vendor_1 = require("../entities/Vendor");
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === 'production';
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Procurement_1.Procurement, Contract_1.Contract, Vendor_1.Vendor],
    migrations: [],
    subscribers: [],
});
const initializeDB = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error : ', error);
    }
};
exports.initializeDB = initializeDB;
