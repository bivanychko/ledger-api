import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreatedResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 1,
    required: true,
  })
  public id: number;
}
