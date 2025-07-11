import express from 'express'
import connectDB from './config/db.js'
import userRouter from './module/user/user.routes.js'
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './utils/errorHandler.js'
import productRouter from './module/product/product.routes.js'
import cartRouter from './module/cart/cart.routes.js'
import morgan from 'morgan'

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.get('/api', (req, res) => {
  res.send('hello world')
})

app.use('/api/auth', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.use(globalErrorHandler)

const startServer = async (port) => {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log('listening on port', port)
    })
  })
}

startServer(process.env.PORT || 3000)
