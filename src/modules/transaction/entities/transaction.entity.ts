import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TransactionTypes } from "../../../common/constants/transaction.constant";
import { Currency } from "../../ledger/entities/currency.entity";
import { Ledger } from "../../ledger/entities/ledger.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("decimal", { precision: 18, scale: 2 })
  public amount: number;

  @Column({ type: "enum", enum: TransactionTypes })
  public type: TransactionTypes;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;

  @ManyToOne(() => Currency, { eager: true })
  public currency: Currency;

  @ManyToOne(() => Ledger, ledger => ledger.transactions, { onDelete: "CASCADE" })
  @Exclude()
  public ledger: Ledger;
}
