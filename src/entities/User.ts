import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Procurement } from "./Procurement";

export enum UserRole {
    ADMIN = "admin",
    PPK = "ppk",
    PANITIA = "panitia",
    VENDOR = "vendor",
    AUDITOR = "auditor",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    age!: number

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.VENDOR,
    })
    role!: UserRole;

    @Column()
    created_at!: Date

    @OneToMany(() => Procurement, (procurement) => procurement.ppk)
    procurement!: Procurement[]
}