import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../entities/User'
import { UserRole } from '../entities/User'

import { AppDataSource } from '../config/database'

export class AuthService {

    private userRepository = AppDataSource.getRepository(User)

    async register(name: string, email: string, password: string, role: UserRole = UserRole.VENDOR) {
        const existingUser = await this.userRepository.findOneBy({ email })

        if (existingUser) {
            throw new Error("Email already registered/exist")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = this.userRepository.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })

        await this.userRepository.save(user)
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOneBy({ email })

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error('Invalid credentials')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
        return { user, token }
    }

    async getProfile(userId: number) {
        return this.userRepository.findOneBy({ id: userId })
    }
}