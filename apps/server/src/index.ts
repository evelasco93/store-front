import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { ErrorHandler } from './common/errorHandler'
import { productsRoute } from './routes/products'
import { collectionsRoute } from './routes/collections'
import { variantsRoute } from './routes/variants'
import { optionsRoute } from './routes/options'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

productsRoute(app)
collectionsRoute(app)
variantsRoute(app)
optionsRoute(app)

const port = process.env.PORT || 5001

// Error Handling Middleware for Unhandled Routes
app.use((req, res) => {
  ErrorHandler.notFoundError(res, req.path, 'Route')
})

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
