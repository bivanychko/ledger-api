import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { config } from "../../config";
import { User } from "../auth/entities/user.entity";
import { Currency } from "./entities/currency.entity";
import { Ledger } from "./entities/ledger.entity";
import { LedgerController } from "./ledger.controller";
import { LedgerService } from "./ledger.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Ledger, Currency, User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.JWT_SECRET,
        signOptions: {
          expiresIn: "1h",
        },
        global: true,
      }),
    }),
  ],
  controllers: [LedgerController],
  providers: [LedgerService],
})
export class LedgerModule {}
