"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementService = void 0;
const Procurement_1 = require("../entities/Procurement");
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
const Procurement_2 = require("../entities/Procurement");
class ProcurementService {
    constructor() {
        this.procurementRepository = database_1.AppDataSource.getRepository(Procurement_1.Procurement);
        this.userRepository = database_1.AppDataSource.getRepository(User_1.User);
    }
    async createProcurement(title, description, budget, deadline, ppkId) {
        const ppk = await this.userRepository.findOneBy({ id: ppkId });
        console.log('ppk ; ', ppk);
        if (!ppk) {
            throw new Error("PPK Not found");
        }
        const procurement = this.procurementRepository.create({ title, description, budget, deadline, ppk, status: Procurement_2.ProcurementStatus.DRAFT });
        await this.procurementRepository.save(procurement);
        return procurement;
    }
    async getProcurementStatus(status) {
        const query = this.procurementRepository.createQueryBuilder("procurement").leftJoinAndSelect("procurement.ppk", "ppk");
        if (status) {
            query.where("procurement.status = :status", { status });
        }
        return query.getMany();
    }
    async publishProcurement(procurementId) {
        const procurement = await this.procurementRepository.findOneBy({ id: procurementId });
        if (!procurement) {
            throw new Error("Procurement Not found");
        }
        procurement.status = Procurement_2.ProcurementStatus.PUBLISHED;
        await this.procurementRepository.save(procurement);
        return procurement;
    }
}
exports.ProcurementService = ProcurementService;
