import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    let statusCode: number
    let message: string | object

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus()
      message = exception.getResponse()
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      message = 'Internal server error'
    }

    response.status(statusCode).json({
      statusCode,
      message,
      exception: String(exception)
    })
  }
}
