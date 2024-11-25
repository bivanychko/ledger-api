import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

import { Ledger } from "../../ledger/entities/ledger.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public encryptedPassword: string;

  @Column()
  public salt: string;

  @Column({ default: false })
  public isLocked: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @OneToMany(() => Ledger, ledger => ledger.user)
  public ledgers: Ledger[];
}
