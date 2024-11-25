import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

import { Headers, Versions } from "../../common/constants";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { NotFoundExceptionFilter, UnprocessableEntityExceptionFilter } from "../../common/filters";
import { ForbiddenExceptionFilter } from "../../common/filters/forbidden.filter";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CreateLedgerDto } from "./dto/create-ledger.dto";
import { LedgerService } from "./ledger.service";

@Controller("/ledger")
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
  create(@Body() dto: CreateLedgerDto, @CurrentUser() userId: number) {
    return this.ledgerService.create(dto, userId);
  }

  @Get("/:ledgerId/balances")
  getBalance(@Param("ledgerId") ledgerId: number, @CurrentUser() userId: number) {
    return this.ledgerService.getBalance(ledgerId, userId);
  }
}
