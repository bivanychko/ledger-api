import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Decimal from "decimal.js";
import { EntityManager, Repository } from "typeorm";

import { TransactionTypes } from "../../common/constants";
import { UnprocessableServiceError } from "../../common/errors";
import { Ledger } from "../ledger/entities/ledger.entity";
import { LedgerService } from "../ledger/ledger.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Ledger)
    private readonly ledgerRepository: Repository<Ledger>,
    private readonly ledgerService: LedgerService,
    private readonly entityManager: EntityManager,
  ) {}

  async process(data: CreateTransactionDto, userId: number): Promise<Transaction> {
    const ledger = await this.ledgerRepository.findOneOrFail({
      where: { user: { id: userId }, currency: { code: data.currencyCode } },
    });

    if (data.type === TransactionTypes.Debit && !(await this.hasSufficientBalance(ledger.id, data.amount, userId))) {
      throw new UnprocessableServiceError("Insufficient balance");
    }

    const amount = data.type === TransactionTypes.Debit ? -data.amount : data.amount;

    const transaction = this.transactionRepository.create({
      ledger,
      amount,
      type: data.type,
    });

    const newBalance =
      data.type === TransactionTypes.Debit
        ? new Decimal(ledger.balance).sub(data.amount)
        : new Decimal(ledger.balance).add(data.amount);

    //TODO: Wrap into transaction using entityManager

    await this.ledgerRepository.update({ id: ledger.id }, { balance: Number(newBalance) });

    return this.transactionRepository.save(transaction);
  }

  private async hasSufficientBalance(ledgerId: number, amount: number, userId: number): Promise<boolean> {
    const { balance } = await this.ledgerService.getBalance(ledgerId, userId);
    return balance >= amount;
  }
}
