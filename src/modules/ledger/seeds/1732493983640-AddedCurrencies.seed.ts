import { MigrationInterface, QueryRunner } from "typeorm";

import { CurrencyCodes } from "../../../common/constants";
import { Currency } from "../entities/currency.entity";

const currencies = [
  { code: CurrencyCodes.USD, name: "United States dollar" },
  { code: CurrencyCodes.EUR, name: "Euro" },
  { code: CurrencyCodes.UAH, name: "Ukrainian hryvnia" },
];

export class AddedCurrencies1732493983640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      currencies.map(currency => {
        return queryRunner.manager.save(Currency, currency);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      currencies.map(currency => {
        return queryRunner.manager.delete(Currency, { code: currency.code });
      }),
    );
  }
}
