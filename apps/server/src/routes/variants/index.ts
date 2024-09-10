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

  router.post('/create-variant', async (req, res) => {
    try {
      const data = req.body
      const variant = await service.createSingleVariant(data)
      return res.status(StatusCodes.CREATED).json({ variant })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })
}
