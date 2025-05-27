import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { User } from './User'
import { Procurement } from './Procurement'
import { Vendor } from './Vendor'

@Entity()
export class Contract {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    contractNumber?: string

    @Column("decimal", { precision: 15, scale: 2 })
    value?: number

    @Column()
    startDate?: Date

    @Column()
    endDate?: Date

    @ManyToOne(() => User, (user) => user.contracts)
    ppk?: User

    @ManyToOne(() => Vendor, (vendor) => vendor.contracts)
    vendor?: Vendor

    @OneToOne(() => Procurement, (procurement) => procurement.contract)
    procurement?: Procurement

}