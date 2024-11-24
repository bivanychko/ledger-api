import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "../modules/auth/entities/user.entity";
import { AddedUser1732478465988 } from "../modules/auth/migrations/1732478465988-AddedUser";
import { AddedUserSalt1732488122598 } from "../modules/auth/migrations/1732488122598-AddedUserSalt";
import { getDatabaseConfig } from "./database.config";

const options: DataSourceOptions = {
  type: "postgres",
  entities: [User],
  migrations: [AddedUser1732478465988, AddedUserSalt1732488122598],
  ...getDatabaseConfig(),
};

export default new DataSource(options);
