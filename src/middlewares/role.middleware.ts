import { NextFunction, Request, Response } from "express";
import { UserRole } from "../entities/User";

export class RoleMiddleware {
    requireRole(requiredRoles: UserRole[]): any {
        return (req: Request, res: Response, next: NextFunction) => {

            if (!(req as any).user) {
                return res.status(401).send({
                    message: "Unauthorized access"
                })
            }

            if (!requiredRoles.includes((req as any).user.role)) {
                return res.status(403).send({
                    message: "Forbidden access"
                })
            }
        }
    }
}