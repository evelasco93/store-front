import express, { Express } from 'express'
import { baseApiUrl } from '../../common/constants'
import { VariantServices } from '../../services/variant.service'
import { CustomError, ErrorHandler } from '../../common/errorHandler'
import { StatusCodes } from '../../common/types'

export function variantsRoute(app: Express): void {
  const router = express.Router()
  const service = new VariantServices()

  app.use(`${baseApiUrl}/variants`, router)

  router.get('/', async (_, res) => {
    try {
      const variants = await service.getAllVariants()
      return res.json({ variants })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const variant = await service.getSingleVariant(id)
      return res.json({ variant })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.get('/:variantId/options', async (req, res) => {
    try {
      const { variantId } = req.params
      const options = await service.getVariantOptions(variantId)
      return res.json({ options })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.post('/:productId', async (req, res) => {
    try {
      const { productId } = req.params
      const variant = await service.createSingleVariant(productId)
      return res.status(StatusCodes.CREATED).json({ variant })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.post('/:variantId/options', async (req, res) => {
    try {
      const option = await service.createOptionForVariant(req.body)
      return res.status(StatusCodes.CREATED).json({ option })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })
}
