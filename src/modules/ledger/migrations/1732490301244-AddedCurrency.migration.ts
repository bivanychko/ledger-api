import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCurrency1732490301244 implements MigrationInterface {
  public name = "AddedCurrency1732490301244";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currency" ("id" SERIAL NOT NULL, "code" character varying(3) NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_723472e41cae44beb0763f4039c" UNIQUE ("code"), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "currency"`);
  }
}
