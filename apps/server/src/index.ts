import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@store-front-typescript-bootcamp/db'
import { ErrorCodes, ErrorMessages } from './common/types'
import { ErrorHandler, CustomError } from './errorHandler'

const app = express()
const prisma = new PrismaClient()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const baseApiUrl = '/api/v1/storefront'

// Product Routes
app.get(`${baseApiUrl}/products`, async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          include: {
            options: { select: { color: true, size: true, stock: true } },
          },
        },
      },
    })
    return res.json({ products })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.get(`${baseApiUrl}/products/:id`, async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) {
      return ErrorHandler.notFoundError(res, id, 'Product')
    }

    return res.json({ product })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.post(`${baseApiUrl}/products`, async (req, res) => {
  try {
    const { name, imageUrl, description, price, collectionId } = req.body
    if (!name || !price || !collectionId) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const product = await prisma.product.create({
      data: { name, imageUrl, description, price, collectionId },
    })
    return res.json({
      productId: product.id,
    })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.put(`${baseApiUrl}/products/:id`, async (req, res) => {
  try {
    const { id } = req.params
    const { name, imageUrl, description, price } = req.body

    if (!id || !name || !price) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name, imageUrl, description, price },
    })
    return res.json({ product })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.delete(`${baseApiUrl}/products/:id`, async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }
    const result = await prisma.product.delete({ where: { id } })
    return res.json({
      message: `Successfully deleted product with ID: ${result.id}`,
    })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

// Collection Routes
app.get(`${baseApiUrl}/collections`, async (_, res) => {
  try {
    const collections = await prisma.collection.findMany()
    return res.json({ collections })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.get(`${baseApiUrl}/collections/:id`, async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const collection = await prisma.collection.findUnique({ where: { id } })
    if (!collection) {
      return ErrorHandler.notFoundError(res, id, 'Collection')
    }

    return res.json({ collection })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.post(`${baseApiUrl}/collections`, async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const collection = await prisma.collection.create({
      data: { name, description },
    })
    return res.json({ collection })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.put(`${baseApiUrl}/collections/:id`, async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    if (!id || !name) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const collection = await prisma.collection.update({
      where: { id },
      data: { name, description },
    })
    return res.json({ collection })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

// Variant Routes
app.get(`${baseApiUrl}/products/:productId/variants`, async (req, res) => {
  try {
    const { productId } = req.params
    if (!productId) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const variants = await prisma.variant.findMany({ where: { productId } })
    return res.json({ variants })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.get(`${baseApiUrl}/variants/:id`, async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const variants = await prisma.variant.findUnique({ where: { id } })
    return res.json({ variants })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.post(`${baseApiUrl}/products/:productId/variants`, async (req, res) => {
  try {
    const { productId } = req.params
    if (!productId) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const variant = await prisma.variant.create({
      data: { productId },
    })
    return res.json({ variant })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

// Option Routes
app.get(`${baseApiUrl}/options`, async (_, res) => {
  try {
    const options = await prisma.option.findMany()
    return res.json({ options })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.get(`${baseApiUrl}/variants/:variantId/options`, async (req, res) => {
  try {
    const { variantId } = req.params
    if (!variantId) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const options = await prisma.option.findMany({ where: { variantId } })
    return res.json({ options })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.post(`${baseApiUrl}/variants/:variantId/options`, async (req, res) => {
  try {
    const { variantId } = req.params
    const { color, size, stock } = req.body

    if (!variantId || !color || !size) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const option = await prisma.option.create({
      data: { color, size, stock, variantId },
    })
    return res.json({ option })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.put(`${baseApiUrl}/options/:id`, async (req, res) => {
  try {
    const { id } = req.params
    const { color, size, stock } = req.body

    if (!id || !color || !size) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const option = await prisma.option.update({
      where: { id },
      data: { color, size, stock },
    })
    return res.json({ option })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

app.delete(`${baseApiUrl}/options/:id`, async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
    }

    const result = await prisma.option.delete({ where: { id } })
    return res.json({
      message: `Successfully deleted option with ID: ${result.id}`,
    })
  } catch (error) {
    ErrorHandler.handleError(
      new CustomError(500, ErrorCodes.INTERNAL_SERVER_ERROR, error as string),
      res,
    )
  }
})

const port = process.env.PORT || 5001

// Error Handling Middleware for Unhandled Routes
app.use((req, res) => {
  ErrorHandler.notFoundError(res, req.path, 'Route')
})

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
