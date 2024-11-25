import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";

import { ForbiddenServiceError } from "../errors/service.error";

@Catch(ForbiddenServiceError)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    //Ideally should be sentry as well
    console.error(exception);

    const response: Response = host.switchToHttp().getResponse();

    const responseData = {
      statusCode: HttpStatus.FORBIDDEN,
      name: "ForbiddenException",
      messages: exception.message,
    };

    return response.status(HttpStatus.FORBIDDEN).json(responseData);
  }
}
