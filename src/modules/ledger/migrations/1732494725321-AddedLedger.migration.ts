import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedLedger1732494725321 implements MigrationInterface {
    public name = 'AddedLedger1732494725321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ledger" ("id" SERIAL NOT NULL, "balance" numeric(18,2) NOT NULL DEFAULT '0', "currencyId" integer, "userId" integer, CONSTRAINT "PK_7a322e9157e5f42a16750ba2a20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_f5647f02aca88fd9579ff1b6df5" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ledger" ADD CONSTRAINT "FK_a21c3af32b2379186183e0c71b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_a21c3af32b2379186183e0c71b9"`);
        await queryRunner.query(`ALTER TABLE "ledger" DROP CONSTRAINT "FK_f5647f02aca88fd9579ff1b6df5"`);
        await queryRunner.query(`DROP TABLE "ledger"`);
    }

}
