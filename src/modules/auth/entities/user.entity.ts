import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
