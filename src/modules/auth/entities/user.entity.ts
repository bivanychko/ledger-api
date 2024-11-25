import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

import { Ledger } from "../../ledger/entities/ledger.entity";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Exclude()
  public name: string;

  @Column()
  @Exclude()
  public email: string;

  @Column()
  @Exclude()
  public encryptedPassword: string;

  @Column()
  @Exclude()
  public salt: string;

  @Column({ default: false })
  @Exclude()
  public isLocked: boolean;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;

  @OneToMany(() => Ledger, ledger => ledger.user)
  @Exclude()
  public ledgers: Ledger[];
}
