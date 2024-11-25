import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "USD",
    required: true,
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "USD",
    required: true,
  })
  public password: string;
}
