import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../auth/entities/user.entity";
import { Transaction } from "../../transaction/entities/transaction.entity";
import { Currency } from "./currency.entity";

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

  @OneToMany(() => Transaction, transaction => transaction.ledger)
  transactions: Transaction[];
}
