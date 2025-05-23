import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../entities/User'
import { AppDataSource } from '../config/database'

export class AuthMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction): Promise<any> {
        const token = req.header('Authorization')?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).send({
                message: "No token provided"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number }
            const userRepository = AppDataSource.getRepository(User)
            const user = await userRepository.findOneBy({ id: decoded?.id })

            if (!user) {
                return res.status(401).send({
                    message: "User not found"
                })
            }

            next()
        } catch (error) {
            return res.status(401).send({
                message: "Invalid token"
            })
        }
    }
}