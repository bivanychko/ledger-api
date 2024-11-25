import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

import { CurrencyCodes } from "../../../common/constants";
import { TransactionTypes } from "../../../common/constants/transaction.constant";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionTypes)
  @ApiProperty({
    example: "debit",
    required: true,
  })
  public type: TransactionTypes;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 4.2,
    required: true,
  })
  public amount: number;

  @IsEnum(CurrencyCodes)
  @IsNotEmpty()
  @ApiProperty({
    example: "USD",
    required: true,
  })
  public currencyCode: CurrencyCodes;
}
