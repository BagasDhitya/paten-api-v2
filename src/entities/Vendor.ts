import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Contract } from "./Contract";

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    companyName?: string

    @Column()
    npwp?: string

    @Column()
    siup?: string

    @Column()
    address?: string

    @Column()
    phone?: string

    @OneToOne(() => User, (user) => user.vendor)
    user?: User

    @OneToMany(() => Contract, (contract) => contract.vendor)
    contracts?: Contract[]
}