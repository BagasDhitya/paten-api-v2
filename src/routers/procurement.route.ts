import { Router } from "express";
import { ProcurementController } from "../controllers/procurement.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { UserRole } from "../entities/User";

export class ProcurementRoutes {
    public router: Router
    private procurementController = new ProcurementController()
    private authMiddleware = new AuthMiddleware()
    private roleMiddleware = new RoleMiddleware()

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post('/',
            this.authMiddleware.authenticate.bind(this.authMiddleware),
            this.roleMiddleware.requireRole([UserRole.PPK]),
            this.procurementController.create.bind(this.procurementController)
        )
        this.router.get('/',
            this.authMiddleware.authenticate.bind(this.authMiddleware),
            this.procurementController.create.bind(this.procurementController)
        )
        this.router.patch('/:id/publish',
            this.authMiddleware.authenticate.bind(this.authMiddleware),
            this.roleMiddleware.requireRole([UserRole.PPK]),
            this.procurementController.create.bind(this.procurementController)
        )
    }
}