import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Currency } from "./currency.entity";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class Ledger {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("decimal", { precision: 18, scale: 2, default: 0 })
    public balance: number;

    @ManyToOne(() => Currency, { eager: true })
    public currency: Currency;

    @ManyToOne(() => User, { eager: true })
    public user: User;
}
