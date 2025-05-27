import { Request, Response } from "express";
import { ProcurementService } from "../services/procurement.service";
import { ProcurementStatus } from "../entities/Procurement";

export class ProcurementController {
    private procurementService = new ProcurementService()

    async create(req: Request, res: Response) {
        try {
            const { title, description, budget, deadline, ppkId } = req.body
            const procurement = await this.procurementService.createProcurement(title, description, budget, new Date(deadline), ppkId)
            res.status(201).send({
                data: procurement,
                status: res.statusCode
            })
        } catch (error) {
            res.status(400).send({
                message: "Failed to create procurement",
                detail: error
            })
        }
    }


    async list(req: Request, res: Response) {
        try {
            const { status } = req.query
            const procurement = await this.procurementService.getProcurementStatus(status as ProcurementStatus)
            res.status(200).send({
                data: procurement,
                status: res.statusCode
            })
        } catch (error) {
            res.status(404).send({
                message: "Failed to get procurement status",
                detail: error
            })
        }
    }

    async publish(req: Request, res: Response) {
        try {
            const { id } = req.params
            const procurement = await this.procurementService.publishProcurement(Number(id))
            res.status(201).send({
                data: procurement,
                status: res.statusCode
            })
        } catch (error) {
            res.status(400).send({
                message: "Failed to publish procurement",
                detail: error
            })
        }
    }
}