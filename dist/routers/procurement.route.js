"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcurementRoutes = void 0;
const express_1 = require("express");
const procurement_controller_1 = require("../controllers/procurement.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
class ProcurementRoutes {
    constructor() {
        this.procurementController = new procurement_controller_1.ProcurementController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleware();
        this.roleMiddleware = new role_middleware_1.RoleMiddleware();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.post("/", this.authMiddleware.authenticate.bind(this.authMiddleware), 
        // this.roleMiddleware.requireRole([UserRole.PPK]),
        this.procurementController.create.bind(this.procurementController));
        this.router.get("/", this.authMiddleware.authenticate.bind(this.authMiddleware), this.procurementController.list.bind(this.procurementController));
        this.router.patch("/:id/publish", this.authMiddleware.authenticate.bind(this.authMiddleware), 
        // this.roleMiddleware.requireRole([UserRole.PPK]),
        this.procurementController.publish.bind(this.procurementController));
    }
}
exports.ProcurementRoutes = ProcurementRoutes;
