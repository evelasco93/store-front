import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@store-front-typescript-bootcamp/db'

const app = express()
const prisma = new PrismaClient()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (_, res) => {
  const result = await prisma.product.findMany({
    include: {
      variants: true,
    },
  })
  return res.json({ result })
})

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
