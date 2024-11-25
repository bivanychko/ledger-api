import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["code"])
export class Currency {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column({ length: 3 })
  public code: string;

  @Column({ length: 50 })
  public name: string;
}
