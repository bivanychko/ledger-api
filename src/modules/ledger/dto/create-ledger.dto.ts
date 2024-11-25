import { IsEnum, IsNotEmpty } from "class-validator";

import { CurrencyCodes } from "../../../common/constants/currency.constant";

export class CreateLedgerDto {
  @IsEnum(CurrencyCodes)
  @IsNotEmpty()
  public currencyCode: CurrencyCodes;
}
