import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { initOrmConfig } from "./orm/orm.config";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: initOrmConfig,
    }),
    AuthModule,
  ],
})
export class AppModule {}
