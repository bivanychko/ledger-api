import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "../modules/auth/entities/user.entity";
import { AddedUser1732478465988 } from "../modules/auth/migrations/1732478465988-AddedUser.migration";
import { AddedUserSalt1732488122598 } from "../modules/auth/migrations/1732488122598-AddedUserSalt.migration";
import { Currency } from "../modules/ledger/entities/currency.entity";
import { Ledger } from "../modules/ledger/entities/ledger.entity";
import { AddedCurrency1732490301244 } from "../modules/ledger/migrations/1732490301244-AddedCurrency.migration";
import { AddedLedger1732494725321 } from "../modules/ledger/migrations/1732494725321-AddedLedger.migration";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [User, Currency, Ledger],
  migrations: [AddedUser1732478465988, AddedUserSalt1732488122598, AddedCurrency1732490301244, AddedLedger1732494725321],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
