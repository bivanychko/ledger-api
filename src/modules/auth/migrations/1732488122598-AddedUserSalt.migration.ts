import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUserSalt1732488122598 implements MigrationInterface {
  public name = "AddedUserSalt1732488122598";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
  }
}
