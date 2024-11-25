import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { User } from "../modules/auth/entities/user.entity";
import { Currency } from "../modules/ledger/entities/currency.entity";
import { Ledger } from "../modules/ledger/entities/ledger.entity";
import { getDatabaseConfig } from "./database.config";

export const initOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: "postgres",
    entities: [User, Currency, Ledger],
    ...getDatabaseConfig(),
  };
};
