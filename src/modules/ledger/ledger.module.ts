import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Currency } from "./entities/currency.entity";
import { Ledger } from "./entities/ledger.entity";
import { LedgerController } from "./ledger.controller";
import { LedgerService } from "./ledger.service";

@Module({
  imports: [TypeOrmModule.forFeature([Ledger, Currency])],
  controllers: [LedgerController],
  providers: [LedgerService],
})
export class LedgerModule {}
