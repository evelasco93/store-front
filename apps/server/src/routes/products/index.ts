import express, { Express, Request, Response } from 'express'
import { ErrorMessages, StatusCodes } from '../../common/types'
import { CustomError, ErrorHandler } from '../../common/errorHandler'
import { baseApiUrl } from '../../common/constants'
import { ProductServices } from '../../services/product.service'


export function productsRoute(app: Express): void {
  const router = express.Router()
  const service = new ProductServices()

  app.use(`${baseApiUrl}/products`, router)

  router.get('/', async (req: Request, res: Response) => {
    
    const search = req.query.search as unknown as string
    const collectionId = req.query.collectionId as unknown as string
    const sortBy = req.query.sortBy as unknown as string;
    try {
      const products = await service.getProducts(search, collectionId, sortBy);
      return res.json({ products });
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res);
    }
  });
  

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }
      const product = await service.getSingleProduct(id)
      return res.json({ product })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.post('/new-product', async (req, res) => {
    try {
      const data = req.body
      if (!data) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }
      const product = await service.createSingleProduct(data)
      return res.status(StatusCodes.CREATED).json({ productId: product.id })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const data = req.body

      if (!id || !data) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }
      const product = await service.updateSingleProduct(id, data)
      return res.json({ product })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }
      const result = await service.deleteSingleProduct(id)
      return res.json({
        message: `Successfully deleted product with ID: ${result.id}`,
      })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })
}
