import { ErrorCodes } from './common/types'
import express from 'express'

export class CustomError extends Error {
  public statusCode: number
  public errorCode: string

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
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
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      errorCode: ErrorCodes.NOT_FOUND,
      message,
    })
  }

  static badRequestError(res: express.Response, message: string) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      errorCode: ErrorCodes.BAD_REQUEST,
      message,
    })
  }
}
