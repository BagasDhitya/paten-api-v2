import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, CreateDateColumn } from "typeorm";
import { Procurement } from "./Procurement";
import { Contract } from "./Contract";
import { Vendor } from "./Vendor";

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
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.VENDOR,
    })
    role!: UserRole;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @OneToMany(() => Procurement, (procurement) => procurement.ppk)
    procurement!: Procurement[]

    @OneToMany(() => Contract, (contract) => contract.ppk)
    contracts?: Contract[]

    @OneToOne(() => Vendor, (vendor) => vendor)
    vendor?: Vendor
}