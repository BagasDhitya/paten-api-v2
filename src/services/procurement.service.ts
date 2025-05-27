import { Procurement } from "../entities/Procurement";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";
import { ProcurementStatus } from "../entities/Procurement";

export class ProcurementService {
    private procurementRepository = AppDataSource.getRepository(Procurement)
    private userRepository = AppDataSource.getRepository(User)

    async createProcurement(title: string, description: string, budget: number, deadline: Date, ppkId: number) {

        const ppk = await this.userRepository.findOneBy({ id: ppkId })

        console.log('ppk ; ', ppk)
        if (!ppk) {
            throw new Error("PPK Not found")
        }

        const procurement = this.procurementRepository.create({ title, description, budget, deadline, ppk, status: ProcurementStatus.DRAFT })
        await this.procurementRepository.save(procurement)

        return procurement
    }

    async getProcurementStatus(status?: ProcurementStatus) {
        const query = this.procurementRepository.createQueryBuilder("procurement").leftJoinAndSelect("procurement.ppk", "ppk")

        if (status) {
            query.where("procurement.status = :status", { status })
        }

        return query.getMany()
    }


    async publishProcurement(procurementId: number) {

        const procurement = await this.procurementRepository.findOneBy({ id: procurementId })

        if (!procurement) {
            throw new Error("Procurement Not found")
        }

        procurement.status = ProcurementStatus.PUBLISHED
        await this.procurementRepository.save(procurement)

        return procurement
    }
}