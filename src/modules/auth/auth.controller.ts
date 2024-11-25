import { Body, Controller, Post, UseFilters, Version } from "@nestjs/common";
import { ApiHeader, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Headers, Versions } from "../../common/constants";
import { NotFoundExceptionFilter } from "../../common/filters/not-found.filter";
import { UnprocessableEntityExceptionFilter } from "../../common/filters/unprocessable-entity.filter";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("/auth")
@ApiHeader({
  name: Headers.VERSION,
  description: "Version of data to retrieve",
  required: true,
  schema: {
    enum: [Versions.V1],
  },
})
@ApiTags("Authorization")
@UseFilters(UnprocessableEntityExceptionFilter, NotFoundExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOkResponse()
  @Version(Versions.V1)
  login(@Body() dto: LoginDto): Promise<string> {
    return this.authService.signIn(dto);
  }
}
