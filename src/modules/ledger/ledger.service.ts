import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UnprocessableServiceError } from "../../common/errors";
import { User } from "../auth/entities/user.entity";
import { CreateLedgerDto } from "./dto/create-ledger.dto";
import { Currency } from "./entities/currency.entity";
import { Ledger } from "./entities/ledger.entity";

@Injectable()
export class LedgerService {
  constructor(
    @InjectRepository(Ledger)
    private readonly ledgerRepository: Repository<Ledger>,
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateLedgerDto, userId: number): Promise<Ledger> {
    const currency = await this.currencyRepository.findOneOrFail({ where: { code: data.currencyCode } });
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: {
        ledgers: {
          currency: true,
        },
      },
    });

    if (user.ledgers.length) {
      const res = user.ledgers.some(ledger => ledger.currency.code === data.currencyCode);
      if (res) throw new UnprocessableServiceError(`User already has ledger in ${data.currencyCode} currency`);
    }

    const ledger = this.ledgerRepository.create({ currency, user });

    return this.ledgerRepository.save(ledger);
  }
}
