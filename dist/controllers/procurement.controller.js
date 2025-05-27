"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementController = void 0;
const procurement_service_1 = require("../services/procurement.service");
class ProcurementController {
    constructor() {
        this.procurementService = new procurement_service_1.ProcurementService();
    }
    async create(req, res) {
        try {
            const { title, description, budget, deadline, ppkId } = req.body;
            console.log("ppkId : ", ppkId);
            const procurement = await this.procurementService.createProcurement(title, description, budget, new Date(deadline), ppkId);
            res.status(201).send({
                data: procurement,
                status: res.statusCode
            });
        }
        catch (error) {
            res.status(400).send({
                message: "Failed to create procurement",
                detail: error
            });
        }
    }
    async list(req, res) {
        try {
            const { status } = req.query;
            const procurement = await this.procurementService.getProcurementStatus(status);
            res.status(200).send({
                data: procurement,
                status: res.statusCode
            });
        }
        catch (error) {
            res.status(404).send({
                message: "Failed to get procurement status",
                detail: error
            });
        }
    }
    async publish(req, res) {
        try {
            const { id } = req.params;
            const procurement = await this.procurementService.publishProcurement(Number(id));
            res.status(201).send({
                data: procurement,
                status: res.statusCode
            });
        }
        catch (error) {
            res.status(400).send({
                message: "Failed to publish procurement",
                detail: error
            });
        }
    }
}
exports.ProcurementController = ProcurementController;
