import { Body, Controller, Get, Param, Post, UseFilters, UseGuards, Version } from "@nestjs/common";
import { ApiHeader, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Headers, Versions } from "../../common/constants";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { CreatedResourceResponseDto } from "../../common/dto/created-resource.response.dto";
import { NotFoundExceptionFilter, UnprocessableEntityExceptionFilter } from "../../common/filters";
import { ForbiddenExceptionFilter } from "../../common/filters/forbidden.filter";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CreateLedgerDto } from "./dto/create-ledger.dto";
import { GetBalanceResponseDto } from "./dto/get-balance.response.dto";
import { LedgerService } from "./ledger.service";

@Controller("/ledgers")
@ApiHeader({
  name: Headers.VERSION,
  description: "Version of data to retrieve",
  required: true,
  schema: {
    enum: [Versions.V1],
  },
})
@ApiTags("Ledger")
@UseGuards(AuthGuard)
@UseFilters(UnprocessableEntityExceptionFilter, NotFoundExceptionFilter, ForbiddenExceptionFilter)
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  @ApiOkResponse({ type: CreatedResourceResponseDto })
  @Version(Versions.V1)
  create(@Body() dto: CreateLedgerDto, @CurrentUser() userId: number) {
    return this.ledgerService.create(dto, userId);
  }

  @Get("/:ledgerId/balances")
  @ApiOkResponse({ type: GetBalanceResponseDto })
  @Version(Versions.V1)
  getBalance(@Param("ledgerId") ledgerId: number, @CurrentUser() userId: number) {
    return this.ledgerService.getBalance(ledgerId, userId);
  }
}
