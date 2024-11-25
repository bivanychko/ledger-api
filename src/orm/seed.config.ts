import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "../modules/auth/entities/user.entity";
import { AddedTestUsers1732478772259 } from "../modules/auth/seeds/1732478772259-AddedTestUsers.seed";
import { Currency } from "../modules/ledger/entities/currency.entity";
import { Ledger } from "../modules/ledger/entities/ledger.entity";
import { AddedCurrencies1732493983640 } from "../modules/ledger/seeds/1732493983640-AddedCurrencies.seed";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [User, Currency, Ledger],
  migrations: [AddedTestUsers1732478772259, AddedCurrencies1732493983640],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
