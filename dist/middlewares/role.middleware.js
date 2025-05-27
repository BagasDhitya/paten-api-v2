"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMiddleware = void 0;
class RoleMiddleware {
    requireRole(requiredRoles) {
        return (req, res, next) => {
            console.log('require ; ', requiredRoles);
            if (!req.user) {
                res.status(401).json({ message: "Unauthorized access" });
                return;
            }
            if (!requiredRoles.includes(req.user.role)) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }
            next();
        };
    }
}
exports.RoleMiddleware = RoleMiddleware;
