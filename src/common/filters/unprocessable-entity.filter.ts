import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { UnprocessableServiceError } from "../errors/service.error";

@Catch(UnprocessableServiceError)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    //Ideally should be sentry as well
    console.error(exception);

    const response: Response = host.switchToHttp().getResponse();

    const responseData = {
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      name: "UnprocessableEntityException",
      messages: exception.message,
    };

    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(responseData);
  }
}
