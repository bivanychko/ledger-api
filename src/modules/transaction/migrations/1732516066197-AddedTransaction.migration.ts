import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTransaction1732516066197 implements MigrationInterface {
  public name = "AddedTransaction1732516066197";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('debit', 'credit')`);
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "amount" numeric(18,2) NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "currencyId" integer, "ledgerId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_a6eb26abbedbeaeb81ff45c5490" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_7e71a78f298d13f657cf2540d80" FOREIGN KEY ("ledgerId") REFERENCES "ledger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7e71a78f298d13f657cf2540d80"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_a6eb26abbedbeaeb81ff45c5490"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
  }
}
