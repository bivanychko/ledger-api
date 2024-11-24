import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "../modules/auth/entities/user.entity";
import { AddedTestUsers1732478772259 } from "../modules/auth/seeds/1732478772259-AddedTestUsers";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [User],
  migrations: [AddedTestUsers1732478772259],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
