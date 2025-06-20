import { Router } from 'express'
import requireAuth from '../../middlewares/requireAuth.js'
import {
  createProductController,
  getProductsController,
} from './product.controller.js'

const productRouter = Router()

productRouter.post('/', requireAuth, createProductController)

productRouter.get('/', getProductsController)

export default productRouter
