import { ErrorCodes, ErrorMessages, StatusCodes } from './types'
import express from 'express'

export class CustomError extends Error {
  public statusCode: StatusCodes
  public errorCode: ErrorCodes

  constructor(statusCode: StatusCodes, errorCode: ErrorCodes, message: string) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class ErrorHandler {
  static handleError(err: CustomError, res: express.Response) {
    const { statusCode, message, errorCode } = err
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      errorCode,
      message,
    })
  }

  static notFoundError(res: express.Response, id: string, entity: string) {
    const message = `${entity} with ID ${id} not found.`
    return res.status(StatusCodes.NOT_FOUND).json({
      status: 'error',
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: ErrorCodes.NOT_FOUND,
      message,
    })
  }

  static badRequestError(res: express.Response, message: ErrorMessages) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: ErrorCodes.BAD_REQUEST,
      message,
    })
  }
}
