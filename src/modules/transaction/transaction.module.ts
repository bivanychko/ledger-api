import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { config } from "../../config";
import { User } from "../auth/entities/user.entity";
import { Ledger } from "../ledger/entities/ledger.entity";
import { LedgerModule } from "../ledger/ledger.module";
import { Transaction } from "./entities/transaction.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Ledger, User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.JWT_SECRET,
        signOptions: {
          expiresIn: "1h",
        },
        global: true,
      }),
    }),
    LedgerModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
