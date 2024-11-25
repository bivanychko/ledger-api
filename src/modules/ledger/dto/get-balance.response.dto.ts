import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

class CurrencyDto {
  @ApiProperty({
    example: "USD",
    required: true,
  })
  public currency: string;

  @ApiProperty({
    example: "United States Dollar",
    required: true,
  })
  public name: string;
}

export class GetBalanceResponseDto {
  @Expose()
  @ApiProperty({
    example: 1,
    required: true,
  })
  public id: number;

  @Expose()
  @ApiProperty({
    example: "0.60",
    required: true,
  })
  public balance: string;

  @Expose()
  @ApiProperty({
    example: 1,
    required: true,
  })
  @Type(() => CurrencyDto)
  public currency: CurrencyDto;
}
