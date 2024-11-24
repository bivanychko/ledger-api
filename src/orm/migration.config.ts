import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "../modules/auth/entities/user.entity";
import { AddedUser1732478465988 } from "../modules/auth/migrations/1732478465988-AddedUser";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [User],
  migrations: [AddedUser1732478465988],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
