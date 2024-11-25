import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

import { Headers, Versions } from "../../common/constants";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
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
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  create(@Body dto: CreateLedgerDto, @CurrentUser() userId: number) {
    return this.ledgerService.create(dto, userId);
  }
}
