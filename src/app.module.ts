import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./modules/auth/auth.module";
import { LedgerModule } from "./modules/ledger/ledger.module";
import { initOrmConfig } from "./orm/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: initOrmConfig,
    }),
    AuthModule,
    LedgerModule,
  ],
})
export class AppModule {}
