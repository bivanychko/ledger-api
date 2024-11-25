import { Injectable } from "@nestjs/common";

import { CreateLedgerDto } from "./dto/create-ledger.dto";
import { Ledger } from "./entities/ledger.entity";

@Injectable()
export class LedgerService {
  constructor() {}

  async create(data: CreateLedgerDto, userId: number): Promise<Ledger> {}
}
