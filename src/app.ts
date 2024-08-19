import express from 'express'

import { userRouter } from './routes/userRouter'
import { categoryRouter } from './routes/categoryRouter'
import { productRouter } from './routes/productRouter'

const app = express()

app.use(express.json())
app.use('/v1', userRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/product', productRouter)

export default app
