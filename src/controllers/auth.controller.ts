import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { UserRole } from '../entities/User'

export class AuthController {
    private authService = new AuthService()

    async register(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body
            const user = await this.authService.register(name, email, password, role || UserRole.VENDOR)

            res.status(201).send({
                data: user,
                status: res.statusCode,
                message: "Sucessfully register"
            })
        } catch (error) {
            res.status(400).send({
                detail: error,
                status: res.statusCode,
                message: "Failed register, please try again"
            })
        }
    }


    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const user = await this.authService.login(email, password)

            res.status(201).send({
                data: user,
                status: res.statusCode,
                message: "Sucessfully login"
            })
        } catch (error) {
            res.status(400).send({
                detail: error,
                status: res.statusCode,
                message: "Failed login, please try again"
            })
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const { userId } = req.body
            const user = await this.authService.getProfile(userId)

            res.status(201).send({
                data: user,
                status: res.statusCode,
                message: "Sucessfully get profile"
            })
        } catch (error) {
            res.status(400).send({
                detail: error,
                status: res.statusCode,
                message: "Failed get profile, please try again"
            })
        }
    }
}