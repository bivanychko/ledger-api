import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

import { CurrencyCodes } from "../../../common/constants";
import { TransactionTypes } from "../../../common/constants/transaction.constant";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionTypes)
  public type: TransactionTypes;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsEnum(CurrencyCodes)
  @IsNotEmpty()
  public currencyCode: CurrencyCodes;
}
