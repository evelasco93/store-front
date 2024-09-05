import express, { Express } from 'express'
import { ErrorMessages } from '../../common/types'
import { CustomError, ErrorHandler } from '../../common/errorHandler'
import { baseApiUrl } from '../../common/constants'
import { OptionServices } from '../../services/option.service'

export function optionsRoute(app: Express): void {
  const router = express.Router()
  const service = new OptionServices()

  app.use(`${baseApiUrl}/options`, router)

  router.get('/', async function (_, res) {
    try {
      const options = await service.getAllOptions()
      return res.json({ options })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.get('/:id', async function (req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }
      const option = await service.getSingleOption(id)
      return res.json({ option })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.post('/create-option', async function (req, res) {
    try {
      const data = req.body

      if (!data) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }

      const newOption = await service.createVariantOption(data)
      return res.json({ newOption })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.put('/:id', async function (req, res) {
    try {
      const { id } = req.params
      const data = req.body

      if (!id || !data) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }

      const option = await service.updateSingleOption(id, data)
      return res.json({ option })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.delete('/:id', async function (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }

      const result = await service.deleteSingleOption(id)
      return res.json({
        message: `Successfully deleted option with ID: ${result.id}`,
      })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })
}
