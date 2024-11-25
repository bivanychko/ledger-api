import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

import { Headers, Versions } from "../../common/constants";
import { CurrentUser } from "../../common/decorators";
import { NotFoundExceptionFilter, UnprocessableEntityExceptionFilter } from "../../common/filters";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionService } from "./transaction.service";

@Controller("/transactions")
@ApiHeader({
  name: Headers.VERSION,
  description: "Version of data to retrieve",
  required: true,
  schema: {
    enum: [Versions.V1],
  },
})
@ApiTags("Transaction")
@UseGuards(AuthGuard)
@UseFilters(UnprocessableEntityExceptionFilter, NotFoundExceptionFilter)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  process(@Body() dto: CreateTransactionDto, @CurrentUser() userId: number) {
    return this.transactionService.process(dto, userId);
  }
}