import { Router } from 'express'
import { asyncWrapper } from '../../utils/asyncWrapper.js'
import {
  createProductController,
  getProductsController,
} from './product.controller.js'

const productRouter = Router()

productRouter.post('/', createProductController)

productRouter.get('/', getProductsController)

export default productRouter
