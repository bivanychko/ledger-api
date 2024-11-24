import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError } from "typeorm";

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    //Ideally should be sentry as well
    console.error(exception);

    const response: Response = host.switchToHttp().getResponse();

    const responseData = {
      statusCode: HttpStatus.NOT_FOUND,
      name: "NotFoundException",
      messages: "Resource not found",
    };

    return response.status(HttpStatus.NOT_FOUND).json(responseData);
  }
}
