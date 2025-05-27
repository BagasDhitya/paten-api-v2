"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDB = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
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
    entities: [
        isProduction
            ? [path.join(__dirname, '../entities/**/*.js')]
            : __dirname + "/../entities/**/*.ts", // untuk development
    ],
    migrations: [
        isProduction
            ? __dirname + "/../migrations/**/*.js"
            : __dirname + "/../migrations/**/*.ts",
    ],
    subscribers: [],
});
const initializeDB = async () => {
    try {
        console.log("NODE_ENV =", process.env.NODE_ENV);
        console.log("Entities loaded:", exports.AppDataSource.options.entities);
        await exports.AppDataSource.initialize();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error : ', error);
    }
};
exports.initializeDB = initializeDB;
