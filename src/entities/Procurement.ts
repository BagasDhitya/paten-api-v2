import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum ProcurementStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    EVALUATION = 'evaluation',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

@Entity()
export class Procurement {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column('text')
    description!: string

    @Column('decimal', { precision: 15, scale: 2 })
    budget!: number

    @Column({
        type: 'enum',
        enum: ProcurementStatus,
        default: ProcurementStatus.DRAFT
    })
    status!: ProcurementStatus

    @Column()
    deadline!: Date

    @ManyToOne(() => User, (user) => user.procurement)
    ppk!: User
}