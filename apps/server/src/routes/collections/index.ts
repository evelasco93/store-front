import express, { Express } from 'express'
import { ErrorMessages, StatusCodes } from '../../common/types'
import { ErrorHandler, CustomError } from '../../common/errorHandler'
import { baseApiUrl } from '../../common/constants'
import { CollectionServices } from '../../services/collection.service'

export function collectionsRoute(app: Express): void {
  const router = express.Router()
  const service = new CollectionServices()

  app.use(`${baseApiUrl}/collections`, router)

  router.get('/', async function (_, res) {
    try {
      const collections = await service.getAllCollections()
      return res.json({ collections })
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

      const collection = await service.getSingleCollection(id)
      return res.json({ collection })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })

  router.post('/', async function (req, res) {
    try {
      const data = req.body
      if (!data) {
        return ErrorHandler.badRequestError(res, ErrorMessages.INVALID_INPUT)
      }

      const collection = await service.createSingleCollection(data)
      return res.status(StatusCodes.CREATED).json({ collection })
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

      const collection = await service.updateSingleCollection(id, data)
      return res.json({ collection })
    } catch (error) {
      ErrorHandler.handleError(error as CustomError, res)
    }
  })
}
