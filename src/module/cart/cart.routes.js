import { Router } from 'express'
import { addToCartController, getCartController } from './cart.controller.js'
import requireAuth from '../../middlewares/requireAuth.js'
import { asyncWrapper } from '../../utils/asyncWrapper.js'

const cartRouter = Router()

cartRouter.post('/', requireAuth, asyncWrapper(addToCartController))

cartRouter.get('/', requireAuth, asyncWrapper(getCartController))

export default cartRouter
