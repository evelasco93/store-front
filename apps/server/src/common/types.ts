export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorCodes {
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
}

export enum ErrorMessages {
  PRODUCT_NOT_FOUND = 'Product not found',
  COLLECTION_NOT_FOUND = 'Collection not found',
  VARIANT_NOT_FOUND = 'Variant not found',
  OPTION_NOT_FOUND = 'Option not found',
  INVALID_INPUT = 'Invalid input provided',
}

