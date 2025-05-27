import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserRole } from "../entities/User";

export class RoleMiddleware {
    requireRole(requiredRoles: UserRole[]): RequestHandler {
        return (req: Request, res: Response, next: NextFunction): void => {
            console.log('require ; ', requiredRoles)
            if (!(req as any).user) {
                res.status(401).json({ message: "Unauthorized access" });
                return;
            }

            if (!requiredRoles.includes((req as any).user.role)) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }

            next();
        };
    }
}
