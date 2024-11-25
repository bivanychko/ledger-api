import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

import { CurrencyCodes } from "../../../common/constants/currency.constant";

export class CreateLedgerDto {
  @IsEnum(CurrencyCodes)
  @IsNotEmpty()
  @ApiProperty({
    example: "USD",
    required: true,
  })
  public currencyCode: CurrencyCodes;
}
