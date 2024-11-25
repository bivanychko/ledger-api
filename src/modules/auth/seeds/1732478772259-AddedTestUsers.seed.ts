import * as bcrypt from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

import { User } from "../entities/user.entity";

const users = [
  { name: "Bohdan", email: "bohdan@gmail.com", password: "password_bohdan" },
  { name: "Dario", email: "dario@gmail.com", password: "password_dario" },
  { name: "Esteban", email: "esteban@gmail.com", password: "password_esteban" },
  { name: "Mr. Swindler", email: "swindler@gmail.com", password: "password_swindler", isLocked: true },
];

export class AddedTestUsers1732478772259 implements MigrationInterface {
  constructor() {}

  public async up(queryRunner: QueryRunner): Promise<void> {
    const promises = [];

    for (const user of users) {
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(user.password, salt);
      delete user.password;

      promises.push(queryRunner.manager.save(User, { ...user, encryptedPassword, salt }));
    }

    await Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      users.map(user => {
        return queryRunner.manager.delete(User, { email: user.email });
      }),
    );
  }
}
